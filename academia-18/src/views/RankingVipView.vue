<template>
  <div class="ranking-container">
    <!-- Header -->
    <header class="ranking-header">
      <div class="header-content">
        <button @click="volverAAulaVirtual" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Volver a Aula Virtual</span>
        </button>

        <div class="ranking-titulo-container">
          <h1 class="ranking-titulo">Ranking - {{ simulacroTitulo }}</h1>
          <div class="exclusivo-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
        <!-- Encabezado del ranking -->
        <div class="ranking-header-info">
          <h2>{{ simulacroTitulo }}</h2>
          <p>{{ totalParticipantes }} estudiantes han completado este simulacro</p>
        </div>

        <!-- Tu resultado (si existe) -->
        <div v-if="tuPosicion" class="tu-resultado">
          <h3>Tu resultado</h3>
          <div class="resultado-detalle">
            <div class="posicion" :class="getPosicionClass(tuPosicion.posicion)">
              <span class="puesto-label">PUESTO:</span>
              <span class="numero">{{ tuPosicion.posicion }}</span>
            </div>
            <div class="puntuacion">
              <div class="valor">{{ tuPosicion.calificacion }}</div>
              <div class="label">puntos</div>
            </div>
            <div class="correctas">
              <div class="valor">{{ tuPosicion.correctas }}</div>
              <div class="label">correctas</div>
            </div>
            <div class="tiempo">
              <div class="valor">{{ formatearTiempo(tuPosicion.tiempoUtilizado) }}</div>
              <div class="label">tiempo</div>
            </div>
          </div>
        </div>

        <!-- Tabla de ranking responsive -->
        <div class="ranking-table-container">
          <!-- Vista Desktop -->
          <div class="desktop-table">
            <table>
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Estudiante</th>
                  <th>Puntuación</th>
                  <th>Respuestas correctas</th>
                  <th>Tiempo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(resultado, index) in resultados" :key="resultado.id" 
                    :class="{ 'mi-fila': resultado.esTuyo }">
                  <td class="posicion-col">
                    <div class="posicion-badge" :class="getPosicionClass(index + 1)">
                      {{ index + 1 }}
                    </div>
                  </td>
                  <td class="estudiante-col">
                    <div class="estudiante-info">
                      <div class="avatar">{{ resultado.inicial }}</div>
                      <div class="nombre">
                        {{ resultado.nombre }}
                        <span v-if="resultado.esTuyo">(Tú)</span>
                      </div>
                    </div>
                  </td>
                  <td class="puntuacion-col">{{ resultado.calificacion }}</td>
                  <td class="correctas-col">{{ resultado.correctas }} / 30</td>
                  <td class="tiempo-col">{{ formatearTiempo(resultado.tiempoUtilizado) }}</td>
                  <td class="fecha-col">{{ formatearFecha(resultado.fechaRealizacion) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Vista Mobile -->
          <div class="mobile-cards">
            <div v-for="(resultado, index) in resultados" :key="resultado.id" 
                 :class="{ 
                   'result-card': true, 
                   'mi-card': resultado.esTuyo,
                   'top-3': index < 3 
                 }">
              
              <!-- Header de la card -->
              <div class="card-header">
                <div class="posicion-mobile" :class="getPosicionClass(index + 1)">
                  <span class="numero">{{ index + 1 }}°</span>
                  <div class="medal" v-if="index < 3">
                    <svg v-if="index === 0" width="16" height="16" fill="#ffd700" viewBox="0 0 24 24">
                      <path d="M12 2L9 9l-7 1 5.5 4.5L6 22l6-3 6 3-1.5-7.5L22 10l-7-1-3-7z"/>
                    </svg>
                    <svg v-else-if="index === 1" width="16" height="16" fill="#c0c0c0" viewBox="0 0 24 24">
                      <path d="M12 2L9 9l-7 1 5.5 4.5L6 22l6-3 6 3-1.5-7.5L22 10l-7-1-3-7z"/>
                    </svg>
                    <svg v-else width="16" height="16" fill="#cd7f32" viewBox="0 0 24 24">
                      <path d="M12 2L9 9l-7 1 5.5 4.5L6 22l6-3 6 3-1.5-7.5L22 10l-7-1-3-7z"/>
                    </svg>
                  </div>
                </div>
                
                <div class="estudiante-mobile">
                  <div class="avatar">{{ resultado.inicial }}</div>
                  <div class="nombre">
                    {{ resultado.nombre }}
                    <span v-if="resultado.esTuyo" class="tu-badge">Tú</span>
                  </div>
                </div>
              </div>

              <!-- Datos de la card -->
              <div class="card-datos">
                <div class="dato-item">
                  <span class="dato-label">Puntuación</span>
                  <span class="dato-valor puntuacion">{{ resultado.calificacion }}</span>
                </div>
                <div class="dato-item">
                  <span class="dato-label">Correctas</span>
                  <span class="dato-valor">{{ resultado.correctas }}/30</span>
                </div>
                <div class="dato-item">
                  <span class="dato-label">Tiempo</span>
                  <span class="dato-valor">{{ formatearTiempo(resultado.tiempoUtilizado) }}</span>
                </div>
                <div class="dato-item">
                  <span class="dato-label">Fecha</span>
                  <span class="dato-valor fecha">{{ formatearFecha(resultado.fechaRealizacion) }}</span>
                </div>
              </div>
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
          <h3>No hay resultados aún</h3>
          <p>Sé el primero en completar este simulacro y aparecer en el ranking.</p>
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
  if (posicion === 1) return 'primero';
  if (posicion === 2) return 'segundo';
  if (posicion === 3) return 'tercero';
  return '';
};

const getTextoPos = (posicion) => {
  if (posicion === 1) return 'er';
  if (posicion === 2) return 'do';
  if (posicion === 3) return 'er';
  return 'to';
};

const formatearTiempo = (tiempoEnSegundos) => {
  const minutos = Math.floor(tiempoEnSegundos / 60);
  const segundos = tiempoEnSegundos % 60;
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

.exclusivo-badge {
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

/* Encabezado del ranking */
.ranking-header-info {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border: 2px solid #ffd700;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.1);
}

.ranking-header-info h2 {
  color: #0052af;
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
}

.ranking-header-info p {
  margin: 0;
  color: #666;
}

/* Tu resultado */
.tu-resultado {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.tu-resultado h3 {
  margin: 0 0 1rem;
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.resultado-detalle {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.posicion {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.puesto-label {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.9;
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
}

.posicion .numero {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.posicion.primero {
  color: #ffd700;
}

.posicion.segundo {
  color: #c0c0c0;
}

.posicion.tercero {
  color: #cd7f32;
}

.puntuacion, .correctas, .tiempo {
  text-align: center;
}

.valor {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.3rem;
}

.label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Tabla responsive */
.ranking-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 2px solid #ffd700;
}

/* Vista Desktop */
.desktop-table {
  display: block;
}

.mobile-cards {
  display: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 1rem;
  text-align: left;
  background: linear-gradient(135deg, #f8f9fa, #fff9e6);
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  color: #333;
}

tr.mi-fila {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(255, 249, 230, 0.5));
}

.posicion-col {
  width: 80px;
  text-align: center;
}

.posicion-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f8f9fa;
  font-weight: 600;
}

.posicion-badge.primero {
  background-color: #fff9e6;
  color: #ffd700;
  border: 2px solid #ffd700;
}

.posicion-badge.segundo {
  background-color: #f5f5f5;
  color: #757575;
  border: 2px solid #bdbdbd;
}

.posicion-badge.tercero {
  background-color: #f9f2ec;
  color: #cd7f32;
  border: 2px solid #cd7f32;
}

.estudiante-col {
  min-width: 200px;
}

.estudiante-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar {
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

.nombre {
  font-weight: 500;
}

.nombre span {
  font-weight: normal;
  font-size: 0.9rem;
  opacity: 0.7;
  margin-left: 0.3rem;
}

.puntuacion-col {
  font-weight: 600;
  color: #0052af;
}

/* Vista Mobile Cards */
.result-card {
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.result-card.mi-card {
  border: 2px solid #ffd700;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(255, 249, 230, 0.3));
}

.result-card.top-3 {
  border: 2px solid #ffd700;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), white);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa, #fff9e6);
  border-bottom: 1px solid #e0e0e0;
}

.posicion-mobile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
}

.posicion-mobile.primero {
  color: #ffd700;
}

.posicion-mobile.segundo {
  color: #c0c0c0;
}

.posicion-mobile.tercero {
  color: #cd7f32;
}

.estudiante-mobile {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.estudiante-mobile .avatar {
  width: 35px;
  height: 35px;
  font-size: 1rem;
}

.tu-badge {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 0.5rem;
}

.card-datos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  padding: 1rem;
}

.dato-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.dato-label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
}

.dato-valor {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.dato-valor.puntuacion {
  color: #0052af;
  font-weight: 700;
}

.dato-valor.fecha {
  font-size: 0.9rem;
  color: #666;
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

/* Responsive breakpoints */
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
    width: 100%;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .ranking-content {
    padding: 0 1rem;
    margin: 1rem auto;
  }

  .ranking-header-info {
    padding: 1rem;
  }

  .ranking-header-info h2 {
    font-size: 1.5rem;
  }

  .resultado-detalle {
    justify-content: space-around;
    gap: 1rem;
  }

  .posicion .numero {
    font-size: 2rem;
  }

  .valor {
    font-size: 1.5rem;
  }

  /* Ocultar tabla desktop, mostrar cards mobile */
  .desktop-table {
    display: none;
  }

  .mobile-cards {
    display: block;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .ranking-titulo {
    font-size: 1.2rem;
  }

  .exclusivo-badge {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }

  .card-datos {
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    padding: 0.8rem;
  }

  .dato-valor {
    font-size: 1rem;
  }

  .resultado-detalle {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>