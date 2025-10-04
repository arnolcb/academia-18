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
          <span>Volver a Aula VIP</span>
        </button>

        <div class="simulacro-titulo-wrapper">
          <h1 class="simulacro-titulo">{{ simulacro.titulo || 'Simulacro VIP' }}</h1>
          <div class="vip-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
            </svg>
            <span>VIP</span>
          </div>
        </div>
        
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
      <!-- Loading state -->
      <div v-if="loading" class="estado-container">
        <div class="loading-spinner"></div>
        <p>Cargando simulacro VIP...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="estado-container error-container">
        <p>{{ error }}</p>
        <button @click="cargarSimulacro" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Instrucciones iniciales -->
      <div v-else-if="!examenIniciado && !examenFinalizado" class="instrucciones-container">
        <div class="simulacro-card">
          <div class="vip-header">
            <div class="vip-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h2>{{ simulacro.titulo }} - VIP</h2>
            <p class="vip-subtitle">Simulacro exclusivo con preguntas del ENP</p>
          </div>
          
          <div class="info-simulacro">
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Duración:{{ simulacro.duracion ? Math.floor(simulacro.duracion / 3600) : 2 }} horas</span>
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
            <h3>Instrucciones VIP:</h3>
            <ul>
               <li>Este es un simulacro exclusivo para estudiantes VIP con duración de {{ simulacro.duracion ? Math.floor(simulacro.duracion / 60) : 125 }} minutos.</li>
              <li>Consta de {{ simulacro.totalPreguntas }} preguntas de opción múltiple premium.</li>
              <li>Cada respuesta correcta suma {{ simulacro.puntajePorPregunta }} puntos.</li>
              <li>Las respuestas incorrectas no restan puntos.</li>
              <li>Puedes alternar entre las preguntas usando los botones de navegación.</li>
              <li>Una vez finalizado el tiempo o enviado el examen, se mostrará tu calificación final.</li>
              <li>No podrás retomar el examen una vez finalizado.</li>
            </ul>
          </div>
          <button @click="iniciarExamen" class="btn-iniciar">
            Comenzar Simulacro
          </button>
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
            <h3 v-html="preguntas[preguntaActual].enunciado"></h3>
            
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
            <h3>Resumen VIP</h3>
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
              Terminar Simulacro VIP
            </button>
          </div>
        </div>
      </div>

      <!-- Resultados finales -->
      <div v-else-if="examenFinalizado" class="resultados-container">
        <div class="resultados-card">
          <div class="resultado-header">
            <h2>Resultados del Simulacro VIP</h2>
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
            <div class="vip-extra-message">
              <p>🌟 Como estudiante VIP, puedes solicitar una revisión detallada contactando a tu instructor.</p>
            </div>
          </div>
          
          <div class="resultado-acciones">
            <button @click="volverADashboard" class="btn-volver">
              Volver a Aula VIP
            </button>
            <!--
            <button @click="verRankingVip" class="btn-ranking">
              Ver Ranking VIP
            </button>
            -->
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de confirmación para finalizar examen -->
    <div v-if="mostrarModalConfirmacion" class="modal-overlay">
      <div class="modal-confirmacion">
        <h3>¿Estás seguro de finalizar el simulacro VIP?</h3>
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
  titulo: 'Simulacro VIP #1',
  descripcion: 'Simulacro exclusivo para estudiantes VIP',
  totalPreguntas: 30,
  duracion: 4200, // 70 minutos en segundos
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
const tiempoRestante = ref(4200); // 70 minutos en segundos
const tiempoInicio = ref(null);
const intervalId = ref(null);
const mostrarModalConfirmacion = ref(false);

// Cargar datos del simulacro
onMounted(async () => {
  // Verificar autenticación
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      router.push('/aula-virtual');
      return;
    }

    await cargarSimulacro();
  });
});

// Limpiar intervalo al desmontar componente
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

// Cargar simulacro y preguntas VIP
const cargarSimulacro = async () => {
  loading.value = true;
  error.value = null;

  try {
    const simulacroId = route.params.id;
    
    // Obtener datos del simulacro VIP
    const simulacroDoc = await getDoc(doc(db, 'simulacrosVip', simulacroId));
    if (!simulacroDoc.exists()) {
      throw new Error('El simulacro VIP no existe');
    }

    simulacro.value = {
      id: simulacroDoc.id,
      ...simulacroDoc.data()
    };

    // Obtener preguntas del simulacro VIP
    const preguntasRef = collection(db, `simulacrosVip/${simulacroId}/preguntas`);
    const q = query(preguntasRef, orderBy('orden', 'asc'));
    const preguntasSnapshot = await getDocs(q);

    if (preguntasSnapshot.empty) {
      throw new Error('No hay preguntas disponibles para este simulacro VIP');
    }

    // Procesar preguntas
    const preguntasTemp = preguntasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Asegurar que las alternativas estén en el formato correcto
      alternativas: doc.data().alternativas || []
    }));

    // Usar todas las preguntas en orden
    preguntas.value = preguntasTemp.slice(0, simulacro.value.totalPreguntas);

    // Inicializar array de respuestas con null (sin responder)
    respuestasUsuario.value = Array(preguntas.value.length).fill(null);

    // Configurar tiempo
    tiempoRestante.value = simulacro.value.duracion || 7500;

  } catch (err) {
    console.error('Error al cargar el simulacro VIP:', err);
    error.value = 'No se pudo cargar el simulacro VIP. Por favor, intenta de nuevo.';
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
  // Detener temporizador
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
    
    // Verificar si la respuesta es correcta
    if (respuestaUsuario !== null) {
      const esCorrecta = pregunta.alternativas[respuestaUsuario].esCorrecta;
      if (esCorrecta) {
        correctas++;
      }
    }
  }
  
  // Calcular calificación final
  const calificacion = correctas * simulacro.value.puntajePorPregunta;
  
  // Guardar resultado en resultadosVip
  try {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, 'resultadosVip'), {
        userId: user.uid,
        simulacroId: simulacro.value.id,
        respuestas: respuestasUsuario.value,
        correctas,
        calificacion,
        tiempoUtilizado: simulacro.value.duracion - tiempoRestante.value,
        fechaRealizacion: serverTimestamp()
      });
    }
  } catch (err) {
    console.error('Error al guardar resultados VIP:', err);
  }
};

// Volver al dashboard
const volverADashboard = () => {
  if (examenIniciado.value && !examenFinalizado.value) {
    if (confirm('¿Estás seguro de abandonar el simulacro VIP? Se perderán tus respuestas.')) {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
      router.push('/dashboard');
    }
  } else {
    router.push('/dashboard');
  }
};

// Ver ranking VIP
const verRankingVip = () => {
  router.push(`/simulacro-vip/${simulacro.value.id}/ranking`);
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
  
  if (porcentaje >= 90) return '¡Excelente desempeño VIP!';
  if (porcentaje >= 80) return '¡Muy bien, estudiante VIP!';
  if (porcentaje >= 70) return 'Buen trabajo VIP';
  if (porcentaje >= 60) return 'Aprobado VIP';
  return 'Necesitas mejorar - Solicita tutoría VIP';
});

const comentarioResultado = computed(() => {
  const puntajeMaximo = preguntas.value.length * simulacro.value.puntajePorPregunta;
  const porcentaje = (calificacionFinal.value / puntajeMaximo) * 100;
  
  if (porcentaje >= 90) {
    return 'Has demostrado un dominio excepcional como estudiante VIP. ¡Felicitaciones!';
  }
  if (porcentaje >= 80) {
    return 'Tienes un excelente conocimiento VIP de los temas evaluados. Sigue así.';
  }
  if (porcentaje >= 70) {
    return 'Has demostrado un conocimiento sólido VIP, pero hay áreas que podrías mejorar.';
  }
  if (porcentaje >= 60) {
    return 'Has logrado aprobar el nivel VIP, pero deberías reforzar varios temas para mejorar.';
  }
  return 'Como estudiante VIP, puedes solicitar sesiones personalizadas para mejorar tus resultados.';
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
</script>

<style scoped>
.simulacro-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #fff9e6 100%);
}

.simulacro-header {
  background: linear-gradient(135deg, #ffffff 0%, #fff9e6 100%);
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 2px solid #ffd700;
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
  background: linear-gradient(135deg, #ffd700, #ffb347);
  border: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
}

.back-btn:hover {
  background: linear-gradient(135deg, #ffb347, #ffd700);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}

.simulacro-titulo-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.simulacro-titulo {
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.vip-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
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
  text-align: center;
  padding: 3rem 1rem;
  min-height: 50vh;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 215, 0, 0.1);
  border-top: 3px solid #ffd700;
  border-radius: 50%;
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
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  border: 2px solid #ffd700;
}

.vip-header {
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  margin: -2rem -2rem 2rem -2rem;
  border-radius: 12px 12px 0 0;
}

.vip-icon {
  color: #ffd700;
  margin-bottom: 1rem;
}

.vip-header h2 {
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
  font-weight: 700;
}

.vip-subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
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
  color: #ffd700;
}

.instrucciones {
  background: linear-gradient(135deg, #f8f9fa, #fff9e6);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #ffd700;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-iniciar:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
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
  border: 2px solid #ffd700;
}

.pregunta-header {
  margin-bottom: 1.5rem;
}

.pregunta-numero {
  font-size: 1.1rem;
  color: #ffd700;
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
  background-color: #ffd700;
  color: #333;
  border-color: #ffd700;
}

.btn-pregunta.respondida {
  background-color: #d5deec;
  border-color: #b0c4de;
}

.btn-pregunta.respondida.activa {
  background-color: #ffd700;
  color: #333;
  border-color: #ffd700;
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
  border-color: #ffd700;
  background-color: rgba(255, 215, 0, 0.1);
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
  border-color: #ffd700;
}

.radio-circulo {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: transparent;
}

.alternativa-item.seleccionada .radio-circulo {
  background-color: #ffd700;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-finalizar:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}

/* Resumen lateral */
.resumen-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
  border: 2px solid #ffd700;
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
  background: linear-gradient(135deg, #ffd700, #ffb347);
  transition: width 0.3s;
}

.resumen-accion {
  margin-top: 2rem;
}

.btn-terminar {
  width: 100%;
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #d32f2f, #b71c1c);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-terminar:hover {
  background: linear-gradient(135deg, #b71c1c, #d32f2f);
}

/* Resultados finales */
.resultados-container {
  display: flex;
  justify-content: center;
}

.resultados-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  border: 2px solid #ffd700;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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
  background: linear-gradient(135deg, #f8f9fa, #fff9e6);
  border: 1px solid #ffd700;
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
  background: linear-gradient(135deg, #e9f5ff, #fff9e6);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #ffd700;
}

.resultado-mensaje h3 {
  margin-top: 0;
  color: #333;
  margin-bottom: 0.5rem;
}

.resultado-mensaje p {
  margin: 0;
  color: #333;
  line-height: 1.5;
}

.vip-extra-message {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #fff9e6, #ffffff);
  border-radius: 8px;
  border: 1px solid #ffd700;
}

.vip-extra-message p {
  margin: 0;
  color: #333;
  font-weight: 500;
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
  background: linear-gradient(135deg, #ffd700, #ffb347);
  border: none;
  color: #333;
}

.btn-volver:hover {
  background: linear-gradient(135deg, #ffb347, #ffd700);
  transform: translateY(-1px);
}

.btn-ranking {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
}

.btn-ranking:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-1px);
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
  border: 2px solid #ffd700;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
}

.btn-confirmar:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}

h3 .texto-negrita {
    font-weight: 900 !important;
    font-family: Arial, sans-serif !important;
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

  .simulacro-titulo-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
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

  .vip-header {
    padding: 1.5rem;
    margin: -2rem -1.5rem 1.5rem -1.5rem;
  }

  .vip-header h2 {
    font-size: 1.4rem;
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
}
</style>