<template>
  <div class="reto-container">
    <!-- Header -->
    <header class="reto-header">
      <div class="header-content">
        <button @click="volverADashboard" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Volver</span>
        </button>
        <h1 class="reto-titulo">Reto Diario - RV</h1>
      </div>
    </header>

    <!-- Contenido -->
    <main class="reto-content">
      <!-- Loading -->
      <div v-if="loading" class="estado-container">
        <div class="loading-spinner"></div>
        <p>Cargando retos...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="estado-container error-container">
        <p>{{ error }}</p>
        <button @click="cargarRetos" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Lista de semanas -->
      <div v-else class="semanas-lista">
        <div v-for="semana in semanas" :key="semana.id" class="semana-item">
          <div class="semana-header" @click="toggleSemana(semana.id)" 
               :class="{ active: semanaActiva === semana.id }">
            <div class="semana-info">
              <h3>{{ semana.titulo }}</h3>
            </div>
            <div class="semana-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <!-- Contenido de la semana -->
          <div v-if="semanaActiva === semana.id" class="semana-contenido">
            <div class="materiales-grid">
              <!-- TEORÍA -->
              <div class="material-seccion">
                <div class="seccion-header" 
                     @click="toggleSeccion(semana.id, 'teoria')"
                     :class="{ active: estaAbierta(semana.id, 'teoria') }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
                       fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span>TEORÍA</span>
                  <div class="seccion-arrow" :class="{ rotated: estaAbierta(semana.id, 'teoria') }">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                <div v-if="estaAbierta(semana.id, 'teoria')" class="archivos-lista">
  <div v-if="!semana.teoria || semana.teoria.length === 0" class="archivos-empty">
    <p>No hay material teórico disponible</p>
  </div>
  <div v-else v-for="archivo in semana.teoria" :key="archivo.id" class="archivo-item">
    <div class="archivo-info">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
      <span>{{ archivo.titulo }}</span>
    </div>
    <button @click="abrirVisorTeoria(archivo)" class="view-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    </button>
  </div>
</div>
              </div>

              <!-- PRÁCTICA -->
              <div class="material-seccion">
                <div class="seccion-header" 
                     @click="toggleSeccion(semana.id, 'practica')"
                     :class="{ active: estaAbierta(semana.id, 'practica') }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
                       fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>PRÁCTICA</span>
                  <div class="seccion-arrow" :class="{ rotated: estaAbierta(semana.id, 'practica') }">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                <div v-if="estaAbierta(semana.id, 'practica')" class="archivos-lista">
                  <div v-if="!semana.practica || semana.practica.length === 0" class="archivos-empty">
                    <p>No hay ejercicios disponibles</p>
                  </div>
                  <div v-else v-for="tarea in semana.practica" :key="tarea.id" class="archivo-item tarea-item">
                    <div class="tarea-header-info">
                      <div class="archivo-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
                             fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <span>{{ tarea.titulo }}</span>
                      </div>
                      <div v-if="tarea.calificacion !== undefined" class="nota-badge" 
                           :class="getNotaClase(tarea.calificacion)">
                        {{ tarea.calificacion }}/5
                      </div>
                    </div>
                    <div class="tarea-acciones">
                      <button @click="abrirTarea(semana.id, tarea)" class="responder-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
                             fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <span>{{ tarea.calificacion !== undefined ? 'Ver respuesta' : 'Responder' }}</span>
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

    <!-- Modal para Tarea -->
    <div v-if="modalVisible" class="recurso-modal">
      <div class="modal-overlay" @click="cerrarModal"></div>

      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ tareaActiva.titulo }}</h3>
          <button @click="cerrarModal" class="cerrar-modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <div class="tarea-container">
            <!-- Instrucciones -->
            <div class="tarea-instrucciones">
              <h4>Instrucciones</h4>
              <p>{{ tareaActiva.descripcion }}</p>
              
              <!-- Visor de documento -->
              <div class="documento-viewer">
                <div class="viewer-toolbar">
                  <button @click="abrirEnNuevaVentana(tareaActiva.archivoUrl)" class="toolbar-btn" title="Abrir en nueva pestaña">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
                         fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Abrir en Drive
                  </button>
                </div>
                <iframe 
                  v-if="tareaActiva.archivoUrl"
                  :src="getPreviewUrl(tareaActiva.archivoUrl)" 
                  class="document-iframe"
                  frameborder="0"
                  allowfullscreen>
                </iframe>
              </div>
            </div>

            <!-- Formulario -->
            <div class="formulario-tarea">
              <div v-if="!resultadoTarea">
                <h4>Respuestas</h4>
                <p class="instruccion-tarea">Ingresa las respuestas (A, B, C, D o E):</p>

                <form @submit.prevent="enviarRespuestas" class="respuestas-form">
                  <div class="preguntas-container">
                    <div v-for="i in 5" :key="i" class="pregunta-item">
                      <label>Pregunta {{ i }}</label>
                      <div class="custom-select" :class="{ 'open': dropdownAbierto === i }">
                        <div class="select-trigger" @click="toggleDropdown(i)">
                          <span class="select-value">{{ respuestas[i - 1] || 'Seleccionar' }}</span>
                          <div class="select-arrow">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                          </div>
                        </div>
                        <div class="select-options">
                          <div v-for="opcion in ['A', 'B', 'C', 'D', 'E']" :key="opcion" class="select-option"
                               :class="{ 'selected': respuestas[i - 1] === opcion }"
                               @click="seleccionarOpcion(i - 1, opcion)">
                            {{ opcion }}
                          </div>
                        </div>
                      </div>
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

              <!-- Resultado -->
              <div v-if="resultadoTarea" class="resultado-completo">
                <h4>Calificación</h4>
                <div class="calificacion">
                  <div class="nota" :class="resultadoTarea.clase">{{ resultadoTarea.nota }}/5</div>
                  <div class="retroalimentacion">
                    <p>{{ resultadoTarea.mensaje }}</p>
                  </div>
                  <div v-if="solucionarioInfo" class="solucionario-descarga">
                    <h5>Descarga el solucionario:</h5>
                    <a :href="solucionarioInfo.url" target="_blank" class="solucionario-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
                           fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
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
  </div>

  <!-- Modal para Visor de Teoría -->
<div v-if="modalTeoriaVisible" class="recurso-modal">
  <div class="modal-overlay" @click="cerrarModalTeoria"></div>

  <div class="modal-container modal-viewer">
    <div class="modal-header">
      <h3>{{ archivoTeoriaActivo.titulo }}</h3>
      <button @click="cerrarModalTeoria" class="cerrar-modal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="modal-content-viewer">
      <div class="documento-viewer-full">
        <div class="viewer-toolbar">
          <button @click="abrirEnNuevaVentana(archivoTeoriaActivo.archivoUrl)" class="toolbar-btn" title="Abrir en nueva pestaña">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Abrir en Drive
          </button>
        </div>
        <iframe 
          v-if="archivoTeoriaActivo.archivoUrl"
          :src="getPreviewUrl(archivoTeoriaActivo.archivoUrl)" 
          class="document-iframe-full"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </div>
</div>
  <!-- Toast -->
  <div v-if="toast.visible" class="toast-container" :class="toast.type">
    <div class="toast-message">
      <svg v-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '@/firebase';
import { collection, query, getDocs, orderBy, where, addDoc, updateDoc, doc } from 'firebase/firestore';

const router = useRouter();



// Convertir URL de Google Drive a formato de preview
const getPreviewUrl = (url) => {
  if (!url) return '';
  
  // Extraer el ID del archivo de Google Drive
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    // Usar el visor embebido de Google Drive
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  return url;
};

// Abrir en nueva ventana
const abrirEnNuevaVentana = (url) => {
  if (!url) {
    showToast('URL no disponible', 'error');
    return;
  }
  window.open(url, '_blank');
};

// Estados principales
const loading = ref(true);
const error = ref(null);
const semanas = ref([]);
const semanaActiva = ref(null);
const esUsuarioVip = ref(false);

// SOLUCIÓN SIMPLIFICADA - Una única fuente de verdad
const seccionesAbiertas = ref({});

// Estados del modal
const modalVisible = ref(false);
const tareaActiva = ref({});
const semanaIdActiva = ref(null);
const respuestas = ref(Array(5).fill(''));
const enviandoRespuestas = ref(false);
const resultadoTarea = ref(null);
const solucionarioInfo = ref(null);
const dropdownAbierto = ref(null);

// Toast
const toast = ref({ visible: false, message: '', type: 'info' });

// Colección única para todos los grupos
const coleccionRetos = 'retoDiario';

// Verificar acceso VIP
const verificarAccesoVip = async (userEmail) => {
  try {
    const vipQuery = query(
      collection(db, 'usuariosVip'),
      where('email', '==', userEmail),
      where('estado', '==', 'activo')
    );
    const querySnapshot = await getDocs(vipQuery);
    esUsuarioVip.value = !querySnapshot.empty;
  } catch (error) {
    console.error('Error al verificar acceso VIP:', error);
    esUsuarioVip.value = false;
  }
};

// Cargar retos
const cargarRetos = async () => {
  loading.value = true;
  error.value = null;

  try {
    const semanasRef = collection(db, coleccionRetos);
    const q = query(semanasRef, orderBy('orden', 'asc'));
    const snapshot = await getDocs(q);

    const semanasTemp = [];
    for (const semanaDoc of snapshot.docs) {
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
        
        // Buscar respuesta del usuario
        const respuestasRef = collection(db, `${coleccionRetos}/${semanaDoc.id}/practica/${tareaDoc.id}/respuestas`);
        const respuestaQuery = query(respuestasRef, where('userId', '==', auth.currentUser.uid));
        const respuestaSnapshot = await getDocs(respuestaQuery);
        
        if (!respuestaSnapshot.empty) {
          tareaData.calificacion = respuestaSnapshot.docs[0].data().calificacion;
        }
        
        return tareaData;
      });

      semanaData.practica = await Promise.all(practicaPromises);
      semanasTemp.push(semanaData);
    }

    semanas.value = semanasTemp;
  } catch (err) {
    console.error('Error al cargar retos:', err);
    error.value = 'No se pudieron cargar los retos';
  } finally {
    loading.value = false;
  }
};

// Toggle semana
const toggleSemana = (semanaId) => {
  semanaActiva.value = semanaActiva.value === semanaId ? null : semanaId;
};

// NUEVA FUNCIÓN SIMPLIFICADA
const toggleSeccion = (semanaId, tipo) => {
  const key = `${semanaId}-${tipo}`;
  seccionesAbiertas.value = {
    ...seccionesAbiertas.value,
    [key]: !seccionesAbiertas.value[key]
  };
};

// NUEVA FUNCIÓN HELPER
const estaAbierta = (semanaId, tipo) => {
  const key = `${semanaId}-${tipo}`;
  return seccionesAbiertas.value[key] || false;
};

// Descargar archivo
const descargarArchivo = (archivo) => {
  if (!archivo.archivoUrl) {
    showToast('Archivo no disponible', 'error');
    return;
  }
  window.open(archivo.archivoUrl, '_blank');
};

// Clase CSS según nota
const getNotaClase = (nota) => {
  if (nota >= 5) return 'nota-excelente';
  if (nota >= 4) return 'nota-buena';
  if (nota >= 3) return 'nota-regular';
  return 'nota-mala';
};

// Abrir modal de tarea
const abrirTarea = async (semanaId, tarea) => {
  semanaIdActiva.value = semanaId;
  tareaActiva.value = tarea;
  modalVisible.value = true;
  respuestas.value = Array(5).fill('');
  resultadoTarea.value = null;
  solucionarioInfo.value = null;
  
  await cargarRespuestaPrevia(semanaId, tarea.id);
};

// Cerrar modal
const cerrarModal = () => {
  modalVisible.value = false;
  tareaActiva.value = {};
  semanaIdActiva.value = null;
  respuestas.value = Array(5).fill('');
  resultadoTarea.value = null;
  solucionarioInfo.value = null;
  dropdownAbierto.value = null;
};

// Toggle dropdown
const toggleDropdown = (index) => {
  dropdownAbierto.value = dropdownAbierto.value === index ? null : index;
};

// Seleccionar opción
const seleccionarOpcion = (index, opcion) => {
  respuestas.value[index] = opcion;
  dropdownAbierto.value = null;
};

// Cerrar dropdowns al hacer click fuera
const cerrarDropdownsAlClickFuera = (event) => {
  if (!event.target.closest('.custom-select')) {
    dropdownAbierto.value = null;
  }
};

// Cargar respuesta previa
const cargarRespuestaPrevia = async (semanaId, tareaId) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const respuestasRef = collection(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/respuestas`);
    const q = query(respuestasRef, where('userId', '==', user.uid));
    const respuestasSnapshot = await getDocs(q);

    if (!respuestasSnapshot.empty) {
      const respuestaDoc = respuestasSnapshot.docs[0];
      const respuestaData = respuestaDoc.data();

      respuestas.value = respuestaData.respuestas.map(r => r.respuesta);
      const nota = respuestaData.calificacion;
      
      let claseNota = 'malo';
      if (nota >= 5) claseNota = 'excelente';
      else if (nota >= 4) claseNota = 'bueno';
      else if (nota >= 3) claseNota = 'regular';

      resultadoTarea.value = {
        nota: respuestaData.calificacion,
        mensaje: respuestaData.retroalimentacion,
        clase: claseNota
      };

      await cargarSolucionario(semanaId, tareaId);
    }
  } catch (err) {
    console.error('Error al cargar respuesta previa:', err);
  }
};

// Enviar respuestas
const enviarRespuestas = async () => {
  enviandoRespuestas.value = true;
  resultadoTarea.value = null;

  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No se ha iniciado sesión');

    const semanaId = semanaIdActiva.value;
    const tareaId = tareaActiva.value.id;

    const respuestasFormateadas = respuestas.value.map((respuesta, index) => ({
      pregunta: index + 1,
      respuesta: respuesta.trim()
    }));

    // Obtener solucionario
    const solucionariosRef = collection(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/solucionarios`);
    const solucionariosSnapshot = await getDocs(solucionariosRef);

    if (solucionariosSnapshot.empty) {
      throw new Error('No se encontró el solucionario para esta tarea');
    }

    const solucionarioDoc = solucionariosSnapshot.docs[0];
    const solucionarioData = solucionarioDoc.data();

    // Calcular calificación
    const solucionario = solucionarioData.respuestas.map(resp => JSON.parse(resp));
    let aciertos = 0;
    const total = solucionario.length;

    for (let i = 0; i < total; i++) {
      const respuestaEstudiante = respuestasFormateadas[i].respuesta.toUpperCase();
      const respuestaCorrecta = solucionario[i].respuesta.toUpperCase();

      if (respuestaEstudiante === respuestaCorrecta) {
        aciertos += solucionario[i].valor || 1;
      }
    }

    const nota = Math.round((aciertos / total) * 5);

    // Generar retroalimentación
    let retroalimentacion = '';
    if (nota >= 5) {
      retroalimentacion = 'Excelente trabajo. Has dominado este tema.';
    } else if (nota >= 4) {
      retroalimentacion = 'Buen trabajo. Has comprendido la mayoría de los conceptos.';
    } else if (nota >= 3) {
      retroalimentacion = 'Regular. Hay algunos conceptos que deberías revisar.';
    } else {
      retroalimentacion = 'Necesitas repasar los conceptos básicos de este tema.';
    }

    // Guardar respuestas
    const respuestasRef = collection(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/respuestas`);
    const q = query(respuestasRef, where('userId', '==', user.uid));
    const respuestasSnapshot = await getDocs(q);

    if (respuestasSnapshot.empty) {
      await addDoc(respuestasRef, {
        userId: user.uid,
        respuestas: respuestasFormateadas,
        calificacion: nota,
        retroalimentacion,
        fechaEnvio: new Date()
      });
    } else {
      const respuestaDoc = respuestasSnapshot.docs[0];
      await updateDoc(doc(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/respuestas/${respuestaDoc.id}`), {
        respuestas: respuestasFormateadas,
        calificacion: nota,
        retroalimentacion,
        fechaEnvio: new Date()
      });
    }

    let claseNota = 'malo';
    if (nota >= 5) claseNota = 'excelente';
    else if (nota >= 4) claseNota = 'bueno';
    else if (nota >= 3) claseNota = 'regular';

    resultadoTarea.value = {
      nota,
      mensaje: retroalimentacion,
      clase: claseNota
    };

    await cargarSolucionario(semanaId, tareaId);
    await cargarRetos();

  } catch (err) {
    console.error('Error al enviar respuestas:', err);
    showToast('No se pudieron enviar las respuestas. Por favor, intenta de nuevo.', 'error');
  } finally {
    enviandoRespuestas.value = false;
  }
};

// Cargar solucionario
const cargarSolucionario = async (semanaId, tareaId) => {
  try {
    const solucionariosRef = collection(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/solucionarios`);
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

// Descargar desde modal
const descargarDesdeModal = (archivo) => {
  if (!archivo.archivoUrl) {
    showToast('Archivo no disponible', 'error');
    return;
  }
  window.open(archivo.archivoUrl, '_blank');
};

// Volver al dashboard
const volverADashboard = () => {
  router.push('/dashboard?tab=vip');
};

// Mostrar toast
const showToast = (message, type = 'info') => {
  toast.value = { visible: true, message, type };
  setTimeout(() => toast.value.visible = false, 3000);
};

// Lifecycle
onMounted(async () => {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      router.push('/aula-virtual');
      return;
    }
    
    await verificarAccesoVip(user.email);
    if (!esUsuarioVip.value) {
      showToast('No tienes acceso al Reto Diario. Contacta con tu instructor.', 'error');
      setTimeout(() => router.push('/dashboard'), 2000);
      return;
    }
    
    await cargarRetos();
  });

  document.addEventListener('click', cerrarDropdownsAlClickFuera);
});

onUnmounted(() => {
  document.removeEventListener('click', cerrarDropdownsAlClickFuera);
});

// Modal de teoría
const modalTeoriaVisible = ref(false);
const archivoTeoriaActivo = ref({});

// Abrir visor de teoría
const abrirVisorTeoria = (archivo) => {
  archivoTeoriaActivo.value = archivo;
  modalTeoriaVisible.value = true;
};

// Cerrar modal de teoría
const cerrarModalTeoria = () => {
  modalTeoriaVisible.value = false;
  archivoTeoriaActivo.value = {};
};
</script>

<style scoped>
.reto-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.reto-header {
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
  background-color: #d5deec;
  border: none;
  color: #0b215c;
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

.reto-titulo {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.reto-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* Estados */
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover {
  background-color: #003c8f;
}

/* Semanas */
.semanas-lista {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.semana-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 2px solid #ffd700;
}

.semana-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #fff9e6, #ffffff);
}

.semana-header:hover {
  background: linear-gradient(135deg, #fff4d6, #fffef7);
}

.semana-header.active {
  background: linear-gradient(135deg, #ffefc6, #fff9e6);
}

.semana-info h3 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.semana-toggle svg {
  transition: transform 0.3s;
  color: #b8860b;
}

.semana-header.active .semana-toggle svg {
  transform: rotate(180deg);
}

.semana-contenido {
  padding: 1.5rem;
  background: white;
}

/* Grid de materiales */
.materiales-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.material-seccion {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.seccion-header {
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.seccion-header:hover {
  background: linear-gradient(135deg, #5a6fd8, #6a4291);
}

.seccion-header.active {
  background: linear-gradient(135deg, #5a6fd8, #6a4291);
}

/* ARROW FIX: El bug final se elimina aquí */
/* ARROW FIX: El bug final se elimina aquí */
.seccion-arrow {
  margin-left: auto;
  /* La transición debe ir en el elemento que se mueve (el SVG) */
}

/* Aplicar la transición al SVG para mayor robustez */
.seccion-arrow svg {
  transition: transform 0.3s ease; /* Añadimos ease para suavidad */
  transform: rotate(0deg); /* Aseguramos que el estado base es 0 */
}

/* ✅ REGLA FINAL Y MÁS ESPECÍFICA: Rota el SVG cuando su contenedor tiene la clase 'rotated' */
.seccion-arrow.rotated svg {
  transform: rotate(180deg);
}

/* Archivos */
.archivos-lista {
  padding: 1rem;
}

.archivos-empty {
  text-align: center;
  padding: 2rem 1rem;
  color: #757575;
  font-size: 0.9rem;
}

.archivo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: white;
  border-radius: 6px;
  margin-bottom: 0.8rem;
  border: 1px solid #e0e0e0;
  transition: all 0.2s;
}

.archivo-item:hover {
  border-color: #0052af;
  box-shadow: 0 2px 8px rgba(0, 82, 175, 0.1);
}

.archivo-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
}

.archivo-info svg {
  color: #0052af;
  flex-shrink: 0;
}

.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #f0f9ff;
  border: 1px solid #0284c7;
  color: #0284c7;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.view-btn:hover {
  background: #0284c7;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.2);
}
/* Tareas */
.tarea-item {
  flex-direction: column;
  align-items: stretch;
  padding: 1rem;
}

.tarea-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  width: 100%;
}

.nota-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.nota-excelente {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.nota-buena {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.nota-regular {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.nota-mala {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.tarea-acciones {
  display: flex;
  gap: 0.8rem;
}

.responder-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.responder-btn:hover {
  background: #1976d2;
  transform: translateY(-1px);
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
  max-width: 600px;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.cerrar-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.cerrar-modal:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Tarea container */
.tarea-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tarea-instrucciones h4,
.formulario-tarea h4 {
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.1rem;
}

.tarea-archivo {
  margin-top: 1rem;
}

.archivo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0052af;
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
  font-size: 0.95rem;
}

/* Visor de documento */
.documento-viewer {
  margin-top: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #f9fafb;
}

.viewer-toolbar {
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-btn:hover {
  background: #0284c7;
  color: white;
  border-color: #0284c7;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.2);
}

.document-iframe {
  width: 100%;
  height: 500px;
  border: none;
  background: white;
  display: block;
}

.modal-viewer {
  max-width: 95%;
  width: 1200px;
  height: 90vh; /* ← IMPORTANTE: altura fija */
  max-height: 90vh;
}

.modal-content-viewer {
  padding: 0;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.documento-viewer-full {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0;
}

.documento-viewer-full .viewer-toolbar {
  border-radius: 0;
}

.document-iframe-full {
  width: 100%;
  height: calc(90vh - 120px);
  border: none;
  background: white;
  display: block;
  flex: 1;
}

/* Modal viewer para teoría */
.modal-viewer {
  max-width: 95%;
  width: 1200px;
}

.modal-content-viewer {
  padding: 0;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.documento-viewer-full {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0;
}

.documento-viewer-full .viewer-toolbar {
  border-radius: 0;
}

.document-iframe-full {
  width: 100%;
  height: calc(90vh - 120px);
  border: none;
  background: white;
  display: block;
  flex: 1;
}

/* Formulario de respuestas */
.respuestas-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preguntas-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pregunta-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pregunta-item label {
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
}

/* Custom Select */
.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.select-trigger:hover {
  border-color: #cbd5e1;
}

.custom-select.open .select-trigger {
  border-color: #667eea;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select-value {
  color: #374151;
  font-weight: 500;
}

.select-arrow {
  color: #6b7280;
  transition: transform 0.2s ease;
}

.custom-select.open .select-arrow {
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  top: calc(100% - 2px);
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #667eea;
  border-top: 1px solid #e2e8f0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: none;
  overflow: hidden;
}

.custom-select.open .select-options {
  display: block;
  border-top: none;
}

.select-option {
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
  font-weight: 500;
  color: #374151;
}

.select-option:hover {
  background-color: #f1f5f9;
}

.select-option.selected {
  background-color: #667eea;
  color: white;
}

.submit-container {
  margin-top: 1rem;
}

.submit-respuestas {
  width: 100%;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-respuestas:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.submit-respuestas:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Resultado de tarea */
.resultado-completo {
  text-align: center;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
}

.resultado-completo h4 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #374151;
  font-weight: 600;
}

.calificacion {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

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
  max-width: 400px;
  margin: 0 auto;
}

.retroalimentacion p {
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
  background: #f9fafb;
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  margin: 0;
}

/* Solucionario */
.solucionario-descarga {
  margin-top: 1.5rem;
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
  padding: 0.7rem 1.2rem;
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

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .reto-content {
    padding: 0 1rem;
    margin: 1rem auto;
  }

  .materiales-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .modal-container {
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-content {
    padding: 1rem;
  }

  .tarea-container {
    gap: 1rem;
  }
  .document-iframe {
    height: 400px;
  }
   .document-iframe-full {
    height: calc(100vh - 150px);
  }

  .modal-viewer {
    width: 100%;
    max-width: 100%;
  }

  .viewer-toolbar {
    padding: 0.6rem 0.8rem;
  }

  .toolbar-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .resultado-completo {
    padding: 2rem 1rem;
  }

  .nota {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .toast-container {
    width: 90%;
    bottom: 1rem;
  }
}
</style>