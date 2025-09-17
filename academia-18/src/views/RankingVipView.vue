<template>
  <div class="ranking-container">
    <!-- Header minimalista -->
    <header class="ranking-header">
      <div class="header-content">
        <button @click="volverAAulaVirtual" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5m7-7l-7 7 7 7"/>
          </svg>
          <span>Volver a Aula Virtual</span>
        </button>

        <div class="titulo-section">
          <h1 class="ranking-titulo">Ranking {{ simulacroTitulo }}</h1>
          <div class="exclusivo-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
            </svg>
            <span>EXCLUSIVO</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="ranking-content">
      <!-- Loading state -->
      <div v-if="loading" class="estado-container">
        <div class="loading-spinner"></div>
        <p>Cargando ranking...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="estado-container error-container">
        <p>{{ error }}</p>
        <button @click="cargarRanking" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Ranking content -->
      <div v-else class="ranking-main-content">
        <!-- Info del simulacro -->
        <div class="simulacro-info">
          <h2>{{ simulacroTitulo }}</h2>
          <p>{{ totalParticipantes }} estudiantes han completado este simulacro</p>
        </div>

        <!-- Tu resultado (si existe) -->
        <div v-if="tuPosicion" class="tu-resultado">
          <div class="resultado-header">
            <h3>Tu resultado</h3>
          </div>
          <div class="resultado-grid">
            <div class="resultado-item posicion-item">
              <span class="puesto-label">PUESTO</span>
              <span class="numero" :class="getPosicionClass(tuPosicion.posicion)">{{ tuPosicion.posicion }}</span>
            </div>
            <div class="resultado-item">
              <span class="label">PUNTOS</span>
              <span class="valor">{{ tuPosicion.calificacion }}</span>
            </div>
            <div class="resultado-item">
              <span class="label">CORRECTAS</span>
              <span class="valor">{{ tuPosicion.correctas }}/60</span>
            </div>
            <div class="resultado-item">
              <span class="label">TIEMPO</span>
              <span class="valor">{{ formatearTiempo(tuPosicion.tiempoUtilizado) }}</span>
            </div>
          </div>
        </div>

        <!-- Tabla de ranking limpia -->
        <div class="ranking-table-container">
          <!-- Vista Desktop -->
          <div class="desktop-view">
            <div class="table-header">
              <div class="header-col pos-col">Pos</div>
              <div class="header-col student-col">Estudiante</div>
              <div class="header-col score-col">Puntos</div>
              <div class="header-col correct-col">Correctas</div>
              <div class="header-col time-col">Tiempo</div>
              <div class="header-col date-col">Fecha</div>
            </div>

            <div class="table-body">
              <div v-for="(resultado, index) in resultados" :key="resultado.id" 
                   :class="{ 
                     'table-row': true,
                     'my-row': resultado.esTuyo,
                     'top-row': index < 3
                   }">
                
                <div class="table-col pos-col">
                  <div class="position-badge" :class="getPosicionClass(index + 1)">
                    <span v-if="index === 0" class="medal">🥇</span>
                    <span v-else-if="index === 1" class="medal">🥈</span>
                    <span v-else-if="index === 2" class="medal">🥉</span>
                    <span v-else class="pos-number">{{ index + 1 }}</span>
                  </div>
                </div>
                
                <div class="table-col student-col">
                  <div class="student-info">
                    <div class="avatar">{{ resultado.inicial }}</div>
                    <div class="student-details">
                      <span class="name">{{ resultado.nombre }}</span>
                      <span v-if="resultado.esTuyo" class="you-tag">Tú</span>
                    </div>
                  </div>
                </div>
                
                <div class="table-col score-col">
                  <span class="score">{{ resultado.calificacion }}</span>
                </div>
                
                <div class="table-col correct-col">
                  <span class="correct">{{ resultado.correctas }}/60</span>
                </div>
                
                <div class="table-col time-col">
                  <span class="time">{{ formatearTiempo(resultado.tiempoUtilizado) }}</span>
                </div>
                
                <div class="table-col date-col">
                  <span class="date">{{ formatearFecha(resultado.fechaRealizacion) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Vista Mobile -->
          <div class="mobile-view">
            <div v-for="(resultado, index) in resultados" :key="resultado.id" 
                 :class="{ 
                   'mobile-card': true, 
                   'my-card': resultado.esTuyo,
                   'top-card': index < 3 
                 }">
              
              <div class="card-header">
                <div class="position-section">
                  <div class="position-badge" :class="getPosicionClass(index + 1)">
                    <span v-if="index === 0" class="medal">🥇</span>
                    <span v-else-if="index === 1" class="medal">🥈</span>
                    <span v-else-if="index === 2" class="medal">🥉</span>
                    <span v-else class="pos-number">{{ index + 1 }}</span>
                  </div>
                </div>
                
                <div class="student-section">
                  <div class="avatar">{{ resultado.inicial }}</div>
                  <div class="student-name">
                    {{ resultado.nombre }}
                    <span v-if="resultado.esTuyo" class="you-tag">Tú</span>
                  </div>
                </div>
              </div>

              <div class="card-data">
                <div class="data-row">
                  <div class="data-item">
                    <span class="data-label">Puntos</span>
                    <span class="data-value score">{{ resultado.calificacion }}</span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Correctas</span>
                    <span class="data-value">{{ resultado.correctas }}/60</span>
                  </div>
                </div>
                <div class="data-row">
                  <div class="data-item">
                    <span class="data-label">Tiempo</span>
                    <span class="data-value">{{ formatearTiempo(resultado.tiempoUtilizado) }}</span>
                  </div>
                  <div class="data-item">
                    <span class="data-label">Fecha</span>
                    <span class="data-value date-small">{{ formatearFecha(resultado.fechaRealizacion) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado vacío -->
        <div v-if="resultados.length === 0" class="empty-state">
          <div class="empty-icon">📊</div>
          <h3>No hay resultados aún</h3>
          <p>Sé el primero en completar este simulacro y aparecer en el ranking</p>
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
const simulacroTitulo = ref('Simulacro #1');

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
    
    // Obtener información del simulacro
    const simulacroDoc = await getDoc(doc(db, 'simulacrosVip', simulacroId));
    if (simulacroDoc.exists()) {
      simulacroTitulo.value = simulacroDoc.data().titulo || 'Simulacro #1';
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
      
      if (!resultadosPorUsuario.has(userId)) {
        resultadosPorUsuario.set(userId, {
          id: docSnapshot.id,
          ...data
        });
      } else {
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
      const nombre = 'Usuario';
      const userEmail = auth.currentUser?.uid === userId ? 
        auth.currentUser.email : 
        `usuario${userId.slice(-4)}@academia.com`;
      
      const inicial = 'U';
      
      // Verificar y limpiar tiempoUtilizado
      let tiempoUtilizado = data.tiempoUtilizado;
      if (tiempoUtilizado === null || 
          tiempoUtilizado === undefined || 
          isNaN(tiempoUtilizado)) {
        tiempoUtilizado = 0; // o null si prefieres mostrar '--:--'
      }
      
      resultadosTemp.push({
        id: data.id,
        ...data,
        tiempoUtilizado, // usar el valor limpio
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
    console.error('Error al cargar ranking:', err);
    error.value = 'No se pudo cargar el ranking. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

// Propiedades computadas
const totalParticipantes = computed(() => resultados.value.length);

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
const getPosicionClass = (posicion) => {
  if (posicion === 1) return 'first';
  if (posicion === 2) return 'second';
  if (posicion === 3) return 'third';
  return '';
};

const formatearTiempo = (tiempoEnSegundos) => {
  // Verificar si el tiempo es válido
  if (tiempoEnSegundos === null || 
      tiempoEnSegundos === undefined || 
      isNaN(tiempoEnSegundos) || 
      tiempoEnSegundos < 0) {
    return '--:--';
  }
  
  // Convertir a número entero
  const tiempo = Math.floor(Number(tiempoEnSegundos));
  
  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;
  
  return `${minutos}:${segundos.toString().padStart(2, '0')}`;
};

const formatearFecha = (fecha) => {
  if (!fecha) return '';
  
  // Convertir timestamp de Firebase a Date
  const fechaObj = fecha.seconds ? new Date(fecha.seconds * 1000) : new Date(fecha);
  
  const opciones = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return fechaObj.toLocaleDateString('es-ES', opciones);
};

// Navegación
const volverAAulaVirtual = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
/* Fuentes modernas */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.ranking-container {
  min-height: 100vh;
  background: #fafafa;
  color: #1a1a1a;
}

/* Header minimalista */
.ranking-header {
  background: white;
  border-bottom: 2px solid #ffd700;
  border-top: 2px solid #ffd700;
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 12px rgba(255, 215, 0, 0.15);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
}

.back-btn:hover {
  background: linear-gradient(135deg, #ffb347, #ffd700);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.4);
}

.titulo-section {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.ranking-titulo {
  color: #2a2a2a;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.02em;
}

.exclusivo-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-weight: 700;
  font-size: 0.7rem;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.25);
}

/* Contenido principal */
.ranking-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.estado-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
  color: #6a6a6a;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 2px solid #e8e8e8;
  border-top: 2px solid #4a90e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  color: #dc3545;
}

.retry-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background: #357abd;
}

/* Info del simulacro */
.simulacro-info {
  text-align: center;
  margin-bottom: 3rem;
}

.simulacro-info h2 {
  color: #2a2a2a;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.simulacro-info p {
  color: #6a6a6a;
  font-size: 1rem;
  margin: 0;
}

/* Tu resultado */
.tu-resultado {
  background: white;
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.resultado-header h3 {
  color: #2a2a2a;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
}

.resultado-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
}

.resultado-item {
  text-align: center;
}

.puesto-label,
.label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #8a8a8a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.numero,
.valor {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #2a2a2a;
  line-height: 1;
}

.numero.first {
  color: #ff6b35;
}

.numero.second {
  color: #4a90e2;
}

.numero.third {
  color: #28a745;
}

/* Tabla de ranking */
.ranking-table-container {
  background: white;
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Vista Desktop */
.desktop-view {
  display: block;
}

.mobile-view {
  display: none;
}

.table-header {
  display: grid;
  grid-template-columns: 60px 1fr 80px 100px 80px 120px;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e8e8e8;
}

.header-col {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6a6a6a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-body {
  padding: 0.5rem 0;
}

.table-row {
  display: grid;
  grid-template-columns: 60px 1fr 80px 100px 80px 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f5f5f5;
}

.table-row:hover {
  background: #fafafa;
}

.table-row.my-row {
  background: #f0f8ff;
  border-left: 3px solid #4a90e2;
}

.table-row.top-row {
  background: #fffbf0;
}

.table-col {
  display: flex;
  align-items: center;
}

.position-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  font-weight: 600;
  font-size: 0.9rem;
}

.medal {
  font-size: 1.2rem;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.student-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.name {
  font-weight: 500;
  color: #2a2a2a;
}

.you-tag {
  background: #4a90e2;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
}

.score {
  font-weight: 700;
  color: #ff6b35;
}

.correct,
.time {
  color: #2a2a2a;
  font-weight: 500;
}

.date {
  color: #6a6a6a;
  font-size: 0.85rem;
}

/* Vista Mobile */
.mobile-card {
  background: white;
  border-bottom: 1px solid #f0f0f0;
  padding: 1.25rem;
}

.mobile-card.my-card {
  background: #f0f8ff;
  border-left: 3px solid #4a90e2;
}

.mobile-card.top-card {
  background: #fffbf0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.position-section .position-badge {
  width: 36px;
  height: 36px;
}

.student-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.student-name {
  font-weight: 500;
  color: #2a2a2a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-data {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.data-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.data-item {
  text-align: center;
}

.data-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: #8a8a8a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.data-value {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #2a2a2a;
}

.data-value.score {
  color: #ff6b35;
  font-weight: 700;
}

.data-value.date-small {
  font-size: 0.8rem;
  color: #6a6a6a;
  font-weight: 500;
}

/* Estado vacío */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: #6a6a6a;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #2a2a2a;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.empty-state p {
  margin: 0;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .ranking-header {
    padding: 1rem 0;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .titulo-section {
    text-align: left;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .ranking-titulo {
    font-size: 1.5rem;
  }

  .exclusivo-badge {
    align-self: flex-start;
  }

  .back-btn {
    align-self: stretch;
    justify-content: center;
  }

  .ranking-content {
    padding: 2rem 1rem;
  }

  .tu-resultado {
    padding: 1.5rem;
  }

  .resultado-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  /* Ocultar desktop, mostrar mobile */
  .desktop-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }
}

@media (max-width: 480px) {
  .ranking-titulo {
    font-size: 1.25rem;
  }

  .resultado-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .mobile-card {
    padding: 1rem;
  }

  .data-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>