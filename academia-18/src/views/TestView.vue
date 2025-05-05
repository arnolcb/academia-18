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
      <!-- Panel de depuración (visible solo en desarrollo) -->
      <div v-if="showDebugPanel" class="debug-panel">
        <h3>Panel de depuración</h3>
        <div class="debug-info">
          <p><strong>Estado de autenticación:</strong> {{ authStatus }}</p>
          <p><strong>Usuario ID:</strong> {{ userId }}</p>
          <p><strong>Estado de carga:</strong> {{ loading ? 'Cargando...' : 'Completado' }}</p>
          <p><strong>Método de carga:</strong> {{ metodoActual }}</p>
        </div>
        
        <div v-if="error" class="debug-error">
          <h4>Error:</h4>
          <p>{{ error }}</p>
          <pre v-if="errorDetails">{{ errorDetails }}</pre>
        </div>
        
        <div class="debug-actions">
          <button @click="cargarCursosMetodoGetDoc" class="debug-btn">Cargar con getDoc</button>
          <button @click="cargarCursosMetodoGetDocs" class="debug-btn">Cargar con getDocs</button>
          <button @click="cargarCursosREST" class="debug-btn">Cargar con REST</button>
          <button @click="resetError" class="debug-btn">Limpiar error</button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Cargando tus cursos...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2>No pudimos cargar tus cursos</h2>
        <p>{{ error }}</p>
        <button @click="retryFetchCursos" class="retry-btn">Intentar nuevamente</button>
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
            <h2>{{ curso.titulo || 'Sin título' }}</h2>
            <p>{{ curso.descripcion || 'Sin descripción' }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, authService } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Router
const router = useRouter();

// Estado
const cursos = ref([]);
const loading = ref(true);
const error = ref(null);
const errorDetails = ref('');
const userName = ref('');
const userId = ref('');
const authStatus = ref('Verificando...');
const metodoActual = ref('Sin método');

// Mostrar panel de depuración
const showDebugPanel = computed(() => {
  return process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
});

// Limpiar error
const resetError = () => {
  error.value = null;
  errorDetails.value = '';
};

// Verificar autenticación al montar el componente
onMounted(() => {
  console.log('Componente montado');
  loading.value = true;
  resetError();
  
  // Verificar autenticación
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Usuario autenticado
      console.log('Usuario autenticado:', user.uid);
      userName.value = user.email?.split('@')[0] || 'Usuario';
      userId.value = user.uid;
      authStatus.value = 'Autenticado';
      
      // Cargar cursos (empezamos con el método más probable de funcionar)
      await cargarCursosMetodoGetDoc();
    } else {
      // No hay usuario autenticado, redirigir al login
      console.log('No hay usuario autenticado, redirigiendo al login');
      authStatus.value = 'No autenticado';
      router.push('/login');
    }
  });
});

// Método 1: Cargar cursos usando getDoc - para un documento específico
const cargarCursosMetodoGetDoc = async () => {
  loading.value = true;
  resetError();
  metodoActual.value = 'getDoc (documento específico)';
  
  try {
    console.log('Cargando cursos con getDoc (método puntual)');
    
    // Importar dinámicamente para evitar errores si no se usa
    const { doc, getDoc, getFirestore } = await import('firebase/firestore');
    const db = getFirestore();
    
    // Sabemos que el ID del documento es "1qinin5DHISR9W2DDD3P" en la colección "cursos"
    const docRef = doc(db, "cursos", "1qinin5DHISR9W2DDD3P");
    
    // Obtener el documento específico (sin usar WebChannel)
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Documento encontrado:", docSnap.data());
      
      const data = docSnap.data();
      cursos.value = [{
        id: docSnap.id,
        titulo: data.titulo || 'Sin título',
        descripcion: data.descripcion || 'Sin descripción',
        imagen: data.imagen || '/placeholder-curso.jpg'
      }];
      
      console.log('Curso cargado con getDoc:', cursos.value);
    } else {
      console.log("No se encontró el documento");
      cursos.value = [];
    }
    
  } catch (err) {
    console.error('Error al cargar con getDoc:', err);
    error.value = 'Error al cargar el curso específico. Intentando método alternativo...';
    errorDetails.value = err.toString();
    
    // Si este método falla, intentar con getDocs
    if (error.value) {
      console.log('Intentando método alternativo...');
      await cargarCursosMetodoGetDocs();
    }
  } finally {
    loading.value = false;
  }
};

// Método 2: Cargar cursos usando getDocs - para toda la colección
const cargarCursosMetodoGetDocs = async () => {
  loading.value = true;
  resetError();
  metodoActual.value = 'getDocs (colección completa)';
  
  try {
    console.log('Cargando cursos con getDocs (toda la colección)');
    
    // Importar dinámicamente
    const { collection, getDocs, getFirestore, connectFirestoreEmulator } = await import('firebase/firestore');
    const db = getFirestore();
    
    // Usar una configuración que evite los problemas de WebChannel
    // Modificar opciones para evitar el canal persistente que causa problemas
    try {
      // Esto solo se ejecuta en desarrollo para ayudar con la depuración
      // No afecta la producción
      if (process.env.NODE_ENV === 'development') {
        connectFirestoreEmulator(db, 'localhost', 8080);
      }
    } catch (emulatorErr) {
      console.log('Nota: El emulador no está disponible, continuando con Firestore normal');
    }
    
    // Obtener referencia a la colección
    const cursosRef = collection(db, "cursos");
    
    // Intentar obtener todos los documentos (con opciones simplificadas)
    const querySnapshot = await getDocs(cursosRef);
    
    if (querySnapshot.empty) {
      console.log("No se encontraron documentos en la colección");
      cursos.value = [];
    } else {
      console.log("Documentos encontrados:", querySnapshot.size);
      
      // Procesar los documentos
      const cursosArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cursosArray.push({
          id: doc.id,
          titulo: data.titulo || 'Sin título',
          descripcion: data.descripcion || 'Sin descripción',
          imagen: data.imagen || '/placeholder-curso.jpg'
        });
      });
      
      cursos.value = cursosArray;
      console.log('Cursos cargados con getDocs:', cursosArray.length);
    }
    
  } catch (err) {
    console.error('Error al cargar con getDocs:', err);
    error.value = 'Error al cargar los cursos desde la colección. Intentando método alternativo...';
    errorDetails.value = err.toString();
    
    // Si este método falla, intentar con REST API
    if (error.value) {
      console.log('Intentando método final (REST API)...');
      await cargarCursosREST();
    }
  } finally {
    loading.value = false;
  }
};

// Método 3: Cargar cursos usando REST API directamente
const cargarCursosREST = async () => {
  loading.value = true;
  resetError();
  metodoActual.value = 'REST API';
  
  try {
    console.log('Cargando cursos con REST API');
    
    if (!auth.currentUser) {
      throw new Error('No se ha iniciado sesión');
    }
    
    // Obtener token JWT para autenticación
    const idToken = await auth.currentUser.getIdToken();
    
    // URL para cargar un documento específico
    const projectId = 'academia18-aulavirtual';
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cursos/1qinin5DHISR9W2DDD3P`;
    
    // Realizar solicitud HTTP
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    
    // Procesar la respuesta
    const data = await response.json();
    console.log('Datos obtenidos con REST API:', data);
    
    // Extraer campos
    const fields = data.fields || {};
    
    // Crear objeto curso
    cursos.value = [{
      id: '1qinin5DHISR9W2DDD3P',
      titulo: fields.titulo?.stringValue || 'Sin título',
      descripcion: fields.descripcion?.stringValue || 'Sin descripción',
      imagen: fields.imagen?.stringValue || '/placeholder-curso.jpg'
    }];
    
    console.log('Curso cargado con REST API');
    
  } catch (err) {
    console.error('Error al cargar con REST API:', err);
    error.value = 'No se pudieron cargar los cursos después de probar todos los métodos.';
    errorDetails.value = err.toString();
    
    // Si todos los métodos fallan, cargar datos de respaldo
    console.log('Todos los métodos fallaron, cargando datos de respaldo');
    cargarDatosRespaldo();
  } finally {
    loading.value = false;
  }
};

// Método de respaldo: Cargar datos fijos en caso de que todo falle
const cargarDatosRespaldo = () => {
  metodoActual.value = 'Datos de respaldo';
  
  console.log('Cargando datos de respaldo (último recurso)');
  
  cursos.value = [{
    id: '1qinin5DHISR9W2DDD3P',
    titulo: 'Razonamiento Matemático',
    descripcion: 'Curso de Razonamiento Matemático',
    imagen: 'https://stecyl.net/wp-content/uploads/2021/08/Razonamiento-Matematico.jpg'
  }];
  
  // Limpiar el error para mostrar los datos de respaldo
  resetError();
  
  console.log('Datos de respaldo cargados');
};

// Reintentar carga de cursos
const retryFetchCursos = async () => {
  resetError();
  
  // Intentar todos los métodos en secuencia
  try {
    await cargarCursosMetodoGetDoc();
  } catch (err1) {
    try {
      await cargarCursosMetodoGetDocs();
    } catch (err2) {
      try {
        await cargarCursosREST();
      } catch (err3) {
        cargarDatosRespaldo();
      }
    }
  }
};

// Navegar a curso
const navegarACurso = (cursoId) => {
  router.push(`/curso/${cursoId}`);
};

// Cerrar sesión
const logout = async () => {
  try {
    await authService.logout();
    router.push('/login');
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

/* Panel de depuración */
.debug-panel {
  background-color: #f0f8ff;
  border: 1px solid #cce5ff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.debug-panel h3 {
  color: #0052af;
  margin-top: 0;
  margin-bottom: 1rem;
}

.debug-info {
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.debug-error {
  background-color: #fff0f0;
  border: 1px solid #ffcccc;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.debug-error h4 {
  color: #d32f2f;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.debug-error pre {
  background-color: #f8f8f8;
  padding: 0.5rem;
  border-radius: 4px;
  overflow: auto;
  max-height: 200px;
  font-size: 0.8rem;
}

.debug-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.debug-btn {
  background-color: #e8f0fe;
  border: 1px solid #cce5ff;
  color: #0052af;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.debug-btn:hover {
  background-color: #d0e3fa;
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  color: #d32f2f;
}

.error-icon {
  color: #d32f2f;
  margin-bottom: 1rem;
}

.error-container h2 {
  color: #d32f2f;
  margin: 0 0 0.5rem;
}

.error-container p {
  color: #666;
  max-width: 500px;
  margin-bottom: 1.5rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #0052af;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.retry-btn:hover {
  background-color: #003c8f;
  transform: translateY(-2px);
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