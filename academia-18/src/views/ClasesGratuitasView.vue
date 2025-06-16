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
      <div v-else class="cursos-gratuitos-grid">
        <div v-for="curso in cursosRegulares" :key="curso.id" 
             class="curso-gratuito-card" 
             @click="navegarACurso(curso.id)">
          <div class="curso-imagen" :style="{ backgroundImage: `url(${curso.imagen || '/placeholder-curso.jpg'})` }">
            <div class="curso-overlay"></div>
            <div class="curso-badge">GRATUITO</div>
          </div>
          <div class="curso-info">
            <h2>{{ curso.titulo }}</h2>
            <p>{{ curso.descripcion }}</p>
            <div class="curso-meta">
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{{ curso.duracion || 'Duración flexible' }}</span>
              </div>
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <span>{{ curso.totalClases || 'Múltiples clases' }}</span>
              </div>
            </div>
            <button class="ver-curso-btn">
              <span>Ver Curso</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- CTA Section para invitar a matricularse -->
      <section class="cta-matricula">
        <div class="cta-content">
          <h2>¿Quieres acceso a contenido premium?</h2>
          <p>Únete a nuestros cursos completos con material exclusivo, ejercicios personalizados y seguimiento de profesores.</p>
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

// Estados
const cursosRegulares = ref([]);
const loading = ref(true);
const error = ref(null);

// Cargar cursos al montar el componente
onMounted(() => {
  cargarCursos();
});

const cargarCursos = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Obtener cursos regulares de Firebase
    const cursosRef = collection(db, 'cursos');
    const querySnapshot = await getDocs(cursosRef);

    const cursosArray = [];
    querySnapshot.forEach((doc) => {
      cursosArray.push({
        id: doc.id,
        ...doc.data()
      });
    });

    cursosRegulares.value = cursosArray;
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
</style>