<template>
  <div class="ranking-container">
    <!-- Header VIP -->
    <header class="ranking-header">
      <div class="header-content">
        <button @click="volverASimulacro" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Volver al simulacro</span>
        </button>

        <div class="ranking-titulo-container">
          <h1 class="ranking-titulo">Ranking VIP - {{ simulacroTitulo }}</h1>
          <div class="vip-badge-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
            </svg>
            <span>EXCLUSIVO VIP</span>
          </div>
        </div>

        <button @click="volverADashboard" class="dashboard-btn">
          <span>Ir a Aula VIP</span>
        </button>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="ranking-content">
      <!-- Loading state -->
      <div v-if="loading" class="estado-container">
        <div class="loading-spinner"></div>
        <p>Cargando ranking VIP...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="estado-container error-container">
        <p>{{ error }}</p>
        <button @click="cargarRanking" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Ranking content -->
      <div v-else class="ranking-main-content">
        <!-- Estadísticas generales VIP -->
        <div class="estadisticas-generales">
          <div class="estadistica-card">
            <div class="estadistica-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="estadistica-info">
              <div class="estadistica-valor">{{ totalParticipantes }}</div>
              <div class="estadistica-label">Estudiantes VIP</div>
            </div>
          </div>

          <div class="estadistica-card">
            <div class="estadistica-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div class="estadistica-info">
              <div class="estadistica-valor">{{ promedioGeneral }}%</div>
              <div class="estadistica-label">Promedio VIP</div>
            </div>
          </div>

          <div class="estadistica-card">
            <div class="estadistica-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div class="estadistica-info">
              <div class="estadistica-valor">{{ mejorPuntaje }}</div>
              <div class="estadistica-label">Mejor Puntaje VIP</div>
            </div>
          </div>
        </div>

        <!-- Tu posición VIP -->
        <div v-if="tuPosicion" class="tu-posicion-container">
          <div class="tu-posicion-card">
            <div class="posicion-header">
              <div class="posicion-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3>Tu Posición VIP</h3>
            </div>
            <div class="posicion-info">
              <div class="posicion-numero">{{ tuPosicion.posicion }}°</div>
              <div class="posicion-detalles">
                <div class="posicion-puntaje">{{ tuPosicion.calificacion }}/120 puntos</div>
                <div class="posicion-porcentaje">{{ calcularPorcentaje(tuPosicion.calificacion) }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de ranking VIP simplificada -->
        <div class="ranking-table-container">
          <div class="table-header">
            <h2>🏆 Top Estudiantes VIP</h2>
          </div>

          <div class="ranking-list">
            <div 
              v-for="(resultado, index) in resultados" 
              :key="resultado.id"
              :class="{ 
                'ranking-item': true,
                'tu-resultado': resultado.esTuyo,
                'top-3': index < 3,
                'primer-lugar': index === 0,
                'segundo-lugar': index === 1,
                'tercer-lugar': index === 2
              }"
            >
              <div class="ranking-posicion">
                <div class="posicion-medal" v-if="index < 3">
                  <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M12 2L9 9l-7 1 5.5 4.5L6 22l6-3 6 3-1.5-7.5L22 10l-7-1-3-7z"/>
                  </svg>
                  <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#c0c0c0">
                    <path d="M12 2L9 9l-7 1 5.5 4.5L6 22l6-3 6 3-1.5-7.5L22 10l-7-1-3-7z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#cd7f32">
                    <path d="M12 2L9 9l-7 1 5.5 4.5L6 22l6-3 6 3-1.5-7.5L22 10l-7-1-3-7z"/>
                  </svg>
                </div>
                <span class="posicion-numero">{{ index + 1 }}°</span>
              </div>
              
              <div class="ranking-estudiante">
                <div class="estudiante-avatar">
                  {{ resultado.inicial }}
                </div>
                <div class="estudiante-info">
                  <div class="estudiante-nombre">
                    {{ resultado.nombre }}
                    <span v-if="resultado.esTuyo" class="tu-badge">Tú</span>
                  </div>
                  <div class="estudiante-email">{{ resultado.email }}</div>
                </div>
              </div>
              
              <div class="ranking-puntaje">
                <div class="puntaje-principal">{{ resultado.calificacion }}/120</div>
                <div class="puntaje-porcentaje">{{ calcularPorcentaje(resultado.calificacion) }}%</div>
              </div>
              
              <div class="ranking-tiempo">{{ formatearTiempo(resultado.tiempoUtilizado) }}</div>
            </div>
          </div>
        </div>

        <!-- Mensaje si no hay resultados -->
        <div v-if="resultados.length === 0" class="no-resultados">
          <div class="no-resultados-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
          <h3>No hay resultados VIP aún</h3>
          <p>Sé el primero en completar este simulacro VIP y aparecer en el ranking.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth, db } from '@/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  doc, 
  getDoc 
} from 'firebase/firestore';

const router = useRouter();
const route = useRoute();

// Estados
const loading = ref(true);
const error = ref(null);
const resultados = ref([]);
const simulacroTitulo = ref('Simulacro VIP');

// Cargar datos al montar
onMounted(async () => {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      router.push('/aula-virtual');
      return;
    }
    await cargarRanking();
  });
});

const cargarRanking = async () => {
  loading.value = true;
  error.value = null;

  try {
    const simulacroId = route.params.id;
    
    // Obtener información del simulacro VIP
    const simulacroDoc = await getDoc(doc(db, 'simulacrosVip', simulacroId));
    if (simulacroDoc.exists()) {
      simulacroTitulo.value = simulacroDoc.data().titulo || 'Simulacro VIP';
    }

    // Obtener todos los resultados del simulacro
    const resultadosRef = collection(db, 'resultadosVip');
    const q = query(
      resultadosRef,
      where('simulacroId', '==', simulacroId)
    );

    const querySnapshot = await getDocs(q);
    
    // Agrupar por usuario manteniendo solo el primer intento
    const resultadosPorUsuario = new Map();
    
    querySnapshot.docs.forEach(docSnapshot => {
      const data = docSnapshot.data();
      const userId = data.userId;
      
      // Si no existe el usuario O si este resultado es más antiguo
      if (!resultadosPorUsuario.has(userId)) {
        resultadosPorUsuario.set(userId, {
          id: docSnapshot.id,
          ...data
        });
      } else {
        // Comparar fechas para mantener el más antiguo
        const existente = resultadosPorUsuario.get(userId);
        const fechaExistente = new Date(existente.fechaRealizacion.seconds * 1000);
        const fechaNueva = new Date(data.fechaRealizacion.seconds * 1000);
        
        if (fechaNueva < fechaExistente) {
          resultadosPorUsuario.set(userId, {
            id: docSnapshot.id,
            ...data
          });
        }
      }
    });

    // Convertir a array y procesar datos de usuario
    const resultadosTemp = [];
    
    resultadosPorUsuario.forEach((data, userId) => {
      const userEmail = auth.currentUser?.uid === userId ? 
        auth.currentUser.email : 
        `estudiante${userId.slice(-4)}@vip.com`;
      
      const nombre = userEmail.split('@')[0];
      const inicial = nombre.charAt(0).toUpperCase();
      
      resultadosTemp.push({
        id: data.id,
        ...data,
        nombre,
        email: userEmail,
        inicial,
        esTuyo: auth.currentUser?.uid === userId
      });
    });

    // Ordenar por calificación (descendente) y tiempo (ascendente)
    resultados.value = resultadosTemp.sort((a, b) => {
      if (b.calificacion !== a.calificacion) {
        return b.calificacion - a.calificacion;
      }
      return a.tiempoUtilizado - b.tiempoUtilizado;
    });

  } catch (err) {
    console.error('Error al cargar ranking VIP:', err);
    error.value = 'No se pudo cargar el ranking VIP. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};
// Propiedades computadas
const totalParticipantes = computed(() => resultados.value.length);

const promedioGeneral = computed(() => {
  if (resultados.value.length === 0) return 0;
  const suma = resultados.value.reduce((acc, resultado) => acc + resultado.calificacion, 0);
  const promedio = suma / resultados.value.length;
  return Math.round((promedio / 120) * 100);
});

const mejorPuntaje = computed(() => {
  if (resultados.value.length === 0) return 0;
  return Math.max(...resultados.value.map(r => r.calificacion));
});

const tuPosicion = computed(() => {
  const tuResultado = resultados.value.find(r => r.esTuyo);
  if (!tuResultado) return null;
  
  const posicion = resultados.value.findIndex(r => r.esTuyo) + 1;
  return {
    ...tuResultado,
    posicion
  };
});

// Funciones de utilidad
const calcularPorcentaje = (calificacion) => {
  return Math.round((calificacion / 120) * 100);
};

const formatearTiempo = (tiempoEnSegundos) => {
  const minutos = Math.floor(tiempoEnSegundos / 60);
  const segundos = tiempoEnSegundos % 60;
  return `${minutos}:${segundos.toString().padStart(2, '0')}`;
};

// Navegación
const volverASimulacro = () => {
  router.push(`/simulacro-vip/${route.params.id}`);
};

const volverADashboard = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
.ranking-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #fff9e6 100%);
}

.ranking-header {
  background: linear-gradient(135deg, #ffffff 0%, #fff9e6 100%);
  border-bottom: 2px solid #ffd700;
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.1);
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

.ranking-titulo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ranking-titulo {
  color: #333;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
}

.vip-badge-header {
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

.dashboard-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
}

.dashboard-btn:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.ranking-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.estado-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.loading-spinner {
  border: 4px solid rgba(255, 215, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #ffd700;
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

.estadisticas-generales {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.estadistica-card {
  background: linear-gradient(135deg, #ffffff, #fff9e6);
  border: 2px solid #ffd700;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.1);
}

.estadistica-icon {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  padding: 0.8rem;
  border-radius: 50%;
}

.estadistica-valor {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.2rem;
}

.estadistica-label {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.tu-posicion-container {
  margin-bottom: 2rem;
}

.tu-posicion-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.posicion-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.posicion-icon {
  color: #ffd700;
}

.posicion-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.posicion-numero {
  font-size: 2.5rem;
  font-weight: 700;
}

.posicion-puntaje {
  font-size: 1.2rem;
  font-weight: 600;
}

.posicion-porcentaje {
  opacity: 0.9;
}

.ranking-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 2px solid #ffd700;
}

.table-header {
  background: linear-gradient(135deg, #fff9e6, #ffffff);
  padding: 1.5rem;
  border-bottom: 1px solid #ffd700;
}

.table-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.ranking-list {
  padding: 0.5rem;
}

.ranking-item {
  display: grid;
  grid-template-columns: 100px 1fr 150px 100px;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  align-items: center;
  border: 1px solid transparent;
}

.ranking-item:hover {
  background-color: #f8f9fa;
}

.ranking-item.tu-resultado {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(255, 249, 230, 0.5));
  border: 1px solid #ffd700;
}

.ranking-item.top-3 {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 255, 255, 0.9));
}

.ranking-posicion {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.posicion-medal {
  width: 24px;
  height: 24px;
}

.posicion-numero {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.ranking-estudiante {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.estudiante-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.estudiante-nombre {
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tu-badge {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
}

.estudiante-email {
  color: #666;
  font-size: 0.85rem;
}

.ranking-puntaje {
  text-align: center;
}

.puntaje-principal {
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
}

.puntaje-porcentaje {
  color: #666;
  font-size: 0.9rem;
}

.ranking-tiempo {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.no-resultados {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.no-resultados-icon {
  color: #ffd700;
  margin-bottom: 1rem;
}

.no-resultados h3 {
  margin: 0 0 0.5rem;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .ranking-titulo-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .ranking-item {
    grid-template-columns: 70px 1fr 100px;
    gap: 0.5rem;
    padding: 0.8rem;
  }

  .ranking-tiempo {
    display: none;
  }

  .estadisticas-generales {
    grid-template-columns: 1fr;
  }

  .posicion-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>