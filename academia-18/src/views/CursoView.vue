<template>
  <div class="curso-container">
    <!-- Header con navegación -->
    <header class="curso-header">
      <div class="header-content">
        <button @click="volverADashboard" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Volver a cursos</span>
        </button>

        <h1 class="curso-titulo">{{ curso.titulo || 'Cargando...' }}</h1>
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
      </div>
    </main>

    <!-- Modal para clase o tarea -->
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
              <!-- Contenido para clase (video) - Sin cambios -->
              <div v-if="modalTipo === 'clase'" class="clase-container">
                <div class="video-wrapper">
                  <iframe :src="recursoActivo.videoUrl" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="clase-descripcion">
                  <h4>Descripción de la clase</h4>
                  <p>{{ recursoActivo.descripcion }}</p>
                </div>
              </div>

              <!-- Contenido para tarea - Reestructurado -->
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

                <!-- Formulario de respuestas - Reestructurado -->
                <div class="formulario-tarea">
                  <h4>Respuestas</h4>
                  <p class="instruccion-tarea">Ingresa las respuestas a las preguntas:</p>

                  <form @submit.prevent="enviarRespuestas" class="respuestas-form">
                    <div class="preguntas-container">
                      <div v-for="i in 10" :key="i" class="pregunta-item">
                        <label :for="'pregunta-' + i">Pregunta {{ i }}</label>
                        <input :id="'pregunta-' + i" v-model="respuestas[i - 1]" type="text" placeholder="Tu respuesta"
                          required />
                      </div>
                    </div>

                    <div class="submit-container">
                      <button type="submit" class="submit-respuestas" :disabled="enviandoRespuestas">
                        <span v-if="enviandoRespuestas">Enviando...</span>
                        <span v-else>Enviar respuestas</span>
                      </button>
                    </div>
                  </form>

                  <!-- Resultado después de enviar -->
                  <div v-if="resultadoTarea" class="resultado-tarea">
                    <h4>Calificación</h4>
                    <div class="calificacion">
                      <div class="nota">{{ resultadoTarea.nota }}/10</div>
                      <div class="retroalimentacion">
                        <p>{{ resultadoTarea.mensaje }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Componente Toast -->
  <div v-if="toast.visible" class="toast-container" :class="toast.type">
    <div class="toast-message">
      <svg v-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <svg v-if="toast.type === 'info'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
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
const respuestas = ref(Array(10).fill(''));
const enviandoRespuestas = ref(false);
const resultadoTarea = ref(null);

// Cargar datos del curso
onMounted(async () => {
  // Verificar autenticación
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      router.push('/aula-virtual');
      return;
    }

    await cargarCurso();
  });
});
// Función para detectar dispositivo móvil y ajustar comportamiento
const isMobile = () => {
  return window.innerWidth <= 768;
};

// En la función cargarCurso, asegúrate de que estás recuperando todos los recursos
// En la función cargarCurso
const cargarCurso = async () => {
  loading.value = true;
  error.value = null;

  try {
    const cursoId = route.params.id;
    if (!cursoId) {
      throw new Error('ID de curso no proporcionado');
    }

    // Obtener datos del curso
    const cursoDoc = await getDoc(doc(db, 'cursos', cursoId));
    if (!cursoDoc.exists()) {
      throw new Error('El curso no existe');
    }

    curso.value = {
      id: cursoDoc.id,
      ...cursoDoc.data()
    };

    // Obtener semanas del curso
    const semanasRef = collection(db, `cursos/${cursoId}/semanas`);
    const q = query(semanasRef, orderBy('orden', 'asc'));
    const semanasSnapshot = await getDocs(q);

    // Crear array de semanas
    const semanasTemp = [];
    for (const semanaDoc of semanasSnapshot.docs) {
      // Para cada semana, obtener sus recursos
      const recursosRef = collection(db, `cursos/${cursoId}/semanas/${semanaDoc.id}/recursos`);

      // No usar query con orderBy si no es necesario, para asegurar que todos los recursos se obtengan
      const recursosSnapshot = await getDocs(recursosRef);

      // Depurar para verificar si se están encontrando todos los recursos
      console.log(`Semana ${semanaDoc.id} - Recursos encontrados: ${recursosSnapshot.docs.length}`);
      console.log('IDs de recursos encontrados:', recursosSnapshot.docs.map(doc => doc.id).join(', '));

      // Crear array de recursos
      const recursos = recursosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Añadir semana con sus recursos
      semanasTemp.push({
        id: semanaDoc.id,
        ...semanaDoc.data(),
        recursos
      });
    }

    semanas.value = semanasTemp;

    // Si hay semanas, abrir la primera por defecto
    if (semanasTemp.length > 0) {
      semanaActiva.value = semanasTemp[0].id;
    }

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

// Función para volver al dashboard
const volverADashboard = () => {
  router.push('/dashboard');
};
const handleDescargar = (recurso) => {
  // Validar si existe una URL de archivo
  if (!recurso.archivoUrl || recurso.archivoUrl.trim() === '') {
    showToast('El archivo no está disponible en este momento. Por favor, vuelve más tarde.', 'error');
    return;
  }

  // Si hay URL válida, abre en nueva pestaña
  window.open(recurso.archivoUrl, '_blank');
};

const toast = ref({
  visible: false,
  message: '',
  type: 'info' // 'info', 'error', 'success'
});

// Función para mostrar toast
const showToast = (message, type = 'info') => {
  toast.value = {
    visible: true,
    message,
    type
  };

  // Ocultar automáticamente después de 3 segundos
  setTimeout(() => {
    toast.value.visible = false;
  }, 3000);
};

// Abrir modal de recurso
const abrirRecursoModal = (recurso, tipo) => {
  recursoActivo.value = recurso;
  modalTipo.value = tipo;
  modalVisible.value = true;

  // Si es una tarea, verificar si ya hay respuestas previas
  if (tipo === 'tarea') {
    respuestas.value = Array(10).fill('');
    resultadoTarea.value = null;
    cargarRespuestaPrevia(recurso.id);
  }
};

// Agregar función para manejo de archivos dentro del modal
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
};


// Cargar respuesta previa de tarea
const cargarRespuestaPrevia = async (recursoId) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const cursoId = route.params.id;
    const semanaId = semanaActiva.value;

    const respuestasRef = collection(db, `cursos/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/respuestas`);
    const q = query(respuestasRef, where('userId', '==', user.uid));
    const respuestasSnapshot = await getDocs(q);

    if (!respuestasSnapshot.empty) {
      const respuestaDoc = respuestasSnapshot.docs[0];
      const respuestaData = respuestaDoc.data();

      // Cargar respuestas anteriores
      respuestas.value = respuestaData.respuestas.map(r => r.respuesta);

      // Mostrar resultado
      resultadoTarea.value = {
        nota: respuestaData.calificacion,
        mensaje: respuestaData.retroalimentacion
      };
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
    const user = auth.currentUser;
    if (!user) throw new Error('No se ha iniciado sesión');

    const cursoId = route.params.id;
    const semanaId = semanaActiva.value;
    const recursoId = recursoActivo.value.id;

    // Formatear respuestas para guardar
    const respuestasFormateadas = respuestas.value.map((respuesta, index) => ({
      pregunta: index + 1,
      respuesta: respuesta.trim()
    }));

    // Obtener respuestas correctas (solucionario)
    const solucionarioRef = doc(db, `cursos/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/solucionario`);
    const solucionarioDoc = await getDoc(solucionarioRef);

    if (!solucionarioDoc.exists()) {
      throw new Error('No se encontró el solucionario para esta tarea');
    }

    // Calcular calificación
    const solucionario = solucionarioDoc.data().respuestas;
    let aciertos = 0;
    let total = solucionario.length;

    for (let i = 0; i < total; i++) {
      if (respuestasFormateadas[i].respuesta.toLowerCase() === solucionario[i].respuesta.toLowerCase()) {
        aciertos += solucionario[i].valor || 1;
      }
    }

    // Calcular nota final (sobre 10)
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
    const respuestasRef = collection(db, `cursos/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/respuestas`);
    const q = query(respuestasRef, where('userId', '==', user.uid));
    const respuestasSnapshot = await getDocs(q);

    if (respuestasSnapshot.empty) {
      // Crear nuevo documento
      await addDoc(respuestasRef, {
        userId: user.uid,
        respuestas: respuestasFormateadas,
        calificacion: nota,
        retroalimentacion,
        fechaEnvio: new Date()
      });
    } else {
      // Actualizar documento existente
      const respuestaDoc = respuestasSnapshot.docs[0];
      await updateDoc(doc(db, `cursos/${cursoId}/semanas/${semanaId}/recursos/${recursoId}/respuestas/${respuestaDoc.id}`), {
        respuestas: respuestasFormateadas,
        calificacion: nota,
        retroalimentacion,
        fechaEnvio: new Date()
      });
    }

    // Mostrar resultado
    resultadoTarea.value = {
      nota,
      mensaje: retroalimentacion
    };

  } catch (err) {
    console.error('Error al enviar respuestas:', err);
    alert('No se pudieron enviar las respuestas. Por favor, intenta de nuevo.');
  } finally {
    enviandoRespuestas.value = false;
  }
};


</script>

<style scoped>
.curso-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  overflow-x: hidden;
  /* Evita desbordamiento horizontal */
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

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #0052af;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
}

.back-btn:hover {
  background-color: rgba(0, 82, 175, 0.08);
}

.curso-titulo {
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.curso-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* Banner del curso */
.curso-banner {
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  position: relative;
  margin-bottom: 2rem;
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
  margin: 0;
  max-width: 700px;
}

/* Acordeón de semanas */
.semanas-lista {
  margin-bottom: 2rem;
}

.semana-item {
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.semana-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.semana-header:hover {
  background-color: rgba(0, 82, 175, 0.05);
}

.semana-header.active {
  background-color: rgba(0, 82, 175, 0.08);
}

.semana-titulo {
  display: flex;
  flex-direction: column;
}

.semana-numero {
  font-size: 0.9rem;
  color: #0052af;
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
  background-color: #f8f9fa;
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
  background-color: #f44336;
  color: white;
}

.recurso-tipo.tarea {
  background-color: #2196f3;
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
  color: #0052af;
  border: 1px solid #0052af;
}

.descargar-btn:hover {
  background-color: rgba(0, 82, 175, 0.08);
}

.ver-btn {
  background-color: #f44336;
  color: white;
}

.ver-btn:hover {
  background-color: #d32f2f;
}

.responder-btn {
  background-color: #2196f3;
  color: white;
}

.responder-btn:hover {
  background-color: #1976d2;
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

.clase-container .video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
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
  /* Mantiene proporción 16:9 */
  background-color: #000;
  width: 100%;
}

.demo-video {
  background-color: #000;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.demo-video-placeholder p {
  margin-top: 1rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0052af;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
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

.demo-note {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #0052af;
}

.demo-note p {
  margin: 0;
  color: #333;
}

/* Mensaje Demo */
.mensaje-demo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 110;
  background-color: rgba(0, 0, 0, 0.5);
}

.mensaje-demo-container {
  background-color: white;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
}

.mensaje-demo-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.mensaje-demo-header h3 {
  margin: 0;
  color: #0052af;
}

.cerrar-mensaje {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.mensaje-demo-content {
  padding: 1.5rem;
  text-align: center;
}

.mensaje-demo-content p {
  margin-bottom: 1rem;
}

.ir-login-btn {
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.ir-login-btn:hover {
  background-color: #003c8f;
}

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

.toast-container.info {
  border-left: 4px solid #2196f3;
}

.toast-container.success {
  border-left: 4px solid #4caf50;
}

.toast-message {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.toast-message svg {
  flex-shrink: 0;
}

.toast-container.error svg {
  color: #f44336;
}

.toast-container.info svg {
  color: #2196f3;
}

.toast-container.success svg {
  color: #4caf50;
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

  /* Botones en modo móvil */
  .recurso-acciones {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .accion-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }

  /* Ajustes para el modal de tareas */
  .modal-content {
    padding: 1rem;
    max-height: 70vh;
    overflow-y: auto;
  }

  /* Ajuste para vídeos */
  .clase-container .video-wrapper {
    margin-bottom: 1rem;
  }

  /* Botones de envío */
  .submit-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .submit-respuestas {
    width: 100%;
    padding: 0.8rem 1rem;
  }

  /* Ajustes para campos de respuesta */
  .formulario-tarea {
    overflow-y: auto;
    max-height: 60vh;
  }

  .toast-container {
    width: 85%;
    padding: 0.7rem 1rem;
    bottom: 1rem;
  }

}
</style>