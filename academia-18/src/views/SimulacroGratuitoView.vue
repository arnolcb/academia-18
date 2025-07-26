<!--Simulacro Gratuito View-->
<template>
  <div class="simulacro-container">
    <!-- Header con navegación -->
    <header class="simulacro-header">
      <div class="header-content">
        <button @click="volverADashboard" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Volver a cursos</span>
        </button>

        <h1 class="simulacro-titulo">{{ simulacro.titulo || 'Simulacro de Examen' }}</h1>
        
        <!-- Temporizador -->
        <div class="temporizador" :class="{ 'tiempo-bajo': tiempoRestante < 600 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{{ formatearTiempo(tiempoRestante) }}</span>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="simulacro-content">
      <!-- Estados de carga y error -->
      <div v-if="loading" class="estado-container">
        <div class="loading-spinner"></div>
        <p>Cargando simulacro...</p>
      </div>

      <div v-else-if="error" class="estado-container error-container">
        <p>{{ error }}</p>
        <button @click="cargarSimulacro" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Instrucciones iniciales -->
      <div v-else-if="!examenIniciado && !examenFinalizado" class="instrucciones-container">
        <div class="simulacro-card">
          <h2>{{ simulacro.titulo }}</h2>
          <div class="info-simulacro">
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Duración: {{ Math.floor(simulacro.duracion / 60) }} minutos</span>
            </div>
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Preguntas: {{ simulacro.totalPreguntas }}</span>
            </div>
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Puntuación: {{ simulacro.puntajePorPregunta }} por respuesta correcta</span>
            </div>
          </div>
          <div class="instrucciones">
            <h3>Instrucciones:</h3>
            <ul>
              <li>El simulacro tiene una duración de {{ Math.floor(simulacro.duracion / 60) }} minutos.</li>
              <li>Consta de {{ simulacro.totalPreguntas }} preguntas de opción múltiple.</li>
              <li>Cada respuesta correcta suma {{ simulacro.puntajePorPregunta }} puntos.</li>
              <li>Las respuestas incorrectas no restan puntos.</li>
              <li>Puedes altenar entre las preguntas usando los botones de navegación.</li>
              <li>Una vez finalizado el tiempo o enviado el examen, se mostrará tu calificación final.</li>
              <li>No podrás retomar el examen una vez finalizado.</li>
            </ul>
          </div>
          <button @click="iniciarExamen" class="btn-iniciar">Comenzar Simulacro</button>
        </div>
      </div>

      <!-- Contenido del examen -->
      <div v-else-if="examenIniciado && !examenFinalizado" class="examen-container">
        <div class="pregunta-container">
          <div class="pregunta-header">
            <div class="pregunta-numero">Pregunta {{ preguntaActual + 1 }} de {{ preguntas.length }}</div>
            <div class="navegacion-preguntas">
              <button 
                v-for="(_, index) in preguntas" 
                :key="index" 
                @click="irAPregunta(index)" 
                :class="{ 
                  'btn-pregunta': true, 
                  'activa': index === preguntaActual,
                  'respondida': respuestasUsuario[index] !== null 
                }"
              >
                {{ index + 1 }}
              </button>
            </div>
          </div>

          <div class="pregunta-contenido">
            <h3>{{ preguntas[preguntaActual].enunciado }}</h3>
            
            <!-- Imagen de la pregunta (si existe) -->
            <div v-if="preguntas[preguntaActual].imagen" class="pregunta-imagen">
              <img :src="preguntas[preguntaActual].imagen" :alt="`Imagen para pregunta ${preguntaActual + 1}`">
            </div>
            
            <!-- Alternativas -->
            <div class="alternativas-container">
              <div 
                v-for="(alternativa, index) in preguntas[preguntaActual].alternativas" 
                :key="index"
                @click="seleccionarRespuesta(index)"
                :class="{ 
                  'alternativa-item': true,
                  'seleccionada': respuestasUsuario[preguntaActual] === index 
                }"
              >
                <div class="alternativa-radio">
                  <div class="radio-circulo"></div>
                </div>
                <div class="alternativa-texto">
                  <span class="alternativa-letra">{{ letraAlternativa(index) }}</span>
                  <span>{{ alternativa.texto }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="navegacion-botones">
            <button 
              @click="anteriorPregunta" 
              class="btn-nav" 
              :disabled="preguntaActual === 0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Anterior</span>
            </button>
            
            <button 
              v-if="preguntaActual < preguntas.length - 1" 
              @click="siguientePregunta" 
              class="btn-nav"
            >
              <span>Siguiente</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            
            <button 
              v-else 
              @click="finalizarExamen" 
              class="btn-finalizar"
            >
              Finalizar Examen
            </button>
          </div>
        </div>

        <!-- Barra lateral con resumen -->
        <div class="resumen-container">
          <div class="resumen-header">
            <h3>Resumen</h3>
          </div>
          <div class="resumen-progreso">
            <div class="progreso-item">
              <div class="progreso-label">Respondidas:</div>
              <div class="progreso-valor">{{ preguntasRespondidas }} / {{ preguntas.length }}</div>
            </div>
            <div class="progreso-barra">
              <div 
                class="progreso-completado" 
                :style="{ width: `${(preguntasRespondidas / preguntas.length) * 100}%` }"
              ></div>
            </div>
          </div>
          <div class="resumen-accion">
            <button @click="confirmarFinalizacion" class="btn-terminar">
              Terminar Simulacro
            </button>
          </div>
        </div>
      </div>

      <!-- Resultados finales -->
      <div v-else-if="examenFinalizado" class="resultados-container">
        <div class="resultados-card">
          <div class="resultado-header">
            <h2>Resultados del Simulacro</h2>
            <div class="calificacion-circle">
              <div class="calificacion-valor">{{ calificacionFinal }}</div>
              <div class="calificacion-total">/120</div>
            </div>
          </div>
          
          <div class="resultado-estadisticas">
            <div class="estadistica-item">
              <div class="estadistica-valor">{{ respuestasCorrectas }}</div>
              <div class="estadistica-label">Correctas</div>
            </div>
            <div class="estadistica-item">
              <div class="estadistica-valor">{{ respuestasIncorrectas }}</div>
              <div class="estadistica-label">Incorrectas</div>
            </div>
            <div class="estadistica-item">
              <div class="estadistica-valor">{{ preguntasSinResponder }}</div>
              <div class="estadistica-label">Sin responder</div>
            </div>
          </div>
          
          <div class="resultado-mensaje">
            <h3>{{ mensajeResultado }}</h3>
            <p>{{ comentarioResultado }}</p>
          </div>
          
          <div class="resultado-acciones">
            <button @click="volverADashboard" class="btn-volver">
              Volver a Cursos
            </button>
            <!--
            <button @click="verRanking" class="btn-ranking">
              Ver Ranking de Estudiantes
            </button>
            --->
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de confirmación para finalizar examen -->
    <div v-if="mostrarModalConfirmacion" class="modal-overlay">
      <div class="modal-confirmacion">
        <h3>¿Estás seguro de finalizar el simulacro?</h3>
        <p v-if="preguntasSinResponder > 0">
          Aún tienes {{ preguntasSinResponder }} preguntas sin responder.
        </p>
        <p>Una vez finalizado, no podrás modificar tus respuestas.</p>
        <div class="modal-acciones">
          <button @click="mostrarModalConfirmacion = false" class="btn-cancelar">
            Cancelar
          </button>
          <button @click="finalizarExamen" class="btn-confirmar">
            Finalizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth, db } from '@/firebase';
import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  orderBy,
  where 
} from 'firebase/firestore';

// Router y route
const router = useRouter();
const route = useRoute();

// Estados principales
const simulacro = ref({
  titulo: 'Simulacro de Examen',
  descripcion: 'Pon a prueba tus conocimientos con este simulacro',
  totalPreguntas: 30,
  duracion: 3600, // 60 minutos en segundos
  puntajePorPregunta: 4
});
const preguntas = ref([]);
const loading = ref(true);
const error = ref(null);

// Estados del examen
const examenIniciado = ref(false);
const examenFinalizado = ref(false);
const preguntaActual = ref(0);
const respuestasUsuario = ref([]);
const tiempoRestante = ref(3600); // 60 minutos en segundos
const tiempoInicio = ref(null);
const intervalId = ref(null);
const mostrarModalConfirmacion = ref(false);

// Cargar datos del simulacro
onMounted(async () => {
  await cargarSimulacro();
});

// Limpiar intervalo al desmontar componente
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

// Cargar simulacro y preguntas
const cargarSimulacro = async () => {
  loading.value = true;
  error.value = null;

  try {
    const simulacroId = route.params.id;
    
    // Cambiar de 'simulacros' a 'simulacrosGratuitos'
    const simulacroDoc = await getDoc(doc(db, 'simulacrosGratuitos', simulacroId));
    if (!simulacroDoc.exists()) {
      throw new Error('El simulacro no existe');
    }

    simulacro.value = {
      id: simulacroDoc.id,
      ...simulacroDoc.data()
    };

    // Cambiar la ruta de preguntas también
    const preguntasRef = collection(db, `simulacrosGratuitos/${simulacroId}/preguntas`);
    const q = query(preguntasRef, orderBy('orden', 'asc'));
    const preguntasSnapshot = await getDocs(q);

    if (preguntasSnapshot.empty) {
      throw new Error('No hay preguntas disponibles para este simulacro');
    }

    const preguntasTemp = preguntasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      alternativas: doc.data().alternativas || []
    }));

    preguntas.value = preguntasTemp.slice(0, simulacro.value.totalPreguntas);
    respuestasUsuario.value = Array(preguntas.value.length).fill(null);
    tiempoRestante.value = simulacro.value.duracion || 3600;

  } catch (err) {
    console.error('Error al cargar el simulacro:', err);
    error.value = 'No se pudo cargar el simulacro. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

// Iniciar el examen
const iniciarExamen = () => {
  examenIniciado.value = true;
  tiempoInicio.value = Date.now();
  
  // Iniciar temporizador
  intervalId.value = setInterval(() => {
    if (tiempoRestante.value > 0) {
      tiempoRestante.value--;
    } else {
      finalizarExamen();
    }
  }, 1000);
};

// Navegar entre preguntas
const anteriorPregunta = () => {
  if (preguntaActual.value > 0) {
    preguntaActual.value--;
  }
};

const siguientePregunta = () => {
  if (preguntaActual.value < preguntas.value.length - 1) {
    preguntaActual.value++;
  }
};

const irAPregunta = (index) => {
  preguntaActual.value = index;
};

// Seleccionar respuesta
const seleccionarRespuesta = (index) => {
  respuestasUsuario.value[preguntaActual.value] = index;
};

// Confirmar finalización
const confirmarFinalizacion = () => {
  mostrarModalConfirmacion.value = true;
};

// Finalizar examen
const finalizarExamen = async () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  
  mostrarModalConfirmacion.value = false;
  examenFinalizado.value = true;
  
  // Calcular resultados
  let correctas = 0;
  
  for (let i = 0; i < preguntas.value.length; i++) {
    const pregunta = preguntas.value[i];
    const respuestaUsuario = respuestasUsuario.value[i];
    
    if (respuestaUsuario !== null) {
      const esCorrecta = pregunta.alternativas[respuestaUsuario].esCorrecta;
      if (esCorrecta) {
        correctas++;
      }
    }
  }
  
  const calificacion = correctas * simulacro.value.puntajePorPregunta;
  
  // Guardar resultado en localStorage
  const resultado = {
    simulacroId: simulacro.value.id,
    respuestas: respuestasUsuario.value,
    correctas,
    calificacion,
    tiempoUtilizado: simulacro.value.duracion - tiempoRestante.value,
    fechaRealizacion: new Date().toISOString(),
    userId: generateUserId() // Generar ID único para este usuario
  };
  
  // Guardar en localStorage
  guardarResultadoLocal(resultado);
};

// Volver al dashboard
const volverADashboard = () => {
  if (examenIniciado.value && !examenFinalizado.value) {
    if (confirm('¿Estás seguro de abandonar el simulacro? Se perderán tus respuestas.')) {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
      router.push('/clases-gratuitas');
    }
  } else {
    router.push('/clases-gratuitas');
  }
};

// Ver ranking de estudiantes
const verRanking = () => {
  router.push(`/simulacro/${simulacro.value.id}/ranking`);
};

// Funciones de utilidad
const formatearTiempo = (segundos) => {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
};

const letraAlternativa = (index) => {
  return String.fromCharCode(65 + index); // A, B, C, D, E...
};

const barajarArray = (array) => {
  const resultado = [...array];
  for (let i = resultado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
  }
  return resultado;
};

// Propiedades computadas
const preguntasRespondidas = computed(() => {
  return respuestasUsuario.value.filter(r => r !== null).length;
});

const preguntasSinResponder = computed(() => {
  return preguntas.value.length - preguntasRespondidas.value;
});

const respuestasCorrectas = computed(() => {
  let correctas = 0;
  for (let i = 0; i < preguntas.value.length; i++) {
    const respuesta = respuestasUsuario.value[i];
    if (respuesta !== null && preguntas.value[i].alternativas[respuesta].esCorrecta) {
      correctas++;
    }
  }
  return correctas;
});

const respuestasIncorrectas = computed(() => {
  let incorrectas = 0;
  for (let i = 0; i < preguntas.value.length; i++) {
    const respuesta = respuestasUsuario.value[i];
    if (respuesta !== null && !preguntas.value[i].alternativas[respuesta].esCorrecta) {
      incorrectas++;
    }
  }
  return incorrectas;
});

const calificacionFinal = computed(() => {
  return respuestasCorrectas.value * simulacro.value.puntajePorPregunta;
});

const mensajeResultado = computed(() => {
  const puntajeMaximo = preguntas.value.length * simulacro.value.puntajePorPregunta;
  const porcentaje = (calificacionFinal.value / puntajeMaximo) * 100;
  
  if (porcentaje >= 90) return '¡Excelente!';
  if (porcentaje >= 80) return '¡Muy bien!';
  if (porcentaje >= 70) return 'Buen trabajo';
  if (porcentaje >= 60) return 'Aprobado';
  return 'Necesitas mejorar';
});

const comentarioResultado = computed(() => {
  const puntajeMaximo = preguntas.value.length * simulacro.value.puntajePorPregunta;
  const porcentaje = (calificacionFinal.value / puntajeMaximo) * 100;
  
  if (porcentaje >= 90) {
    return 'Has demostrado un dominio excepcional de los temas evaluados. ¡Felicitaciones!';
  }
  if (porcentaje >= 80) {
    return 'Tienes un buen conocimiento de los temas evaluados. Sigue así.';
  }
  if (porcentaje >= 70) {
    return 'Has demostrado un conocimiento sólido, pero hay áreas que podrías mejorar.';
  }
  if (porcentaje >= 60) {
    return 'Has logrado aprobar, pero deberías reforzar varios temas para mejorar tu comprensión.';
  }
  return 'Es importante que repases los conceptos básicos y practiques más para mejorar tus resultados.';
});

// Watch para evitar que el usuario navegue si el examen está en progreso
watch(examenIniciado, (newVal) => {
  if (newVal && !examenFinalizado.value) {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  } else {
    window.removeEventListener('beforeunload', () => {});
  }
});

// Generar ID único para usuario anónimo
const generateUserId = () => {
  let userId = localStorage.getItem('simulacro_user_id');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('simulacro_user_id', userId);
  }
  return userId;
};

// Guardar resultado en localStorage
const guardarResultadoLocal = (resultado) => {
  try {
    // Obtener resultados existentes
    const resultadosExistentes = JSON.parse(localStorage.getItem('simulacros_resultados') || '[]');
    
    // Agregar nuevo resultado
    resultadosExistentes.push(resultado);
    
    // Mantener solo los últimos 50 resultados para no sobrecargar localStorage
    if (resultadosExistentes.length > 50) {
      resultadosExistentes.splice(0, resultadosExistentes.length - 50);
    }
    
    // Guardar de vuelta
    localStorage.setItem('simulacros_resultados', JSON.stringify(resultadosExistentes));
    
    console.log('Resultado guardado localmente:', resultado);
  } catch (error) {
    console.error('Error al guardar resultado en localStorage:', error);
  }
};

// Obtener ranking desde localStorage
const obtenerRankingLocal = () => {
  try {
    const resultados = JSON.parse(localStorage.getItem('simulacros_resultados') || '[]');
    return resultados
      .filter(r => r.simulacroId === simulacro.value.id)
      .sort((a, b) => b.calificacion - a.calificacion);
  } catch (error) {
    console.error('Error al obtener ranking local:', error);
    return [];
  }
};
</script>

<style scoped>
.simulacro-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  overflow-x: hidden;
}

.simulacro-header {
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
  justify-content: space-between;
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

.simulacro-titulo {
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.temporizador {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #e9ecef;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: #333;
}

.temporizador.tiempo-bajo {
  background-color: #ffcccc;
  color: #d32f2f;
  animation: parpadeo 1s infinite;
}

@keyframes parpadeo {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

.simulacro-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* Estados de carga y error */
.estado-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #0052af;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  color: #d32f2f;
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

/* Instrucciones del simulacro */
.instrucciones-container {
  display: flex;
  justify-content: center;
}

.simulacro-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
}

.simulacro-card h2 {
  color: #0052af;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
}

.info-simulacro {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #333;
}

.info-item svg {
  color: #0052af;
}

.instrucciones {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.instrucciones h3 {
  margin-top: 0;
  color: #333;
  margin-bottom: 1rem;
}

.instrucciones ul {
  margin: 0;
  padding-left: 1.5rem;
}

.instrucciones li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.btn-iniciar {
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-iniciar:hover {
  background-color: #003c8f;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Contenido del examen */
.examen-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.pregunta-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.pregunta-header {
  margin-bottom: 1.5rem;
}

.pregunta-numero {
  font-size: 1.1rem;
  color: #0052af;
  font-weight: 600;
  margin-bottom: 1rem;
}

.navegacion-preguntas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.btn-pregunta {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pregunta.activa {
  background-color: #0052af;
  color: white;
  border-color: #0052af;
}

.btn-pregunta.respondida {
  background-color: #d5deec;
  border-color: #b0c4de;
}

.btn-pregunta.respondida.activa {
  background-color: #0052af;
  color: white;
  border-color: #0052af;
}

.pregunta-contenido {
  margin-bottom: 2rem;
}

.pregunta-contenido h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: #333;
  line-height: 1.5;
}

.pregunta-imagen {
  margin-bottom: 1.5rem;
  text-align: center;
}

.pregunta-imagen img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.alternativas-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alternativa-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.alternativa-item:hover {
  background-color: #f8f9fa;
}

.alternativa-item.seleccionada {
  border-color: #0052af;
  background-color: rgba(0, 82, 175, 0.05);
}

.alternativa-radio {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alternativa-item.seleccionada .alternativa-radio {
  border-color: #0052af;
}

.radio-circulo {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: transparent;
}

.alternativa-item.seleccionada .radio-circulo {
  background-color: #0052af;
}

.alternativa-texto {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alternativa-letra {
  font-weight: 600;
  color: #555;
  min-width: 20px;
}

.navegacion-botones {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-nav:hover {
  background-color: #e9ecef;
}

.btn-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-finalizar {
  padding: 0.8rem 1.5rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-finalizar:hover {
  background-color: #003c8f;
}

/* Resumen lateral */
.resumen-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.resumen-header {
  margin-bottom: 1.5rem;
}

.resumen-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.resumen-progreso {
  margin-bottom: 2rem;
}

.progreso-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progreso-label {
  font-weight: 500;
  color: #555;
}

.progreso-valor {
  font-weight: 600;
  color: #333;
}

.progreso-barra {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progreso-completado {
  height: 100%;
  background-color: #0052af;
  transition: width 0.3s;
}

.resumen-accion {
  margin-top: 2rem;
}

.btn-terminar {
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-terminar:hover {
  background-color: #b71c1c;
}

/* Resultados finales */
.resultados-container {
  display: flex;
  justify-content: center;
}

.resultados-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
}

.resultado-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.resultado-header h2 {
  color: #333;
  margin: 0;
  font-size: 1.8rem;
}

.calificacion-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #0052af;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.calificacion-valor {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.calificacion-total {
  font-size: 1.1rem;
  opacity: 0.8;
}

.resultado-estadisticas {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  text-align: center;
}

.estadistica-item {
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.estadistica-valor {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.estadistica-label {
  color: #555;
  font-weight: 500;
}

.resultado-mensaje {
  background-color: #e9f5ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.resultado-mensaje h3 {
  margin-top: 0;
  color: #0052af;
  margin-bottom: 0.5rem;
}

.resultado-mensaje p {
  margin: 0;
  color: #333;
  line-height: 1.5;
}

.resultado-acciones {
  display: flex;
  gap: 1rem;
}

.btn-volver, .btn-ranking {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.btn-volver {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
}

.btn-volver:hover {
  background-color: #e9ecef;
}

.btn-ranking {
  background-color: #0052af;
  border: none;
  color: white;
}

.btn-ranking:hover {
  background-color: #003c8f;
}

/* Modal de confirmación */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-confirmacion {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-confirmacion h3 {
  margin-top: 0;
  color: #333;
  margin-bottom: 1rem;
}

.modal-confirmacion p {
  color: #555;
  margin-bottom: 1.5rem;
}

.modal-acciones {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-cancelar, .btn-confirmar {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancelar {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
}

.btn-cancelar:hover {
  background-color: #e9ecef;
}

.btn-confirmar {
  background-color: #d32f2f;
  border: none;
  color: white;
}

.btn-confirmar:hover {
  background-color: #b71c1c;
}

/* Responsive design */
@media (max-width: 768px) {
  .simulacro-content {
    padding: 0 1rem;
    margin: 1rem auto;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
  }

  .simulacro-titulo {
    margin-bottom: 0.5rem;
  }

  .temporizador {
    align-self: flex-end;
  }

  .examen-container {
    grid-template-columns: 1fr;
  }

  .resumen-container {
    position: static;
    margin-bottom: 1rem;
  }

  .alternativa-item {
    padding: 0.8rem;
  }

  .navegacion-botones {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .btn-nav, .btn-finalizar {
    flex: 1;
    justify-content: center;
  }

  .resultado-header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .resultado-estadisticas {
    flex-direction: column;
    gap: 1rem;
  }

  .resultado-acciones {
    flex-direction: column;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>