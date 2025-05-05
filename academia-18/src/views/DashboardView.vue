<template>
  <div class="dashboard-container">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1>Mis Cursos</h1>
        <div class="user-menu">
          <span class="user-name">{{ userName }}</span>
          <button @click="logout" class="logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="dashboard-content">
      <!-- Loading state -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Cargando tus cursos...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="fetchCursos" class="retry-btn">Intentar nuevamente</button>
      </div>

      <!-- Empty state -->
      <div v-else-if="cursos.length === 0" class="empty-container">
        <div class="empty-illustration">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
            stroke="#0052af" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
        <h2>No tienes cursos aún</h2>
        <p>Ponte en contacto con tu profesor para obtener acceso a tus cursos</p>
      </div>

      <!-- Lista de cursos -->
      <div v-else class="cursos-grid">
        <div v-for="curso in cursos" :key="curso.id" class="curso-card" @click="navegarACurso(curso.id)">
          <div class="curso-imagen" :style="{ backgroundImage: `url(${curso.imagen || '/placeholder-curso.jpg'})` }">
            <div class="curso-overlay"></div>
          </div>
          <div class="curso-info">
            <h2>{{ curso.titulo }}</h2>
            <p>{{ curso.descripcion }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db, authService } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const router = useRouter();
const cursos = ref([]);
const loading = ref(true);
const error = ref(null);
const userName = ref('');

// Verificar si el usuario está autenticado
onMounted(async () => {
  // Escuchar cambios en la autenticación
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Usuario autenticado
      userName.value = user.email.split('@')[0]; // Nombre de usuario simple
      await fetchCursos();
    } else {
      // No hay usuario autenticado, redirigir al login
      router.push('/aula-virtual');
    }
  });
});

// Función modificada para obtener todos los cursos disponibles
const fetchCursos = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No se ha iniciado sesión');
    }
    
    // Modificación: Consulta para obtener todos los cursos disponibles
    // en lugar de filtrar por estudiantes
    const cursosRef = collection(db, 'cursos');
    // Si quieres mostrar todos los cursos a todos los usuarios:
    const querySnapshot = await getDocs(cursosRef);
    
    // Alternativa: si prefieres mantener la lógica original y asignar usuarios específicos
    // const q = query(cursosRef, where('estudiantes', 'array-contains', user.uid));
    // const querySnapshot = await getDocs(q);
    
    // Convertir los documentos a un array de objetos
    const cursosArray = [];
    querySnapshot.forEach((doc) => {
      cursosArray.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Actualizar el estado
    cursos.value = cursosArray;
  } catch (err) {
    console.error('Error al obtener los cursos:', err);
    error.value = 'No se pudieron cargar tus cursos. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

// Función para navegar a la vista detallada de un curso
const navegarACurso = (cursoId) => {
  router.push(`/curso/${cursoId}`);
};

// Función para cerrar sesión
const logout = async () => {
  try {
    await authService.logout();
    router.push('/aula-virtual');
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
    alert('No se pudo cerrar sesión. Intenta de nuevo.');
  }
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.dashboard-header {
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
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  color: #0052af;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 500;
  color: #333;
}

.logout-btn {
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

.logout-btn:hover {
  background-color: rgba(0, 82, 175, 0.08);
}

.dashboard-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* Estados de carga, error y vacío */
.loading-container,
.error-container,
.empty-container {
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

.error-container {
  color: #d32f2f;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover {
  background-color: #003c8f;
}

.empty-container h2 {
  color: #0052af;
  margin: 1rem 0 0.5rem;
}

.empty-container p {
  color: #757575;
  max-width: 400px;
}

.empty-illustration {
  opacity: 0.7;
  margin-bottom: 1rem;
}

/* Grid de cursos */
.cursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.curso-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.curso-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.curso-imagen {
  height: 160px;
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));
}

.curso-info {
  padding: 1.5rem;
}

.curso-info h2 {
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.2rem;
}

.curso-info p {
  color: #757575;
  font-size: 0.9rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive design */
@media (max-width: 768px) {
  .dashboard-content {
    padding: 0 1rem;
    margin: 1.5rem auto;
  }

  .cursos-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .cursos-grid {
    grid-template-columns: 1fr;
  }
}
</style>