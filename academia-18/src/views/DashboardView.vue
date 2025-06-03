<template>
  <div class="dashboard-container">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1>Mis Cursos</h1>
        <div class="user-menu">
          <span class="user-name">{{ userName }}</span>
          <!-- Badge VIP si el usuario tiene acceso -->
          <div v-if="esUsuarioVip" class="vip-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            <span>VIP</span>
          </div>
          <button @click="logout" class="logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

      <!-- Dashboard principal -->
      <div v-else class="dashboard-main-wrapper">
        <!-- Tabs de navegación -->
        <div class="tabs-container">
          <button 
            @click="activeTab = 'regular'" 
            :class="['tab-button', { 'active': activeTab === 'regular' }]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>Cursos Regulares</span>
          </button>
          
          <!-- PESTAÑA VIP SIEMPRE VISIBLE -->
          <button 
            @click="activeTab = 'vip'" 
            :class="['tab-button', 'tab-vip', { 'active': activeTab === 'vip' }]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Aula VIP</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </button>
        </div>

        <!-- Contenido de Cursos Regulares -->
        <div v-if="activeTab === 'regular'" class="tab-content">
          <div class="main-content-layout">
            <div class="cursos-grid">
              <!-- Tarjeta de resultados existente -->
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

              <!-- Cursos regulares existentes -->
              <div v-for="curso in cursosRegulares" :key="curso.id" class="curso-card" @click="navegarACurso(curso.id)">
                <div class="curso-imagen" :style="{ backgroundImage: `url(${curso.imagen || '/placeholder-curso.jpg'})` }">
                  <div class="curso-overlay"></div>
                </div>
                <div class="curso-info">
                  <h2>{{ curso.titulo }}</h2>
                  <p>{{ curso.descripcion }}</p>
                </div>
              </div>
            </div>

            <!-- Sidebar de materiales regulares -->
            <div class="materiales-sidebar">
              <h2 class="materiales-title">Materiales</h2>
              <div v-if="loadingMateriales" class="materiales-loading">
                <div class="loading-spinner-small"></div>
                <p>Cargando materiales...</p>
              </div>
              <div v-else-if="errorMateriales" class="materiales-error">
                <p>{{ errorMateriales }}</p>
                <button @click="fetchMateriales" class="retry-btn small">Reintentar</button>
              </div>
              <div v-else-if="materialesRegulares.length === 0" class="materiales-empty">
                <p>No hay materiales disponibles.</p>
              </div>
              <div v-else class="materiales-list">
                <div v-for="material in materialesRegulares" :key="material.id" class="material-item">
                  <div class="material-header" @click="toggleMaterial(material.id)" :class="{ 'active': materialActivo === material.id }">
                    <span class="material-title">{{ material.titulo }}</span>
                    <div class="material-toggle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                          <span>{{ item.titulo }}</span>
                        </div>
                        <button @click="descargarMaterial(item)" class="material-download-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          </div>
        </div>

        <!-- Contenido del Aula VIP - COMPLETAMENTE REDISEÑADO -->
        <div v-if="activeTab === 'vip'" class="tab-content">
          <!-- USUARIO SIN ACCESO VIP -->
          <div v-if="!esUsuarioVip" class="vip-no-access-full">
            <div class="vip-no-access-card">
              <div class="vip-no-access-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h2>Acceso VIP Requerido</h2>
              <p>El Aula VIP está disponible solo para estudiantes seleccionados. Contacta con tu instructor para más información sobre cómo obtener acceso a contenido exclusivo y materiales premium.</p>
              <button @click="solicitarAccesoVipWhatsApp" class="whatsapp-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                </svg>
                <span>Solicitar Acceso VIP</span>
              </button>
            </div>
          </div>

          <!-- USUARIO CON ACCESO VIP - MISMA ESTRUCTURA QUE REGULAR -->
          <div v-else class="vip-content-wrapper">
            <!-- Banner bienvenida VIP (opcional pero elegante) -->
            <div class="vip-welcome-banner">
              <div class="vip-welcome-content">
                <div class="vip-welcome-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div class="vip-welcome-text">
                  <h2>¡Bienvenido al Aula VIP!</h2>
                  <p>Accede a contenido exclusivo y materiales premium diseñados especialmente para ti.</p>
                </div>
              </div>
            </div>

            <!-- Layout principal VIP - EXACTAMENTE IGUAL QUE REGULAR -->
            <div class="main-content-layout">
              <!-- Grid de cursos VIP -->
              <div class="cursos-grid">
                <div v-for="curso in cursosVip" :key="curso.id" class="curso-card curso-vip" @click="navegarACursoVip(curso.id)">
                  <div class="curso-imagen" :style="{ backgroundImage: `url(${curso.imagen || '/placeholder-curso.jpg'})` }">
                    <div class="curso-overlay"></div>
                    <div class="vip-badge-curso">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span>VIP</span>
                    </div>
                  </div>
                  <div class="curso-info">
                    <h2>{{ curso.titulo }}</h2>
                    <p>{{ curso.descripcion }}</p>
                  </div>
                </div>
              </div>

              <!-- Sidebar de materiales VIP -->
              <div class="materiales-sidebar materiales-vip">
                <h2 class="materiales-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Materiales VIP</span>
                </h2>
                <div v-if="loadingMaterialesVip" class="materiales-loading">
                  <div class="loading-spinner-small"></div>
                  <p>Cargando materiales VIP...</p>
                </div>
                <div v-else-if="materialesVip.length === 0" class="materiales-empty">
                  <p>No hay materiales VIP disponibles.</p>
                </div>
                <div v-else class="materiales-list">
                  <div v-for="material in materialesVip" :key="material.id" class="material-item">
                    <div class="material-header" @click="toggleMaterialVip(material.id)" :class="{ 'active': materialVipActivo === material.id }">
                      <span class="material-title">{{ material.titulo }}</span>
                      <div class="material-toggle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                    <div v-if="materialVipActivo === material.id" class="material-items">
                      <div v-if="material.items.length === 0" class="items-empty">
                        <p>No hay archivos disponibles.</p>
                      </div>
                      <div v-else class="items-list">
                        <div v-for="item in material.items" :key="item.id" class="item-entry">
                          <div class="item-info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <span>{{ item.titulo }}</span>
                          </div>
                          <button @click="descargarMaterialVip(item)" class="material-download-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
            </div>
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

// Estados existentes
const cursosRegulares = ref([]);
const loading = ref(true);
const error = ref(null);
const userName = ref('');
const activeTab = ref('regular');

// Estados VIP
const esUsuarioVip = ref(false);
const cursosVip = ref([]);
const materialesVip = ref([]);
const loadingMaterialesVip = ref(false);
const materialVipActivo = ref(null);

// Estados de materiales regulares
const materialesRegulares = ref([]);
const loadingMateriales = ref(true);
const errorMateriales = ref(null);
const materialActivo = ref(null);

// Configuración de WhatsApp
const numeroWhatsApp = "51916963262"; 

// Verificar usuario al cargar
onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userName.value = user.email.split('@')[0];
      await Promise.all([
        fetchCursos(),
        fetchMateriales(),
        verificarAccesoVip(user.email)
      ]);
    } else {
      router.push('/aula-virtual');
    }
  });
});

// Verificar acceso VIP
const verificarAccesoVip = async (userEmail) => {
  try {
    const vipQuery = query(
      collection(db, 'usuariosVip'),
      where('email', '==', userEmail),
      where('estado', '==', 'activo')
    );
    const querySnapshot = await getDocs(vipQuery);
    
    esUsuarioVip.value = !querySnapshot.empty;
    
    if (esUsuarioVip.value) {
      await cargarContenidoVip();
    }
  } catch (error) {
    console.error('Error al verificar acceso VIP:', error);
    esUsuarioVip.value = false;
  }
};

// Cargar contenido VIP
const cargarContenidoVip = async () => {
  try {
    const cursosVipRef = collection(db, 'cursosVip');
    const cursosVipSnapshot = await getDocs(cursosVipRef);
    const cursosVipArray = [];
    cursosVipSnapshot.forEach((doc) => {
      cursosVipArray.push({
        id: doc.id,
        ...doc.data()
      });
    });
    cursosVip.value = cursosVipArray;

    await fetchMaterialesVip();
  } catch (error) {
    console.error('Error al cargar contenido VIP:', error);
  }
};

const fetchMaterialesVip = async () => {
  loadingMaterialesVip.value = true;
  try {
    const materialesRef = collection(db, 'materialesVip');
    const materialesSnapshot = await getDocs(materialesRef);

    const materialesArray = [];
    for (const materialDoc of materialesSnapshot.docs) {
      const itemsRef = collection(db, `materialesVip/${materialDoc.id}/items`);
      const itemsSnapshot = await getDocs(itemsRef);

      const items = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      materialesArray.push({
        id: materialDoc.id,
        ...materialDoc.data(),
        items
      });
    }

    materialesVip.value = materialesArray;
  } catch (err) {
    console.error('Error al cargar materiales VIP:', err);
  } finally {
    loadingMaterialesVip.value = false;
  }
};

const fetchCursos = async () => {
  loading.value = true;
  error.value = null;

  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No se ha iniciado sesión');
    }

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
    error.value = 'No se pudieron cargar tus cursos. Por favor, intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};

const fetchMateriales = async () => {
  loadingMateriales.value = true;
  errorMateriales.value = null;

  try {
    const materialesRef = collection(db, 'materiales');
    const materialesSnapshot = await getDocs(materialesRef);

    const materialesArray = [];
    for (const materialDoc of materialesSnapshot.docs) {
      const itemsRef = collection(db, `materiales/${materialDoc.id}/items`);
      const itemsSnapshot = await getDocs(itemsRef);

      const items = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      materialesArray.push({
        id: materialDoc.id,
        ...materialDoc.data(),
        items
      });
    }

    materialesRegulares.value = materialesArray;
  } catch (err) {
    console.error('Error al cargar materiales:', err);
    errorMateriales.value = 'No se pudieron cargar los materiales.';
  } finally {
    loadingMateriales.value = false;
  }
};

const navegarAResultados = () => {
  router.push('/simulacro/simulacro2/ranking');
};

const navegarACurso = (cursoId) => {
  router.push(`/curso/${cursoId}`);
};

const navegarACursoVip = (cursoId) => {
  //router.push(`/curso/${cursoId}`);
  router.push(`/vip/curso/${cursoId}`);
};

const toggleMaterial = (materialId) => {
  if (materialActivo.value === materialId) {
    materialActivo.value = null;
  } else {
    materialActivo.value = materialId;
  }
};

const toggleMaterialVip = (materialId) => {
  if (materialVipActivo.value === materialId) {
    materialVipActivo.value = null;
  } else {
    materialVipActivo.value = materialId;
  }
};

const descargarMaterial = (item) => {
  if (!item.archivoUrl || item.archivoUrl.trim() === '') {
    alert('El archivo no está disponible en este momento.');
    return;
  }
  window.open(item.archivoUrl, '_blank');
};

const descargarMaterialVip = (item) => {
  if (!item.archivoUrl || item.archivoUrl.trim() === '') {
    alert('El archivo no está disponible en este momento.');
    return;
  }
  window.open(item.archivoUrl, '_blank');
};

const logout = async () => {
  try {
    await authService.logout();
    router.push('/aula-virtual');
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
    alert('No se pudo cerrar sesión. Intenta de nuevo.');
  }
};

// Función de WhatsApp
const solicitarAccesoVipWhatsApp = () => {
  const mensaje = `¡Hola! 👋

Me interesa obtener acceso al *Aula VIP* de Academia18.

Mi email registrado es: ${auth.currentUser?.email}

¿Podrían brindarme más información?`;

  const mensajeCodificado = encodeURIComponent(mensaje);
  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
  
  window.open(enlaceWhatsApp, '_blank');
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

.tabs-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 12px;
  width: fit-content;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: #666;
}

.tab-button:hover {
  background-color: rgba(0, 82, 175, 0.1);
  color: #0052af;
}

.tab-button.active {
  background-color: white;
  color: #0052af;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-vip.active {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
}

.dashboard-main-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.tab-content {
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  min-height: 50vh;
}

.error-container {
  color: #d32f2f;
}

.loading-spinner,
.loading-spinner-small {
  width: 25px;
  height: 25px;
  border: 2px solid rgba(0, 82, 175, 0.1);
  border-top: 2px solid #0052af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 0.5rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border-width: 3px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* VIP SECTION - SIN ACCESO REDISEÑADA */
.vip-no-access-full {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem;
}

.vip-no-access-card {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.vip-no-access-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ffd700, #ffb347, #ffd700);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.vip-no-access-icon {
  color: #ffd700;
  margin-bottom: 1.5rem;
}

.vip-no-access-card h2 {
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.vip-no-access-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.whatsapp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: #25D366;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.whatsapp-btn:hover {
  background: #20B660;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

/* LAYOUT PRINCIPAL - COMPARTIDO ENTRE REGULAR Y VIP */
.main-content-layout {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.tab-content {
  width: 100%;
}

.cursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  flex: 1;
  min-width: 0;
  max-width: 800px;
  /* ORDEN PARA RESPONSIVE */
  order: 1;
}

.materiales-sidebar {
  width: 300px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  align-self: flex-start;
  height: fit-content;
  /* ORDEN PARA RESPONSIVE */
  order: 2;
}

/* VIP SECTION - CON ACCESO - LAYOUT ARREGLADO */
.vip-content-wrapper {
  width: 100%;
}

.vip-welcome-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.vip-welcome-banner::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -10%;
  width: 200px;
  height: 200px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 50%;
}

.vip-welcome-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.vip-welcome-icon {
  color: #ffd700;
  flex-shrink: 0;
}

.vip-welcome-text h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.vip-welcome-text p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.cursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  flex: 1;
  min-width: 0;
  max-width: 800px;
  /* ORDEN PARA RESPONSIVE */
  order: 1;
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

/* CURSOS VIP - MEJORADOS */
.curso-vip {
  border: 2px solid #ffd700;
  position: relative;
  background: linear-gradient(135deg, #fff9e6, #ffffff);
}

.curso-vip:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(255, 215, 0, 0.2);
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

/* BADGE VIP MEJORADO */
.vip-badge-curso {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.5px;
  padding: 6px 10px;
  border-radius: 16px;
  z-index: 2;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 3px 10px rgba(255, 215, 0, 0.4);
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

.materiales-sidebar {
  width: 300px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  align-self: flex-start;
  height: fit-content;
}

/* SIDEBAR VIP MEJORADO */
.materiales-vip {
  border: 2px solid #ffd700;
  background: linear-gradient(135deg, #fff9e6, #ffffff);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.1);
}

.materiales-title {
  color: #0052af;
  font-size: 1.3rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.materiales-vip .materiales-title {
  color: #b8860b;
  border-bottom-color: #ffd700;
}

.materiales-vip .materiales-title svg {
  color: #ffd700;
}

.materiales-loading,
.materiales-error,
.materiales-empty {
  text-align: center;
  padding: 1rem;
  color: #757575;
  font-size: 0.9rem;
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

.materiales-vip .material-header {
  background-color: #fffacd;
}

.materiales-vip .material-header:hover {
  background-color: #fff8dc;
}

.materiales-vip .material-header.active {
  background-color: #fff8dc;
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

.materiales-vip .material-download-btn {
  border-color: #ffd700;
  color: #b8860b;
}

.materiales-vip .material-download-btn:hover {
  background-color: #ffd700;
  color: #333;
}

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

.simulacro-info {
  padding: 1.5rem;
}

.simulacro-info h2 {
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
}

.simulacro-info p {
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

.retry-btn.small {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
}

/* Responsive Design - ORDEN CORREGIDO */
@media (max-width: 900px) {
  .dashboard-main-wrapper,
  .main-content-layout {
    flex-direction: column;
  }

  .materiales-sidebar {
    width: 100%;
    max-width: 100%;
    /* MATERIALES VA ABAJO EN RESPONSIVE */
    order: 2;
  }

  .cursos-grid {
    max-width: 100%;
    /* CURSOS VA ARRIBA EN RESPONSIVE */
    order: 1;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 650px) {
  .dashboard-content {
    padding: 0 1rem;
    margin: 1.5rem auto;
  }

  .tabs-container {
    width: 100%;
    flex-direction: column;
  }

  .tab-button {
    justify-content: center;
  }

  /* AQUÍ SÍ va a 1 columna en móviles pequeños */
  .cursos-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .vip-welcome-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .vip-welcome-text h2 {
    font-size: 1.4rem;
  }

  .vip-welcome-banner {
    padding: 1.5rem;
  }

  .vip-no-access-card {
    padding: 2rem;
  }

  .vip-no-access-card h2 {
    font-size: 1.5rem;
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

  .vip-welcome-banner {
    padding: 1.5rem;
  }

  .vip-no-access-card {
    padding: 1.5rem;
  }

  .vip-no-access-full {
    padding: 1rem;
  }
}
</style>