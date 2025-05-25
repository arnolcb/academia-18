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

      <!-- Dashboard con cursos y materiales -->
      <div v-else class="dashboard-main-wrapper">

        <!-- Grid combinado de cursos y simulacro -->
        <div class="cursos-grid">
          
          <!-- TARJETA DE RESULTADOS COMENTADA -->
          
          <div class="simulacro-card resultados-card" @click="navegarAResultados">
            <div class="simulacro-imagen resultados-imagen">
              <div class="simulacro-overlay resultados-overlay"></div>
              <div class="simulacro-badge resultados-badge">RESULTADOS</div>
            </div>
            <div class="simulacro-info">
              <h2>Ver Resultados del Simulacro</h2>
              <p>Revisa tu rendimiento y posición en el ranking</p>
              <button class="simulacro-btn resultados-btn">Ver Resultados</button>
            </div>
          </div>
          

          <!-- NUEVA TARJETA DE SEGUNDO SIMULACRO -->
           <!--
          <div class="simulacro-card segundo-simulacro-card" @click="navegarASegundoSimulacro">
            <div class="simulacro-imagen segundo-simulacro-imagen">
              <div class="simulacro-overlay segundo-simulacro-overlay"></div>
              <div class="simulacro-badge segundo-simulacro-badge">SEGUNDO SIMULACRO</div>
            </div>
            <div class="simulacro-info">
              <h2>¡Segundo Simulacro Disponible!</h2>
              <p>Es momento de poner a prueba tus conocimientos nuevamente</p>
              <button class="simulacro-btn segundo-simulacro-btn">¡Rendir Ahora!</button>
            </div>
          </div>
          -->

          <!-- Las tarjetas de curso existentes -->
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

        <!-- Sección de materiales -->
        <div class="materiales-sidebar">
          <h2 class="materiales-title">Materiales</h2>

          <!-- Estado de carga de materiales -->
          <div v-if="loadingMateriales" class="materiales-loading">
            <div class="loading-spinner-small"></div>
            <p>Cargando materiales...</p>
          </div>

          <!-- Error en materiales -->
          <div v-else-if="errorMateriales" class="materiales-error">
            <p>{{ errorMateriales }}</p>
            <button @click="fetchMateriales" class="retry-btn small">Reintentar</button>
          </div>

          <!-- Sin materiales -->
          <div v-else-if="materiales.length === 0" class="materiales-empty">
            <p>No hay materiales disponibles.</p>
          </div>

          <!-- Lista de materiales -->
          <div v-else class="materiales-list">
            <div v-for="material in materiales" :key="material.id" class="material-item">
              <div class="material-header" @click="toggleMaterial(material.id)"
                :class="{ 'active': materialActivo === material.id }">
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
                        <polyline points="10 9 9 9 8 9"></polyline>
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
      </div> <!-- dashboard-main-wrapper -->
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

const materiales = ref([]);
const loadingMateriales = ref(true);
const errorMateriales = ref(null);
const materialActivo = ref(null);

// FUNCIÓN COMENTADA PARA RESULTADOS
const navegarAResultados = () => {
  router.push('/simulacro/simulacro2/ranking');
};


// NUEVA FUNCIÓN PARA SEGUNDO SIMULACRO
const navegarASegundoSimulacro = () => {
  router.push('/simulacro/simulacro2');
};

// Verificar si el usuario está autenticado
onMounted(async () => {
  // Escuchar cambios en la autenticación
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Usuario autenticado
      userName.value = user.email.split('@')[0]; // Nombre de usuario simple
      await fetchCursos();
      await fetchMateriales();
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

const fetchMateriales = async () => {
  loadingMateriales.value = true;
  errorMateriales.value = null;

  try {
    // Obtener materiales (colección independiente de primer nivel)
    const materialesRef = collection(db, 'materiales');
    const materialesSnapshot = await getDocs(materialesRef);

    // Crear array de materiales
    const materialesArray = [];
    for (const materialDoc of materialesSnapshot.docs) {
      // Para cada material, obtener sus items
      const itemsRef = collection(db, `materiales/${materialDoc.id}/items`);
      const itemsSnapshot = await getDocs(itemsRef);

      // Crear array de items
      const items = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Añadir material con sus items
      materialesArray.push({
        id: materialDoc.id,
        ...materialDoc.data(),
        items
      });
    }

    materiales.value = materialesArray;

    // Si hay materiales, abrir el primero por defecto
    /* if (materialesArray.length > 0 && !materialActivo.value) {
       materialActivo.value = materialesArray[0].id;
     } 
       */
  } catch (err) {
    console.error('Error al cargar materiales:', err);
    errorMateriales.value = 'No se pudieron cargar los materiales.';
  } finally {
    loadingMateriales.value = false;
  }
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

// AGREGAR FUNCIÓN PARA TOGGLE DE MATERIALES
const toggleMaterial = (materialId) => {
  if (materialActivo.value === materialId) {
    materialActivo.value = null;
  } else {
    materialActivo.value = materialId;
  }
};

// AGREGAR FUNCIÓN PARA DESCARGAR ITEM
const descargarMaterial = (item) => {
  if (!item.archivoUrl || item.archivoUrl.trim() === '') {
    alert('El archivo no está disponible en este momento.');
    return;
  }

  window.open(item.archivoUrl, '_blank');
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

/* Estilos para el contenedor principal */
.dashboard-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* Layout principal */
.dashboard-main-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Grid de cursos */
.cursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  flex: 1;
  min-width: 0;
  max-width: 800px;
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

/* Estilos para la sección de materiales */
.materiales-sidebar {
  width: 300px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  align-self: flex-start;
  height: fit-content;
}

.materiales-title {
  color: #0052af;
  font-size: 1.3rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.materiales-loading,
.materiales-error,
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

.material-header:hover {
  background-color: #f0f0f0;
}

.material-header.active {
  background-color: #e3f2fd;
  border-bottom: 1px solid #e0e0e0;
}

.material-title {
  font-weight: 500;
  color: #333;
}

.material-toggle svg {
  transition: transform 0.3s;
}

.material-header.active .material-toggle svg {
  transform: rotate(180deg);
}

.material-items {
  padding: 0.8rem;
}

.items-empty {
  text-align: center;
  padding: 0.5rem;
  color: #757575;
  font-size: 0.9rem;
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

.item-entry:hover {
  background-color: #e3f2fd;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.item-info svg {
  color: #0052af;
}

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
}

.material-download-btn:hover {
  background-color: #0052af;
  color: white;
}

.retry-btn.small {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
}

/* ESTILOS PARA EL SEGUNDO SIMULACRO */
.simulacro-card.segundo-simulacro-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.simulacro-card.segundo-simulacro-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.simulacro-imagen.segundo-simulacro-imagen {
  height: 160px;
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  position: relative;
}

.simulacro-overlay.segundo-simulacro-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
}

.simulacro-badge.segundo-simulacro-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: white;
  color: #e53e3e;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.8px;
  padding: 8px 12px;
  border-radius: 20px;
  z-index: 2;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  text-transform: uppercase;
}

.simulacro-card.segundo-simulacro-card .simulacro-info {
  padding: 1.5rem;
}

.simulacro-card.segundo-simulacro-card .simulacro-info h2 {
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.2rem;
  font-weight: 700;
}

.simulacro-card.segundo-simulacro-card .simulacro-info p {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.simulacro-btn.segundo-simulacro-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.simulacro-btn.segundo-simulacro-btn:hover {
  background-color: #c53030;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(229, 62, 62, 0.4);
}

/* Responsive Design */
@media (max-width: 1100px) {
  .dashboard-main-wrapper {
    flex-direction: column;
  }

  .cursos-grid {
    max-width: 100%;
  }

  .materiales-sidebar {
    width: 100%;
    max-width: 100%;
  }
}

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

/* ESTILOS PARA LA TARJETA DE RESULTADOS/RANKING */
.simulacro-card.resultados-card {
 background-color: white;
 border-radius: 12px;
 overflow: hidden;
 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
 cursor: pointer;
 transition: all 0.3s ease;
 position: relative;
}

.simulacro-card.resultados-card:hover {
 transform: translateY(-5px);
 box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.simulacro-imagen.resultados-imagen {
 height: 160px;
 background: linear-gradient(135deg, #20B2AA 0%, #4682B4 100%);
 position: relative;
}

.simulacro-overlay.resultados-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
}

.simulacro-badge.resultados-badge {
 position: absolute;
 top: 15px;
 right: 15px;
 background-color: white;
 color: #20B2AA;
 font-weight: 600;
 font-size: 11px;
 letter-spacing: 0.5px;
 padding: 6px 12px;
 border-radius: 16px;
 z-index: 2;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.simulacro-card.resultados-card .simulacro-info {
 padding: 1.5rem;
}

.simulacro-card.resultados-card .simulacro-info h2 {
 margin: 0 0 0.5rem;
 color: #333;
 font-size: 1.2rem;
 font-weight: 600;
}

.simulacro-card.resultados-card .simulacro-info p {
 color: #666;
 font-size: 0.9rem;
 margin: 0 0 1rem;
 display: -webkit-box;
 -webkit-line-clamp: 2;
 -webkit-box-orient: vertical;
 overflow: hidden;
}

.simulacro-btn.resultados-btn {
 background-color: #20B2AA;
 color: white;
 border: none;
 border-radius: 6px;
 padding: 0.7rem 1rem;
 font-weight: 500;
 cursor: pointer;
 transition: all 0.2s;
 width: 100%;
}

.simulacro-btn.resultados-btn:hover {
 background-color: #1e9e95;
 transform: translateY(-1px);
 box-shadow: 0 4px 12px rgba(32, 178, 170, 0.3);
}
</style>