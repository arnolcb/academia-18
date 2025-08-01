<template>
  <div class="curso-gratuito-container">
    <!-- Header con navegación -->
    <header class="curso-header">
      <div class="header-content">
        <button @click="volverAClasesGratuitas" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Volver a Clases Gratuitas</span>
        </button>

        <div class="curso-titulo-container">
          <h1 class="curso-titulo">{{ curso.titulo || 'Cargando...' }}</h1>
          <div class="curso-gratuito-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span>GRATUITO</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="curso-content">
      <!-- Estados de carga y error -->
      <div v-if="loading" class="estado-container">
        <div class="loading-spinner"></div>
        <p>Cargando contenido del curso...</p>
      </div>

      <div v-else-if="error" class="estado-container error-container">
        <p>{{ error }}</p>
        <button @click="cargarCurso" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Contenido del curso -->
      <div v-else class="semanas-container">
        <!-- Banner del curso -->
        <div class="curso-banner" :style="{ backgroundImage: `url(${curso.imagen || '/placeholder-banner.jpg'})` }">
          <div class="banner-overlay"></div>
          <div class="banner-content">
            <h2>{{ curso.titulo }}</h2>
            <p>{{ curso.descripcion }}</p>
            <div class="banner-badge">Acceso Gratuito</div>
          </div>
        </div>

        <!-- Acordeón de semanas -->
        <div class="semanas-lista">
          <div v-for="(semana, index) in semanas" :key="semana.id" class="semana-item">
            <div class="semana-header" @click="toggleSemana(semana.id)"
              :class="{ 'active': semanaActiva === semana.id }">
              <div class="semana-titulo">
                <span class="semana-numero">Semana {{ index + 1 }}</span>
                <h3>{{ semana.titulo }}</h3>
              </div>
              <div class="semana-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <div class="semana-contenido" v-if="semanaActiva === semana.id">
              <div v-if="semana.recursos.length === 0" class="recursos-empty">
                <p>No hay recursos disponibles para esta semana.</p>
              </div>

              <div v-else class="recursos-lista">
                <div v-for="recurso in semana.recursos" :key="recurso.id" class="recurso-item">
                  <div class="recurso-tipo" :class="recurso.tipo">
                    <!-- Icono según el tipo de recurso -->
                    <svg v-if="recurso.tipo === 'guia'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>

                    <svg v-else-if="recurso.tipo === 'clase'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>

                    <svg v-else-if="recurso.tipo === 'tarea'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>

                  <div class="recurso-info">
                    <h4>{{ recurso.titulo }}</h4>
                    <p>{{ recurso.descripcion }}</p>

                    <!-- Botones de acción según el tipo -->
                    <div class="recurso-acciones">
                      <button v-if="recurso.tipo === 'guia' || recurso.tipo === 'tarea'"
                        @click="handleDescargar(recurso)" class="accion-btn descargar-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>Descargar</span>
                      </button>

                      <button v-if="recurso.tipo === 'clase'" @click="abrirRecursoModal(recurso, 'clase')"
                        class="accion-btn ver-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        <span>Ver clase</span>
                      </button>

                      <button v-if="recurso.tipo === 'tarea'" @click="abrirRecursoModal(recurso, 'tarea')"
                        class="accion-btn responder-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>Responder</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA para convertir a premium -->
        <div class="conversion-cta">
          <div class="cta-card">
            <div class="cta-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon
                  points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2">
                </polygon>
              </svg>
            </div>
            <h3>¿Te gustó este contenido?</h3>
            <p>Accede a cursos completos con ejercicios, tareas calificadas, seguimiento personalizado y mucho más.</p>
            <div class="cta-buttons">
              <router-link to="/aula-virtual" class="cta-btn secondary">Ir a Aula VIP</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal para clases y tareas -->
    <div v-if="modalVisible" class="recurso-modal">
      <div class="modal-overlay" @click="cerrarModal"></div>

      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ recursoActivo.titulo }}</h3>
          <button @click="cerrarModal" class="cerrar-modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <!-- Contenido para clase (video) -->
          <div v-if="modalTipo === 'clase'" class="clase-container">
            <div class="video-wrapper">
              <iframe :src="recursoActivo.videoUrl" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="clase-descripcion">
              <h4>Descripción de la clase</h4>
              <p>{{ recursoActivo.descripcion }}</p>
            </div>
          </div>

          <!-- Contenido para tarea -->
          <div v-if="modalTipo === 'tarea'" class="tarea-container">
            <!-- Instrucciones de la tarea -->
            <div class="tarea-instrucciones">
              <h4>Instrucciones</h4>
              <p>{{ recursoActivo.descripcion }}</p>
              <div class="tarea-archivo">
                <button @click="handleDescargarEnModal(recursoActivo)" class="archivo-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>Ver documento de tarea</span>
                </button>
              </div>
            </div>

            <!-- Formulario de respuestas -->
            <div class="formulario-tarea">
              <!-- Mostrar formulario solo si no hay resultado -->
              <div v-if="!resultadoTarea">
                <h4>Respuestas</h4>
                <p class="instruccion-tarea">Ingresa las respuestas a las preguntas:</p>

                <form @submit.prevent="enviarRespuestas" class="respuestas-form">
                  <div class="preguntas-container">
                    <div v-for="i in 10" :key="i" class="pregunta-item">
                      <label :for="'pregunta-' + i">Pregunta {{ i }}</label>
                      <input :id="'pregunta-' + i" v-model="respuestas[i - 1]" type="text"
                        placeholder="Tu respuesta" required />
                    </div>
                  </div>

                  <div class="submit-container">
                    <button type="submit" class="submit-respuestas" :disabled="enviandoRespuestas">
                      <span v-if="enviandoRespuestas">Enviando...</span>
                      <span v-else>Enviar respuestas</span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Resultado después de enviar -->
              <div v-if="resultadoTarea" class="resultado-tarea resultado-completo">
                <h4>Calificación</h4>
                <div class="calificacion">
                  <div class="nota" :class="resultadoTarea.clase">{{ resultadoTarea.nota }}/10</div>
                  <div class="retroalimentacion">
                    <p>{{ resultadoTarea.mensaje }}</p>
                  </div>
                  <!-- Enlace al solucionario -->
                  <div v-if="solucionarioInfo" class="solucionario-descarga">
                    <h5>Descarga el solucionario:</h5>
                    <a :href="solucionarioInfo.url" target="_blank" class="solucionario-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      {{ solucionarioInfo.nombre }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast.visible" class="toast-container" :class="toast.type">
      <div class="toast-message">
        <svg v-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth, db } from '@/firebase';
import { doc, getDoc, collection, query, orderBy, getDocs, addDoc, updateDoc, where } from 'firebase/firestore';

// Router y route
const router = useRouter();
const route = useRoute();

// Estados
const curso = ref({});
const semanas = ref([]);
const loading = ref(true);
const error = ref(null);
const semanaActiva = ref(null);

// Modal
const modalVisible = ref(false);
const modalTipo = ref('');
const recursoActivo = ref({});

// Variables para tareas
const respuestas = ref(Array(10).fill(''));
const enviandoRespuestas = ref(false);
const resultadoTarea = ref(null);
const solucionarioInfo = ref(null);

// Función para generar ID único para usuarios sin cuenta
const getOrCreateGuestId = () => {
  let guestId = localStorage.getItem('guestUserId');
  if (!guestId) {
    guestId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('guestUserId', guestId);
  }
  return guestId;
};

// Toast
const toast = ref({
  visible: false,
  message: '',
  type: 'info'
});

// Cargar datos del curso
onMounted(async () => {
  await cargarCurso();
});

const cargarCurso = async () => {
  loading.value = true;
  error.value = null;

  try {
    const cursoId = route.params.id;
    if (!cursoId) {
      throw new Error('ID de curso no proporcionado');
    }

    // Obtener datos del curso desde la colección regular
    const cursoDoc = await getDoc(doc(db, 'cursos2', cursoId));
    if (!cursoDoc.exists()) {
      throw new Error('El curso no existe');
    }

    curso.value = {
      id: cursoDoc.id,
      ...cursoDoc.data()
    };

    // Obtener semanas del curso
    const semanasRef = collection(db, `cursos2/${cursoId}/semanas`);
    const q = query(semanasRef, orderBy('orden', 'asc'));
    const semanasSnapshot = await getDocs(q);

    // Crear array de semanas
    const semanasTemp = [];
    for (const semanaDoc of semanasSnapshot.docs) {
      // Para cada semana, obtener sus recursos
      const recursosRef = collection(db, `cursos2/${cursoId}/semanas/${semanaDoc.id}/recursos`);
      const recursosSnapshot = await getDocs(recursosRef);

      // Incluir todos los recursos (guías, clases y tareas)
      const recursos = recursosSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(recurso => recurso.tipo === 'guia' || recurso.tipo === 'clase' || recurso.tipo === 'tarea');

      // Añadir semana con sus recursos
      semanasTemp.push({
        id: semanaDoc.id,
        ...semanaDoc.data(),
        recursos
      });
    }

    semanas.value = semanasTemp;
    semanaActiva.value = null;

  } catch (err) {
    console.error('Error al cargar el curso:', err);
    error.value = 'No se pudo cargar el contenido del curso. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

// Función para cambiar la semana activa
const toggleSemana = (semanaId) => {
  if (semanaActiva.value === semanaId) {
    semanaActiva.value = null;
  } else {
    semanaActiva.value = semanaId;
  }
};

// Función para volver a clases gratuitas
const volverAClasesGratuitas = () => {
  router.push('/clases-gratuitas');
};

const handleDescargar = (recurso) => {
  if (!recurso.archivoUrl || recurso.archivoUrl.trim() === '') {
    showToast('El archivo no está disponible en este momento. Por favor, vuelve más tarde.', 'error');
    return;
  }
  window.open(recurso.archivoUrl, '_blank');
};

// Función para mostrar toast
const showToast = (message, type = 'info') => {
  toast.value = {
    visible: true,
    message,
    type
  };

  setTimeout(() => {
    toast.value.visible = false;
  }, 3000);
};

// Abrir modal de recurso
const abrirRecursoModal = (recurso, tipo) => {
  recursoActivo.value = recurso;
  modalTipo.value = tipo;
  modalVisible.value = true;

  if (tipo === 'tarea') {
    respuestas.value = Array(10).fill('');
    resultadoTarea.value = null;
    solucionarioInfo.value = null;
    cargarRespuestaPrevia(recurso.id);
  }
};

const handleDescargarEnModal = (recurso) => {
  if (!recurso.archivoUrl || recurso.archivoUrl.trim() === '') {
    showToast('El archivo no está disponible en este momento. Por favor, vuelve más tarde.', 'error');
    return;
  }
  window.open(recurso.archivoUrl, '_blank');
};

// Cerrar modal
const cerrarModal = () => {
  modalVisible.value = false;
  recursoActivo.value = {};
  respuestas.value = Array(10).fill('');
  resultadoTarea.value = null;
  solucionarioInfo.value = null;
};

// Cargar respuesta previa de tarea
const cargarRespuestaPrevia = async (recursoId) => {
  try {
    const userId = auth.currentUser ? auth.currentUser.uid : getOrCreateGuestId();

    const cursoId = route.params.id;
    const semanaId = semanaActiva.value;

    const respuestasRef = collection(db, `cursos2/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/respuestas`);
    const q = query(respuestasRef, where('userId', '==', userId));
    const respuestasSnapshot = await getDocs(q);

    if (!respuestasSnapshot.empty) {
      const respuestaDoc = respuestasSnapshot.docs[0];
      const respuestaData = respuestaDoc.data();

      respuestas.value = respuestaData.respuestas.map(r => r.respuesta);
      const nota = respuestaData.calificacion;
      let claseNota = 'malo';
      if (nota >= 9) claseNota = 'excelente';
      else if (nota >= 7) claseNota = 'bueno';
      else if (nota >= 5) claseNota = 'regular';

      resultadoTarea.value = {
        nota: respuestaData.calificacion,
        mensaje: respuestaData.retroalimentacion,
        clase: claseNota
      };

      if (resultadoTarea.value) {
        await cargarSolucionario(recursoId);
      }
    }
  } catch (err) {
    console.error('Error al cargar respuesta previa:', err);
  }
};

// Enviar respuestas de tarea
const enviarRespuestas = async () => {
  enviandoRespuestas.value = true;
  resultadoTarea.value = null;

  try {
    const userId = auth.currentUser ? auth.currentUser.uid : getOrCreateGuestId();

    const cursoId = route.params.id;
    const semanaId = semanaActiva.value;
    const recursoId = recursoActivo.value.id;

    const respuestasFormateadas = respuestas.value.map((respuesta, index) => ({
      pregunta: index + 1,
      respuesta: respuesta.trim()
    }));

    // Obtener solucionario
    const solucionariosRef = collection(db, `cursos2/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/solucionarios`);
    const solucionariosSnapshot = await getDocs(solucionariosRef);

    if (solucionariosSnapshot.empty) {
      throw new Error('No se encontró el solucionario para esta tarea');
    }

    const solucionarioDoc = solucionariosSnapshot.docs[0];
    const solucionarioData = solucionarioDoc.data();

    // Calcular calificación
    const solucionario = solucionarioData.respuestas.map(resp => JSON.parse(resp));
    let aciertos = 0;
    let total = solucionario.length;

    for (let i = 0; i < total; i++) {
      const respuestaEstudiante = respuestasFormateadas[i].respuesta.toUpperCase();
      const respuestaCorrecta = solucionario[i].respuesta.toUpperCase();

      if (respuestaEstudiante === respuestaCorrecta) {
        aciertos += solucionario[i].valor || 1;
      }
    }

    const nota = Math.round((aciertos / total) * 10);

    // Generar retroalimentación
    let retroalimentacion = '';
    if (nota >= 9) {
      retroalimentacion = '¡Excelente trabajo! Has dominado este tema.';
    } else if (nota >= 7) {
      retroalimentacion = 'Buen trabajo. Has comprendido la mayoría de los conceptos.';
    } else if (nota >= 5) {
      retroalimentacion = 'Aprobado. Hay algunos conceptos que deberías revisar.';
    } else {
      retroalimentacion = 'Necesitas repasar los conceptos básicos de este tema.';
    }

    // Guardar respuestas en Firestore
    const respuestasRef = collection(db, `cursos2/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/respuestas`);
    const q = query(respuestasRef, where('userId', '==', userId));
    const respuestasSnapshot = await getDocs(q);

    if (respuestasSnapshot.empty) {
      await addDoc(respuestasRef, {
        userId: userId,
        respuestas: respuestasFormateadas,
        calificacion: nota,
        retroalimentacion,
        fechaEnvio: new Date()
      });
    } else {
      const respuestaDoc = respuestasSnapshot.docs[0];
      await updateDoc(doc(db, `cursos2/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/respuestas/${respuestaDoc.id}`), {
        respuestas: respuestasFormateadas,
        calificacion: nota,
        retroalimentacion,
        fechaEnvio: new Date()
      });
    }

    // Determinar clase CSS según la nota
    let claseNota = 'malo';
    if (nota >= 9) claseNota = 'excelente';
    else if (nota >= 7) claseNota = 'bueno';
    else if (nota >= 5) claseNota = 'regular';

    // Mostrar resultado
    resultadoTarea.value = {
      nota,
      mensaje: retroalimentacion,
      clase: claseNota
    };

    // Cargar información del solucionario
    await cargarSolucionario(recursoId);

  } catch (err) {
    console.error('Error al enviar respuestas:', err);
    showToast('No se pudieron enviar las respuestas. Por favor, intenta de nuevo.', 'error');
  } finally {
    enviandoRespuestas.value = false;
  }
};

// Cargar información del solucionario
const cargarSolucionario = async (recursoId) => {
  try {
    const cursoId = route.params.id;
    const semanaId = semanaActiva.value;

    const solucionariosRef = collection(db, `cursos2/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/solucionarios`);
    const solucionariosSnapshot = await getDocs(solucionariosRef);

    if (!solucionariosSnapshot.empty) {
      const solucionarioDoc = solucionariosSnapshot.docs[0];
      const data = solucionarioDoc.data();

      if (data.archivoUrl && data.nombreArchivo) {
        solucionarioInfo.value = {
          url: data.archivoUrl,
          nombre: data.nombreArchivo
        };
      }
    }
  } catch (error) {
    console.error('Error al cargar solucionario:', error);
  }
};
</script>

<style scoped>
.curso-gratuito-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  overflow-x: hidden;
}

.curso-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.curso-titulo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #d5deec;
  border: none;
  color: #0B215C;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.back-btn:hover {
  background-color: rgba(0, 82, 175, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.curso-titulo {
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.curso-gratuito-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #4caf50;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.curso-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* Estados de carga */
.estado-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  min-height: 50vh;
}

.error-container {
  color: #d32f2f;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 82, 175, 0.1);
  border-top: 3px solid #0052af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover {
  background-color: #003c8f;
}

/* Banner del curso */
.curso-banner {
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  position: relative;
  margin-bottom: 2rem;
  border: 2px solid #4caf50;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.15);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  border-radius: 12px;
}

.banner-content {
  position: relative;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
}

.banner-content h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem;
}

.banner-content p {
  font-size: 1.1rem;
  margin: 0 0 1rem;
  max-width: 700px;
}

.banner-badge {
  display: inline-flex;
  align-items: center;
  background: #4caf50;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  width: fit-content;
}

/* Acordeón de semanas */
.semanas-lista {
  margin-bottom: 3rem;
}

.semana-item {
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
  border: 1px solid #e8f5e9;
}

.semana-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #f8fff8, #ffffff);
}

.semana-header:hover {
  background-color: rgba(76, 175, 80, 0.05);
}

.semana-header.active {
  background-color: rgba(76, 175, 80, 0.08);
}

.semana-titulo {
  display: flex;
  flex-direction: column;
}

.semana-numero {
  font-size: 0.9rem;
  color: #4caf50;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.semana-titulo h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.semana-toggle svg {
  transition: transform 0.3s;
  color: #4caf50;
}

.semana-header.active .semana-toggle svg {
  transform: rotate(180deg);
}

.semana-contenido {
  padding: 0 1.5rem 1.5rem;
}

.recursos-empty {
  text-align: center;
  padding: 2rem;
  color: #757575;
}

/* Lista de recursos */
.recursos-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recurso-item {
  display: flex;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 8px;
  background-color: #f8fff8;
  border: 1px solid #e8f5e9;
}

.recurso-tipo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  flex-shrink: 0;
}

.recurso-tipo.guia {
  background-color: #4caf50;
  color: white;
}

.recurso-tipo.clase {
  background-color: #2196f3;
  color: white;
}

.recurso-tipo.tarea {
  background-color: #ff9800;
  color: white;
}

.recurso-info {
  flex: 1;
}

.recurso-info h4 {
  margin: 0 0 0.5rem;
  color: #333;
}

.recurso-info p {
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.9rem;
}

.recurso-acciones {
  display: flex;
  gap: 1rem;
}

.accion-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  text-decoration: none;
}

.descargar-btn {
  background-color: #f8f9fa;
  color: #4caf50;
  border: 1px solid #4caf50;
}

.descargar-btn:hover {
  background-color: #4caf50;
  color: white;
}

.ver-btn {
  background-color: #2196f3;
  color: white;
}

.ver-btn:hover {
  background-color: #1976d2;
}

.responder-btn {
  background-color: #ff9800;
  color: white;
}

.responder-btn:hover {
  background-color: #f57c00;
}

/* CTA de conversión */
.conversion-cta {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

.cta-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
}

.cta-card::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.cta-icon {
  color: #ffd700;
  margin-bottom: 1.5rem;
}

.cta-card h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.cta-card p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.cta-btn.primary {
  background-color: white;
  color: #0052af;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.cta-btn.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.cta-btn.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

/* Modal */
.recurso-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  position: relative;
  background-color: white;
  width: 95%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.cerrar-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Contenido específico del modal */
.clase-container .video-wrapper {
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding-top: 56.25%;
  background-color: #000;
  width: 100%;
}

.clase-container .video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.clase-descripcion h4 {
  margin: 0 0 0.8rem;
  color: #333;
}

.tarea-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.tarea-instrucciones h4,
.formulario-tarea h4 {
  margin: 0 0 0.8rem;
  color: #333;
}

.tarea-archivo {
  margin-top: 1rem;
}

.archivo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0052af;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0.7rem 1.2rem;
  background-color: #f8f9fa;
  border: 2px solid #0052af;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.archivo-link:hover {
  background-color: #0052af;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 82, 175, 0.2);
}

.instruccion-tarea {
  margin-bottom: 1rem;
  color: #666;
}

.pregunta-item {
  margin-bottom: 1rem;
}

.pregunta-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.pregunta-item input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

.submit-container {
  margin-top: 1.5rem;
}

.submit-respuestas {
  padding: 0.8rem 1.5rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-respuestas:hover {
  background-color: #003c8f;
}

/* Resultado completo - DISEÑO MINIMALISTA Y PROFESIONAL */
.resultado-completo {
  text-align: center;
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  margin: 0 auto;
}

.resultado-completo h4 {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #374151;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.calificacion {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Nota - diseño minimalista */
.nota {
  font-size: 2.5rem;
  font-weight: 700;
  color: #374151;
  background: #f9fafb;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #e5e7eb;
  transition: all 0.3s ease;
  letter-spacing: -0.05em;
}

/* Colores según la nota - más sutiles */
.nota.excelente {
  color: #059669;
  border-color: #10b981;
  background: #f0fdf4;
}

.nota.bueno {
  color: #0284c7;
  border-color: #0ea5e9;
  background: #f0f9ff;
}

.nota.regular {
  color: #d97706;
  border-color: #f59e0b;
  background: #fffbeb;
}

.nota.malo {
  color: #dc2626;
  border-color: #ef4444;
  background: #fef2f2;
}

.retroalimentacion {
  max-width: 350px;
  margin: 0 auto;
}

.retroalimentacion p {
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin: 0;
  font-weight: 400;
}

/* Solucionario - diseño minimalista */
.solucionario-descarga {
  margin-top: 2rem;
  padding: 0;
  background: transparent;
  border: none;
}

.solucionario-descarga h5 {
  margin: 0 0 1rem;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.solucionario-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0284c7;
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.solucionario-link:hover {
  background: #0284c7;
  color: white;
  border-color: #0284c7;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
}

.solucionario-link svg {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.solucionario-link:hover svg {
  transform: scale(1.1);
}

/* Toast */
.toast-container {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.8rem 1.5rem;
  min-width: 250px;
  max-width: 80%;
  animation: fadeIn 0.3s;
  opacity: 0.95;
}

.toast-container.error {
  border-left: 4px solid #f44336;
}

.toast-message {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.toast-message svg {
  flex-shrink: 0;
  color: #f44336;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 0.95;
    transform: translate(-50%, 0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .curso-content {
    padding: 0 1rem;
    margin: 1rem auto;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .curso-titulo-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
  }

  .back-btn {
    padding: 0.8rem 1.2rem;
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .tarea-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    overflow-y: auto;
  }

  .pregunta-item input {
    width: 100%;
    max-width: calc(100vw - 4rem);
    box-sizing: border-box;
  }

  .recurso-acciones {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .accion-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }

  .modal-content {
    padding: 1rem;
    max-height: 70vh;
    overflow-y: auto;
  }

  .clase-container .video-wrapper {
    margin-bottom: 1rem;
  }

  .submit-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .submit-respuestas {
    width: 100%;
    padding: 0.8rem 1rem;
  }

  .formulario-tarea {
    overflow-y: auto;
    max-height: 60vh;
  }

  .toast-container {
    width: 85%;
    padding: 0.7rem 1rem;
    bottom: 1rem;
  }

  .resultado-completo {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }

  .nota {
    width: 90px;
    height: 90px;
    font-size: 2.2rem;
  }

  .retroalimentacion p {
    font-size: 0.95rem;
    padding: 1.2rem;
  }

  .solucionario-link {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .cta-card {
    padding: 2rem 1.5rem;
  }

  .cta-card h3 {
    font-size: 1.5rem;
  }

  .cta-card p {
    font-size: 1rem;
  }
}
</style>