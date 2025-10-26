<template>
  <div class="rd-container">
    <header class="rd-header">
      <div class="rd-header-content">
        <button @click="volverADashboard" class="rd-back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span>Volver</span>
        </button>
        <h1 class="rd-title">Reto Diario - RV</h1>
      </div>
    </header>

    <main class="rd-content">
      <div v-if="loading" class="rd-estado-container">
        <div class="rd-loading-spinner"></div>
        <p>Cargando retos...</p>
      </div>

      <div v-else-if="error" class="rd-estado-container rd-error-container">
        <p>{{ error }}</p>
        <button @click="cargarRetos" class="rd-retry-btn">Intentar nuevamente</button>
      </div>
      
      <div v-else class="rd-semanas-lista">
        <SemanaAcordeon
        v-for="semana in semanas"
        :key="semana.id"
        :semana="semana"
        :is-open="semanaAbiertaId === semana.id"
        @toggle="toggleSemana(semana.id)"
        @abrir-tarea="abrirModalTarea"
        @abrir-teoria="abrirModalTeoria"
      />
      </div>
    </main>
    
    <TareaModal
      v-if="tareaActiva"
      :semana-id="semanaIdActiva"
      :tarea="tareaActiva"
      @close="cerrarModalTarea"
      @tarea-completada="handleTareaCompletada"
    />
    
    <VisorTeoriaModal
      v-if="teoriaActiva"
      :archivo="teoriaActiva"
      @close="cerrarModalTeoria"
    />

    <ToastNotification 
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '@/firebase'; // Asumo que tu ruta a firebase es correcta
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';


import SemanaAcordeon from '@/components/reto-diario/SemanaAcordeon.vue';
import TareaModal from '@/components/reto-diario/TareaModal.vue';
import VisorTeoriaModal from '@/components/reto-diario/VisorTeoriaModal.vue';
import ToastNotification from '@/components/reto-diario/ToastNotification.vue';

const router = useRouter();

// --- Estados del componente ---
const loading = ref(true);
const error = ref(null);
const semanas = ref([]);
const esUsuarioVip = ref(false);
const semanaAbiertaId = ref(null);

// --- Estados para los modales ---
const tareaActiva = ref(null);
const teoriaActiva = ref(null);
const semanaIdActiva = ref(null);

// --- Estado para el Toast ---
const toast = ref({ visible: false, message: '', type: 'info' });

const coleccionRetos = 'retoDiario'; // Reemplaza si es necesario

// --- Funciones de Lógica ---
const verificarAccesoVip = async (userEmail) => {
  try {
    const vipQuery = query(collection(db, 'usuariosVip'), where('email', '==', userEmail), where('estado', '==', 'activo'));
    const querySnapshot = await getDocs(vipQuery);
    esUsuarioVip.value = !querySnapshot.empty;
  } catch (error) {
    console.error('Error al verificar acceso VIP:', error);
    esUsuarioVip.value = false;
  }
};

const cargarRetos = async () => {
  loading.value = true;
  error.value = null;
  try {
    const semanasRef = collection(db, coleccionRetos);
    const q = query(semanasRef, orderBy('orden', 'asc'));
    const snapshot = await getDocs(q);
    
    const semanasPromises = snapshot.docs.map(async (semanaDoc) => {
      const semanaData = { id: semanaDoc.id, ...semanaDoc.data() };

      // Cargar teoría
      const teoriaRef = collection(db, `${coleccionRetos}/${semanaDoc.id}/teoria`);
      const teoriaSnapshot = await getDocs(teoriaRef);
      semanaData.teoria = teoriaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Cargar práctica
      const practicaRef = collection(db, `${coleccionRetos}/${semanaDoc.id}/practica`);
      const practicaSnapshot = await getDocs(practicaRef);
      const practicaPromises = practicaSnapshot.docs.map(async (tareaDoc) => {
        const tareaData = { id: tareaDoc.id, ...tareaDoc.data() };
        // Buscar respuesta del usuario para poner la nota
        const respuestasRef = collection(db, `${coleccionRetos}/${semanaDoc.id}/practica/${tareaDoc.id}/respuestas`);
        const respuestaQuery = query(respuestasRef, where('userId', '==', auth.currentUser.uid));
        const respuestaSnapshot = await getDocs(respuestaQuery);
        if (!respuestaSnapshot.empty) {
          tareaData.calificacion = respuestaSnapshot.docs[0].data().calificacion;
        }
        return tareaData;
      });
      semanaData.practica = await Promise.all(practicaPromises);
      return semanaData;
    });

    semanas.value = await Promise.all(semanasPromises);
  } catch (err) {
    console.error('Error al cargar retos:', err);
    error.value = 'No se pudieron cargar los retos. Por favor, recarga la página.';
  } finally {
    loading.value = false;
  }
};

const volverADashboard = () => router.push('/dashboard?tab=vip');

const showToast = (message, type = 'info', duration = 3000) => {
  toast.value = { visible: true, message, type };
  setTimeout(() => {
    toast.value.visible = false;
  }, duration);
};

const toggleSemana = (semanaId) => {
  if (semanaAbiertaId.value === semanaId) {
    semanaAbiertaId.value = null; // Cerrar si ya está abierta
  } else {
    semanaAbiertaId.value = semanaId; // Abrir nueva y cerrar las demás
  }
};

// --- Manejadores de eventos de los modales ---
const abrirModalTarea = ({ semanaId, tarea }) => {
  semanaIdActiva.value = semanaId;
  tareaActiva.value = tarea;
};

const cerrarModalTarea = () => {
  tareaActiva.value = null;
  semanaIdActiva.value = null;
};

const abrirModalTeoria = (archivo) => {
  teoriaActiva.value = archivo;
};

const cerrarModalTeoria = () => {
  teoriaActiva.value = null;
};


// --- Ciclo de vida ---
onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      router.push('/aula-virtual');
      return;
    }
    await verificarAccesoVip(user.email);
    if (!esUsuarioVip.value) {
      showToast('No tienes acceso al Reto Diario.', 'error', 5000);
      setTimeout(() => router.push('/dashboard'), 3000);
      return;
    }
    await cargarRetos();
  });
});
</script>

<style scoped>
@import '@/assets/styles/reto-diario.css';
</style>