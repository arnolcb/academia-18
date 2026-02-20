<template>
  <div class="clases-gratuitas-container">
    <!-- Header -->
    <header class="clases-header">
      <div class="header-content">
        <h1>Clases Gratuitas</h1>
        <p>Accede a nuestros cursos básicos sin necesidad de registro</p>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="clases-content">
      <!-- Estados de carga y error -->
      <div v-if="loading" class="estado-container">
        <div class="loading-spinner"></div>
        <p>Cargando cursos gratuitos...</p>
      </div>

      <div v-else-if="error" class="estado-container error-container">
        <p>{{ error }}</p>
        <button @click="cargarCursos" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Grid de cursos -->
      <!-- Grid de cursos -->
<div v-else class="cursos-layout">
  <div class="cursos-gratuitos-grid">
  <!-- Card manual para simulacro -->
   <!--
  <div class="curso-gratuito-card simulacro-card" @click="navegarASimulacro">
    <div class="curso-imagen" :style="{ backgroundImage: `url('https://res.cloudinary.com/dn2tpyyz4/image/upload/v1755966570/Copia_de_Post_para_Instagram_horario_de_atenci%C3%B3n_moderno_azul_1_qyzklo.png')` }">
      <div class="curso-overlay"></div>
      <div class="curso-badge simulacro-badge">RESULTADOS #2</div>
    </div>
        <div class="curso-info">
      <h2>RESULTADOS SIMULACRO #2</h2>
      <p>Ingresa aquí al ranking</p>
      <div class="curso-meta">
        <div class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>125 minutos</span>
        </div>
        <div class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          <span>60 preguntas</span>
        </div>
      </div>
      <button class="ver-curso-btn simulacro-btn">
        <span>Iniciar Simulacro</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  </div>
-->
  <!-- Cards de cursos existentes -->
  <div v-for="curso in cursosRegulares" :key="curso.id" class="curso-gratuito-card"
    @click="navegarACurso(curso.id)">
    <!-- El resto del código de las cards de cursos se mantiene igual -->
    <div class="curso-imagen" :style="{ backgroundImage: `url(${curso.imagen || '/placeholder-curso.jpg'})` }">
      <div class="curso-overlay"></div>
      <div class="curso-badge">GRATUITO</div>
    </div>
    <div class="curso-info">
      <h2>{{ curso.titulo }}</h2>
      <p>{{ curso.descripcion }}</p>
      <div class="curso-meta">
        <div class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{{ curso.duracion || 'Duración flexible' }}</span>
        </div>
        <div class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
          <span>{{ curso.totalClases || 'Múltiples clases' }}</span>
        </div>
      </div>
      <button class="ver-curso-btn">
        <span>Ver Curso</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  </div>
</div> <!-- cierre cursos-gratuitos-grid -->

  <!-- Sidebar de materiales -->
  <div class="materiales-sidebar">
    <h2 class="materiales-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
      <span>Materiales</span>
    </h2>

    <div v-if="loadingMateriales" class="materiales-loading">
      <div class="loading-spinner-small"></div>
      <p>Cargando materiales...</p>
    </div>
    <div v-else-if="materiales.length === 0" class="materiales-empty">
      <p>No hay materiales disponibles.</p>
    </div>
    <div v-else class="materiales-list">
      <div v-for="material in materiales" :key="material.id" class="material-item">
        <div class="material-header" @click="toggleMaterial(material.id)"
          :class="{ active: materialActivo === material.id }">
          <span class="material-title">{{ material.titulo }}</span>
          <div class="material-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div v-if="materialActivo === material.id" class="material-items">
          <div v-if="material.items.length === 0" class="items-empty">
            <p>No hay archivos disponibles.</p>
          </div>
          <div v-else class="items-list">
            <div v-for="item in material.items" :key="item.id" class="item-entry">
              <div class="item-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>{{ item.titulo }}</span>
              </div>
              <button @click="descargarMaterial(item)" class="material-download-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div> <!-- cierre cursos-layout -->
      <!-- CTA Section para invitar a matricularse -->
      <section class="cta-matricula">
        <div class="cta-content">
          <h2>¿Quieres acceso a contenido premium?</h2>
          <p>Únete a nuestros cursos completos con material exclusivo, ejercicios personalizados y seguimiento de
            profesores.</p>
          <div class="cta-buttons">
            <router-link to="/aula-virtual" class="cta-button secondary">Ir a Aula VIP</router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

const router = useRouter();
const navegarASimulacro = () => {
  //router.push('/simulacro-gratuito/simulacro2');
  router.push('/simulacro-gratuito/simulacro2/ranking');
};
// Estados
const cursosRegulares = ref([]);
const loading = ref(true);
const error = ref(null);

// Cargar cursos al montar el componente
onMounted(() => {
  cargarCursos();
  cargarMateriales();
});

const cargarCursos = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Obtener cursos regulares de Firebase
    const cursosRef = collection(db, 'cursos4');
    const querySnapshot = await getDocs(cursosRef);

    const cursosArray = [];
    querySnapshot.forEach((doc) => {
      cursosArray.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    cursosRegulares.value = cursosArray.sort((a, b) => a.orden - b.orden);
  } catch (err) {
    console.error('Error al obtener los cursos:', err);
    error.value = 'No se pudieron cargar los cursos. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

const navegarACurso = (cursoId) => {
  // Navegar al curso sin autenticación requerida
  router.push(`/clase-gratuita/${cursoId}`);
};

const materiales = ref([]);
const loadingMateriales = ref(false);
const materialActivo = ref(null);

const toggleMaterial = (materialId) => {
  materialActivo.value = materialActivo.value === materialId ? null : materialId;
};

const descargarMaterial = (item) => {
  if (!item.archivoUrl || item.archivoUrl.trim() === '') {
    alert('El archivo no está disponible en este momento.');
    return;
  }
  window.open(item.archivoUrl, '_blank');
};

const cargarMateriales = async () => {
  loadingMateriales.value = true;
  try {
    const materialesRef = collection(db, 'materialesVip4'); // ajusta el nombre de tu colección
    const materialesSnapshot = await getDocs(materialesRef);

    const materialesArray = [];
    for (const materialDoc of materialesSnapshot.docs) {
      const itemsRef = collection(db, `materialesVip4/${materialDoc.id}/items`);
      const itemsSnapshot = await getDocs(itemsRef);
      const items = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      materialesArray.push({
        id: materialDoc.id,
        ...materialDoc.data(),
        items
      });
    }
    materiales.value = materialesArray;
  } catch (err) {
    console.error('Error al cargar materiales:', err);
  } finally {
    loadingMateriales.value = false;
  }
};
</script>

<style scoped>
.clases-gratuitas-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.clases-header {
  background: linear-gradient(135deg, #0052af, #003d80);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.header-content p {
  font-size: 1rem;
  opacity: 0.9;
  max-width: 500px;
  margin: 0 auto;
}

.clases-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 0.8rem;
}

/* Estados de carga */
.estado-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  min-height: 40vh;
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

/* Grid de cursos - Responsive mejorado */
.cursos-gratuitos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.curso-gratuito-card {
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  width: 100%;
  max-width: 100%;
}

.curso-gratuito-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  border-color: #0052af;
}

.curso-imagen {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.curso-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4));
}

/* Badge más pequeño y menos invasivo */
.curso-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #4caf50;
  color: white;
  font-weight: 600;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.curso-info {
  padding: 1.2rem;
}

.curso-info h2 {
  margin: 0 0 0.6rem;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.curso-info p {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.curso-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #757575;
  font-size: 0.8rem;
}

.meta-item svg {
  color: #0052af;
  flex-shrink: 0;
}

.ver-curso-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.ver-curso-btn:hover {
  background-color: #003c8f;
  transform: translateY(-1px);
}

.ver-curso-btn svg {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.ver-curso-btn:hover svg {
  transform: translateX(3px);
}

/* CTA Section */
.cta-matricula {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: white;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
}

.cta-matricula::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -20%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

.cta-content p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.cta-button.primary {
  background-color: white;
  color: #0052af;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.cta-button.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Responsive mejorado */
@media (max-width: 768px) {
  .clases-header {
    padding: 1.5rem 0.8rem;
  }

  .header-content h1 {
    font-size: 1.7rem;
  }

  .header-content p {
    font-size: 0.9rem;
  }

  .clases-content {
    padding: 1rem 0.5rem;
  }

  .cursos-gratuitos-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    max-width: 500px;
    margin: 0 auto 2.5rem auto;
  }

  .curso-imagen {
    height: 160px;
  }

  .curso-info {
    padding: 1rem;
  }

  .curso-info h2 {
    font-size: 1.1rem;
  }

  .curso-info p {
    font-size: 0.85rem;
  }

  .curso-meta {
    flex-direction: column;
    gap: 0.6rem;
  }

  .cta-content h2 {
    font-size: 1.5rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .cta-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .clases-header {
    padding: 1.2rem 0.5rem;
  }

  .header-content h1 {
    font-size: 1.5rem;
  }

  .header-content p {
    font-size: 0.85rem;
  }

  .clases-content {
    padding: 0.8rem 0.3rem;
  }

  .cursos-gratuitos-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 450px;
  }

  .curso-badge {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
  }

  .cta-matricula {
    padding: 1.5rem 1rem;
    border-radius: 12px;
    margin: 0 0.5rem;
  }

  .cta-content h2 {
    font-size: 1.3rem;
  }

  .cta-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .cursos-gratuitos-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }

  .curso-info {
    padding: 0.8rem;
  }

  .curso-info h2 {
    font-size: 1rem;
  }

  .curso-info p {
    font-size: 0.8rem;
  }
}

.cursos-layout {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.cursos-layout .cursos-gratuitos-grid {
  flex: 1;
  min-width: 0;
}

.materiales-sidebar {
  width: 280px;
  flex-shrink: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  align-self: flex-start;
  position: sticky;
  top: 1rem;
  border: 1px solid #e0e0e0;
}

.materiales-title {
  color: #333;
  font-size: 1.1rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.materiales-title svg { color: #0052af; }

.materiales-loading,
.materiales-empty {
  text-align: center;
  padding: 1rem;
  color: #757575;
  font-size: 0.9rem;
}

.loading-spinner-small {
  width: 25px;
  height: 25px;
  border: 2px solid rgba(0, 82, 175, 0.1);
  border-top: 2px solid #0052af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 0.5rem;
}

.materiales-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.material-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.material-header {
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s;
}

.material-header:hover,
.material-header.active { background-color: #e8f0fe; }

.material-title { font-weight: 500; color: #333; font-size: 0.9rem; }

.material-toggle svg { transition: transform 0.3s; }
.material-header.active .material-toggle svg { transform: rotate(180deg); }

.material-items { padding: 0.8rem; }

.items-empty {
  text-align: center;
  padding: 0.5rem;
  color: #757575;
  font-size: 0.85rem;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  border-radius: 4px;
  background-color: #f8f9fa;
  transition: all 0.2s;
}

.item-entry:hover { background-color: #e3f2fd; }

.item-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #333;
  flex: 1;
  min-width: 0;
}

.item-info span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-info svg { color: #0052af; flex-shrink: 0; }

.material-download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #f8f9fa;
  border: 1px solid #0052af;
  color: #0052af;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.material-download-btn:hover {
  background-color: #0052af;
  color: white;
}

/* Responsive */
@media (max-width: 900px) {
  .cursos-layout {
    flex-direction: column;
  }
  .materiales-sidebar {
    width: 100%;
    position: static;
  }
}
</style>