<template>
  <div class="rd-modal">
    <div class="rd-modal-overlay" @click="$emit('close')"></div>
    <div class="rd-modal-container">
      <div class="rd-modal-header">
        <h3>{{ tarea.titulo }}</h3>
        <button @click="cerrarYNotificar" class="rd-modal-close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="rd-modal-content">
        <div class="rd-tarea-grid">
          <div class="rd-tarea-col-instrucciones">
            <h4>Instrucciones</h4>
            <p>{{ tarea.descripcion }}</p>
            
            <div class="rd-document-viewer">
              <div class="rd-viewer-toolbar">
                <button @click="abrirEnNuevaVentana(tarea.archivoUrl)" class="rd-toolbar-btn" title="Abrir en nueva pestaña">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Abrir en Drive
                </button>
              </div>
              <iframe 
                v-if="tarea.archivoUrl"
                :src="getPreviewUrl(tarea.archivoUrl)" 
                class="rd-document-iframe"
                frameborder="0"
                allowfullscreen>
              </iframe>
              <div v-else class="rd-document-placeholder">
                <p>No hay documento para previsualizar.</p>
              </div>
            </div>
          </div>

          <div class="rd-tarea-col-formulario">
            <div v-if="!resultadoTarea">
              <h4>Respuestas</h4>
              <p class="rd-form-instruccion">Ingresa las respuestas (A, B, C, D o E):</p>
              <form @submit.prevent="enviarRespuestas" class="rd-respuestas-form">
                <div class="rd-preguntas-container">
                  <div v-for="i in 5" :key="i" class="rd-pregunta-item">
                    <label>Pregunta {{ i }}</label>
                    <input 
                      type="text"
                      v-model="respuestas[i - 1]"
                      class="rd-respuesta-input"
                      maxlength="1"
                      @input="e => formatearInput(e, i - 1)"
                    />
                  </div>
                </div>
                <div class="rd-submit-container">
                  <button type="submit" class="rd-submit-respuestas" :disabled="enviandoRespuestas">
                    <span v-if="enviandoRespuestas">Enviando...</span>
                    <span v-else>Enviar respuestas</span>
                  </button>
                </div>
              </form>
            </div>

            <div v-else class="rd-resultado-container">
              <h4>Calificación</h4>
              <div class="rd-calificacion-box">
                <div class="rd-nota-grande" :class="resultadoTarea.clase">{{ resultadoTarea.nota }}/5</div>
                <div class="rd-retroalimentacion">
                  <p>{{ resultadoTarea.mensaje }}</p>
                </div>
                <div v-if="solucionarioInfo" class="rd-solucionario-descarga">
                  <h5>Descarga el solucionario:</h5>
                  <a :href="solucionarioInfo.url" target="_blank" class="rd-solucionario-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebase';
import { collection, query, getDocs, where, addDoc, updateDoc, doc } from 'firebase/firestore';

const props = defineProps({
  semanaId: String,
  tarea: Object,
});

const emit = defineEmits(['close', 'tareaCompletada']);

const coleccionRetos = 'retoDiario';

// --- Estado interno del modal ---
const respuestas = ref(Array(5).fill(''));
const enviandoRespuestas = ref(false);
const resultadoTarea = ref(null);
const solucionarioInfo = ref(null);
const errorFormulario = ref(null);
const tareaCompletadaConExito = ref(false); // <-- NUEVO: Para saber si debemos refrescar la lista al cerrar

// --- Funciones de Utilidad (sin cambios) ---
const getPreviewUrl = (url) => {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
};

const abrirEnNuevaVentana = (url) => {
  if (!url) return;
  window.open(url, '_blank');
};

const formatearInput = (event, index) => {
  let valor = event.target.value.toUpperCase().replace(/[^A-E]/g, '');
  respuestas.value[index] = valor;
};

// --- Lógica del Componente ---

const cargarRespuestaPrevia = async (semanaId, tareaId) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const respuestasRef = collection(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/respuestas`);
    const q = query(respuestasRef, where('userId', '==', user.uid));
    const respuestasSnapshot = await getDocs(q);

    if (!respuestasSnapshot.empty) {
      const respuestaData = respuestasSnapshot.docs[0].data();
      respuestas.value = respuestaData.respuestas.map(r => r.respuesta);
      const nota = respuestaData.calificacion;
      
      let claseNota = 'mala';
      if (nota >= 5) claseNota = 'excelente';
      else if (nota >= 4) claseNota = 'buena';
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
    errorFormulario.value = "No se pudo cargar tu respuesta anterior.";
  }
};

const enviarRespuestas = async () => {
  // Asegúrate de que tu formulario tiene @submit.prevent="enviarRespuestas"
  enviandoRespuestas.value = true;
  errorFormulario.value = null;

  if (respuestas.value.some(r => !r || r.trim() === '')) {
    errorFormulario.value = "Debes completar las 5 respuestas.";
    enviandoRespuestas.value = false;
    return;
  }

  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No se ha iniciado sesión');

    const semanaId = props.semanaId;
    const tareaId = props.tarea.id;

    // ... (El resto de la lógica de calcular nota, etc. no cambia)
    const respuestasFormateadas = respuestas.value.map((respuesta, index) => ({
      pregunta: index + 1,
      respuesta: respuesta.trim().toUpperCase()
    }));
    const solucionariosRef = collection(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/solucionarios`);
    const solucionariosSnapshot = await getDocs(solucionariosRef);
    if (solucionariosSnapshot.empty) throw new Error('No se encontró el solucionario');
    const solucionarioData = solucionariosSnapshot.docs[0].data();
    const solucionario = solucionarioData.respuestas.map(resp => JSON.parse(resp));
    let aciertos = 0;
    const total = solucionario.length;
    for (let i = 0; i < total; i++) {
      if (respuestasFormateadas[i].respuesta === solucionario[i].respuesta.toUpperCase()) {
        aciertos += solucionario[i].valor || 1;
      }
    }
    const nota = Math.round((aciertos / total) * 5);
    let retroalimentacion = '';
    if (nota >= 5) retroalimentacion = 'Excelente trabajo. Has dominado este tema.';
    else if (nota >= 4) retroalimentacion = 'Buen trabajo. Has comprendido la mayoría de los conceptos.';
    else if (nota >= 3) retroalimentacion = 'Regular. Hay algunos conceptos que deberías revisar.';
    else retroalimentacion = 'Necesitas repasar los conceptos básicos de este tema.';
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
      const respuestaDocId = respuestasSnapshot.docs[0].id;
      await updateDoc(doc(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/respuestas/${respuestaDocId}`), {
        respuestas: respuestasFormateadas,
        calificacion: nota,
        retroalimentacion,
        fechaEnvio: new Date()
      });
    }
    
    // --- CAMBIOS IMPORTANTES AQUÍ ---
    
    // 1. En lugar de emitir un evento para cerrar, recargamos los datos para
    //    mostrar el resultado DENTRO de este mismo modal.
    await cargarRespuestaPrevia(semanaId, tareaId);

    // 2. Marcamos que la tarea se completó con éxito.
    tareaCompletadaConExito.value = true;
    
    // YA NO CERRAMOS EL MODAL AUTOMÁTICAMENTE
    // emit('tareaCompletada'); // <-- ELIMINA ESTA LÍNEA

  } catch (err) {
    console.error('Error al enviar respuestas:', err);
    errorFormulario.value = 'No se pudieron enviar las respuestas. Intenta de nuevo.';
  } finally {
    enviandoRespuestas.value = false;
  }
};

const cargarSolucionario = async (semanaId, tareaId) => {
  // ... (Esta función no cambia)
  try {
    const solucionariosRef = collection(db, `${coleccionRetos}/${semanaId}/practica/${tareaId}/solucionarios`);
    const solucionariosSnapshot = await getDocs(solucionariosRef);
    if (!solucionariosSnapshot.empty) {
      const data = solucionariosSnapshot.docs[0].data();
      if (data.archivoUrl && data.nombreArchivo) {
        solucionarioInfo.value = { url: data.archivoUrl, nombre: data.nombreArchivo };
      }
    }
  } catch (error) { console.error('Error al cargar solucionario:', error); }
};

// <-- NUEVA FUNCIÓN PARA CERRAR EL MODAL
// Ahora, cuando se cierra, notificamos al padre SOLO si una tarea se completó.
const cerrarYNotificar = () => {
  if (tareaCompletadaConExito.value) {
    emit('tareaCompletada'); // Le decimos al padre que debe actualizar la lista
  }
  emit('close'); // Siempre emitimos el evento para cerrar el modal
};

onMounted(() => {
  cargarRespuestaPrevia(props.semanaId, props.tarea.id);
});
</script>