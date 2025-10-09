<template>
  <div class="dashboard-container">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1>Aula Virtual VIP</h1>
        <div class="user-menu">
          <div class="user-email-container">
            <span class="user-name">{{ userEmail }}</span>
            <button
              @click="copiarCorreo"
              class="copy-email-btn"
              :title="'Copiar ' + userEmail"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                ></path>
              </svg>
            </button>
          </div>
          <span class="user-grupo">Grupo {{ grupoUsuario }}</span>
          <!-- Badge VIP si el usuario tiene acceso -->
          <div v-if="esUsuarioVip" class="vip-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path
                d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
              ></path>
              <path
                d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
              ></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            <span>VIP</span>
          </div>
          <button @click="logout" class="logout-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
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
        <p>Cargando tu aula virtual...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="fetchCursos" class="retry-btn">
          Intentar nuevamente
        </button>
      </div>

      <!-- Contenido principal VIP -->
      <div v-else class="dashboard-main-wrapper">
        <!-- USUARIO SIN ACCESO VIP -->
        <div v-if="!esUsuarioVip" class="vip-no-access-full">
          <div class="vip-no-access-card">
            <div class="vip-no-access-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"
                ></polygon>
              </svg>
            </div>
            <h2>Acceso VIP Requerido</h2>
            <p>
              El Aula Virtual está disponible solo para estudiantes VIP
              seleccionados. Contacta con tu instructor para más información
              sobre cómo obtener acceso a contenido exclusivo y materiales
              premium.
            </p>
            <button @click="solicitarAccesoVipWhatsApp" class="whatsapp-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"
                />
              </svg>
              <span>Solicitar Acceso VIP</span>
            </button>
          </div>
        </div>

        <!-- USUARIO CON ACCESO VIP -->
        <div v-else class="vip-content-wrapper">
          <!-- Banner bienvenida VIP -->

          <div v-if="gruposDisponibles.length > 1" class="grupos-switch">
            <div class="grupos-switch-content">
              <span class="grupos-switch-label">Cambiar Aula:</span>
              <div class="grupos-buttons">
                <button
                  v-for="grupo in gruposDisponibles"
                  :key="grupo.numero"
                  @click="
                    grupo.numero === 4 && !tieneAccesoRepaso
                      ? mostrarMensajeRepaso()
                      : cambiarGrupo(grupo.numero)
                  "
                  :class="[
                    'grupo-btn',
                    {
                      active: grupoActual === grupo.numero,
                      loading: loadingGrupos && grupoActual === grupo.numero,
                      'grupo-restringido':
                        grupo.numero === 4 && !tieneAccesoRepaso,
                    },
                  ]"
                  :disabled="loadingGrupos"
                >
                  <span
                    v-if="loadingGrupos && grupoActual === grupo.numero"
                    class="grupo-loading"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </span>
                  <span>{{ grupo.nombre }}</span>
                  <!-- NUEVO: Icono de candado para grupo restringido -->
                  <svg
                    v-if="grupo.numero === 4 && !tieneAccesoRepaso"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- Layout principal VIP -->
          <div class="main-content-layout">
            <!-- Grid combinado de cursos VIP y simulacro -->
            <div class="cursos-grid">
              <!-- VERSIÓN 1: RENDIR SIMULACRO (ACTIVA) -->
<!--
              <div
                class="curso-card curso-vip simulacro-vip-especial"
                @click="navegarASimulacroVip"
              >
                <div class="curso-imagen simulacro-vip-imagen">
                  <div class="curso-overlay"></div>
                  <div class="vip-badge-curso simulacro-vip-badge">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"
                      ></polygon>
                    </svg>
                    <span>04/10</span>
                  </div>
                </div>
                <div class="curso-info">
                  <h2>RENDIR SIMULACRO #5</h2>
                  <p>
                    Pon a prueba tus conocimientos con este simulacro exclusivo
                  </p>
                </div>
              </div>
-->
              <!-- VERSIÓN 2: VER RESULTADOS (COMENTADA)-->
              
              <div
                class="curso-card curso-vip simulacro-vip-especial simulacro-resultados"
                @click="navegarAResultadosVip"
              >
                <div class="curso-imagen simulacro-resultados-imagen">
                  <div class="curso-overlay"></div>
                  <div class="vip-badge-curso simulacro-resultados-badge">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon
                        points="6 2 18 2 22 6 22 18 18 22 6 22 2 18 2 6 6 2"
                      ></polygon>
                      <polyline points="6 12 10 16 18 8"></polyline>
                    </svg>
                    <span>RESULTADOS</span>
                  </div>
                </div>
                <div class="curso-info">
                  <h2>SIMULACRO #5 RESULTADOS</h2>
                  <p>Consulta tu ranking y desempeño en el simulacro VIP</p>
                </div>
              </div>

              <!-- Las tarjetas de curso VIP existentes -->
              <div
                v-for="curso in cursosVip"
                :key="curso.id"
                class="curso-card curso-vip"
                @click="navegarACursoVip(curso.id)"
              >
                <div
                  class="curso-imagen"
                  :style="{
                    backgroundImage: `url(${
                      curso.imagen || '/placeholder-curso.jpg'
                    })`,
                  }"
                >
                  <div class="curso-overlay"></div>
                  <div class="vip-badge-curso">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"
                      ></polygon>
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
            <!-- Botón Reto Diario -->

            <!-- Sidebar de materiales VIP -->
            <div class="materiales-sidebar materiales-vip">
              <div class="reto-diario-card">
                <button @click="navegarARetoDiario" class="reto-diario-btn">
                  
                  <div class="reto-content">
                    <h3>Reto Diario RV</h3>
                    <p>Practica y mejora en Razonamiento Verbal</p>
                  </div>
                  <div class="reto-arrow">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </button>
              </div>
              <h2 class="materiales-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"
                  ></polygon>
                </svg>
                <span>Materiales VIP</span>
              </h2>
              <div v-if="loadingMaterialesVip" class="materiales-loading">
                <div class="loading-spinner-small"></div>
                <p>Cargando materiales VIP...</p>
              </div>
              <div
                v-else-if="materialesVip.length === 0"
                class="materiales-empty"
              >
                <p>No hay materiales VIP disponibles.</p>
              </div>
              <div v-else class="materiales-list">
                <div
                  v-for="material in materialesVip"
                  :key="material.id"
                  class="material-item"
                >
                  <div
                    class="material-header"
                    @click="toggleMaterialVip(material.id)"
                    :class="{ active: materialVipActivo === material.id }"
                  >
                    <span class="material-title">{{ material.titulo }}</span>
                    <div class="material-toggle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div
                    v-if="materialVipActivo === material.id"
                    class="material-items"
                  >
                    <div v-if="material.items.length === 0" class="items-empty">
                      <p>No hay archivos disponibles.</p>
                    </div>
                    <div v-else class="items-list">
                      <div
                        v-for="item in material.items"
                        :key="item.id"
                        class="item-entry"
                      >
                        <div class="item-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            ></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                          <span>{{ item.titulo }}</span>
                        </div>
                        <button
                          @click="descargarMaterialVip(item)"
                          class="material-download-btn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                            ></path>
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
    </main>
  </div>
  <!-- Componente Toast -->
  <div v-if="toast.visible" class="toast-container" :class="toast.type">
    <div class="toast-message">
      <svg
        v-if="toast.type === 'error'"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <svg
        v-if="toast.type === 'info'"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <svg
        v-if="toast.type === 'success'"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { auth, db, authService } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const router = useRouter();
const route = useRoute();
// Toast
const toast = ref({
  visible: false,
  message: "",
  type: "info",
});

// Función para mostrar toast
const showToast = (message, type = "info") => {
  toast.value = {
    visible: true,
    message,
    type,
  };

  setTimeout(() => {
    toast.value.visible = false;
  }, 3000);
};

// Estados
const loading = ref(true);
const error = ref(null);
const userName = ref("");
const userEmail = ref("");
const tieneAccesoRepaso = ref(false);

// Estados VIP
const esUsuarioVip = ref(false);
const cursosVip = ref([]);
const materialesVip = ref([]);
const loadingMaterialesVip = ref(false);
const materialVipActivo = ref(null);

// Configuración de WhatsApp
const numeroWhatsApp = "51992322060"; // Número con código de país

// Estados para grupos
const gruposDisponibles = ref([]);
const grupoActual = ref(1);
const loadingGrupos = ref(false);
const grupoUsuario = ref(1);

// Verificar usuario al cargar
onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email;
      userName.value = user.email.split("@")[0];
      await verificarAccesoVip(user.email);
    } else {
      router.push("/aula-virtual");
    }
  });
});

// Watch para mantener el grupo seleccionado en localStorage
watch(grupoActual, (nuevoGrupo) => {
  if (esUsuarioVip.value) {
    localStorage.setItem("grupoSeleccionado", nuevoGrupo.toString());
  }
});

// Verificar acceso VIP
const verificarAccesoVip = async (userEmail) => {
  loading.value = true;
  error.value = null;

  try {
    const vipQuery = query(
      collection(db, "usuariosVip"),
      where("email", "==", userEmail),
      where("estado", "==", "activo")
    );
    const querySnapshot = await getDocs(vipQuery);

    if (!querySnapshot.empty) {
      esUsuarioVip.value = true;
      const userData = querySnapshot.docs[0].data();

      // Obtener datos del usuario
      const grupoDelUsuario = userData.grupo || 1;
      const tieneRepaso = userData.repaso === true;

      grupoUsuario.value = grupoDelUsuario;
      tieneAccesoRepaso.value = tieneRepaso;

      // MODIFICADO: Pasar ambos parámetros
      gruposDisponibles.value = obtenerGruposDisponibles(
        grupoDelUsuario,
        tieneRepaso
      );

      // Determinar qué grupo mostrar inicialmente
      const grupoGuardado = localStorage.getItem("grupoSeleccionado");
      let grupoInicial;

      if (grupoGuardado) {
        const grupoGuardadoNum = parseInt(grupoGuardado);
        const grupoDisponible = gruposDisponibles.value.find(
          (g) => g.numero === grupoGuardadoNum
        );
        grupoInicial = grupoDisponible ? grupoGuardadoNum : grupoDelUsuario;
      } else {
        grupoInicial = grupoDelUsuario;
      }

      grupoActual.value = grupoInicial;
      await cargarContenidoVip();
    } else {
      esUsuarioVip.value = false;
    }
  } catch (error) {
    console.error("Error al verificar acceso VIP:", error);
    esUsuarioVip.value = false;
    error.value = "Error al verificar tu acceso. Por favor, intenta de nuevo.";
  } finally {
    loading.value = false;
  }
};

const obtenerGruposDisponibles = (grupoUsuario, tieneRepaso) => {
  // Todos los grupos disponibles
  const todosLosGrupos = [
    {
      numero: 1,
      nombre: "Grupo 1",
      coleccionCursos: "cursosVip",
      coleccionMateriales: "materialesVip",
    },
    {
      numero: 2,
      nombre: "Grupo 2",
      coleccionCursos: "cursosVip2",
      coleccionMateriales: "materialesVip2",
    },
    {
      numero: 3,
      nombre: "Grupo 3",
      coleccionCursos: "cursosVip3",
      coleccionMateriales: "materialesVip3",
    },
    {
      numero: 4,
      nombre: "G. Repaso",
      coleccionCursos: "cursosVip4",
      coleccionMateriales: "materialesVip4",
    },
  ];

  // Si el usuario es del grupo 4, solo ver grupo 4
  if (grupoUsuario === 4) {
    return todosLosGrupos.filter((g) => g.numero === 4);
  }

  // Si el usuario es de grupo 1, 2 o 3: SIEMPRE mostrar todos los grupos
  // La restricción de acceso se maneja en el click del botón, no ocultando el botón
  return todosLosGrupos;
};

// Cargar contenido VIP
const cargarContenidoVip = async () => {
  try {
    const grupoSeleccionado = gruposDisponibles.value.find(
      (g) => g.numero === grupoActual.value
    );
    if (!grupoSeleccionado) return;

    const cursosVipRef = collection(db, grupoSeleccionado.coleccionCursos);
    const cursosVipSnapshot = await getDocs(cursosVipRef);
    const cursosVipArray = [];
    cursosVipSnapshot.forEach((doc) => {
      cursosVipArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    cursosVip.value = cursosVipArray.sort((a, b) => a.orden - b.orden);

    await fetchMaterialesVip();
  } catch (error) {
    console.error("Error al cargar contenido VIP:", error);
    error.value =
      "Error al cargar el contenido VIP. Por favor, intenta de nuevo.";
  }
};

const fetchMaterialesVip = async () => {
  loadingMaterialesVip.value = true;
  try {
    const grupoSeleccionado = gruposDisponibles.value.find(
      (g) => g.numero === grupoActual.value
    );
    if (!grupoSeleccionado) return;

    const materialesRef = collection(db, grupoSeleccionado.coleccionMateriales);
    const materialesSnapshot = await getDocs(materialesRef);

    const materialesArray = [];
    for (const materialDoc of materialesSnapshot.docs) {
      const itemsRef = collection(
        db,
        `${grupoSeleccionado.coleccionMateriales}/${materialDoc.id}/items`
      );
      const itemsSnapshot = await getDocs(itemsRef);

      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      materialesArray.push({
        id: materialDoc.id,
        ...materialDoc.data(),
        items,
      });
    }

    materialesVip.value = materialesArray;
  } catch (err) {
    console.error("Error al cargar materiales VIP:", err);
  } finally {
    loadingMaterialesVip.value = false;
  }
};

const cambiarGrupo = async (numeroGrupo) => {
  if (numeroGrupo === grupoActual.value) return;

  loadingGrupos.value = true;
  grupoActual.value = numeroGrupo;
  materialVipActivo.value = null; // Reset accordion

  try {
    await cargarContenidoVip();
  } catch (error) {
    console.error("Error al cambiar grupo:", error);
  } finally {
    loadingGrupos.value = false;
  }
};

// Función para reintentar cargar (para compatibilidad con el botón retry)
const fetchCursos = async () => {
  const user = auth.currentUser;
  if (user) {
    await verificarAccesoVip(user.email);
  }
};

const navegarACursoVip = (cursoId) => {
  // Guardar el grupo actual antes de navegar
  localStorage.setItem("grupoSeleccionado", grupoActual.value.toString());
  router.push(`/vip/grupo/${grupoActual.value}/curso/${cursoId}`);
};

const toggleMaterialVip = (materialId) => {
  if (materialVipActivo.value === materialId) {
    materialVipActivo.value = null;
  } else {
    materialVipActivo.value = materialId;
  }
};

const descargarMaterialVip = (item) => {
  if (!item.archivoUrl || item.archivoUrl.trim() === "") {
    alert("El archivo no está disponible en este momento.");
    return;
  }
  window.open(item.archivoUrl, "_blank");
};

const copiarCorreo = async () => {
  try {
    await navigator.clipboard.writeText(userEmail.value);
    showToast("Correo copiado al portapapeles", "success");
  } catch (err) {
    console.error("Error al copiar:", err);
    showToast("No se pudo copiar el correo", "error");
  }
};

const logout = async () => {
  try {
    // Limpiar el grupo guardado al cerrar sesión
    localStorage.removeItem("grupoSeleccionado");
    await authService.logout();
    router.push("/aula-virtual");
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
    alert("No se pudo cerrar sesión. Intenta de nuevo.");
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

  window.open(enlaceWhatsApp, "_blank");
};

const navegarASimulacroVip = () => {
  // Guardar grupo actual antes de navegar
  localStorage.setItem("grupoSeleccionado", grupoActual.value.toString());
  router.push("/simulacro-vip/simulacro5");
};

const navegarAResultadosVip = () => {
  // Guardar grupo actual antes de navegar
  localStorage.setItem("grupoSeleccionado", grupoActual.value.toString());
  router.push("/simulacro-vip/simulacro5/ranking");
};

// Función para obtener el texto del grupo del usuario para mostrar en la UI
const getTextoGrupoUsuario = () => {
  return `Grupo ${grupoUsuario.value}`;
};

const mostrarMensajeRepaso = () => {
  showToast("No tienes acceso al Grupo de Repaso", "info");
};

const navegarARetoDiario = () => {
  router.push("/vip/reto-diario");
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
  font-size: 0.9rem;
  word-break: break-all;
}

.user-email-container {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  max-width: 200px;
}

.copy-email-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #757575;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: 0.7;
  flex-shrink: 0;
}

.copy-email-btn:hover {
  background-color: rgba(0, 82, 175, 0.08);
  color: #0052af;
  opacity: 1;
}

.copy-email-btn:active {
  transform: scale(0.95);
}

.user-grupo {
  font-size: 0.8rem;
  color: #757575;
  font-weight: 400;
  white-space: nowrap;
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
  white-space: nowrap;
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
  white-space: nowrap;
}

.logout-btn:hover {
  background-color: rgba(0, 82, 175, 0.08);
}

.dashboard-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.dashboard-main-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
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

/* VIP SECTION - SIN ACCESO */
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
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
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
  background: #25d366;
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
  background: #20b660;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

/* VIP SECTION - CON ACCESO */
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

.main-content-layout {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.cursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  flex: 1;
  min-width: 0;
  max-width: 800px;
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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.5)
  );
}

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
  order: 2;
}

.materiales-vip {
  border: 2px solid #ffd700;
  background: linear-gradient(135deg, #fff9e6, #ffffff);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.1);
}

.materiales-title {
  color: #b8860b;
  font-size: 1.3rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ffd700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.materiales-vip .materiales-title svg {
  color: #ffd700;
}

.materiales-loading,
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
  background-color: #fffacd;
  cursor: pointer;
  transition: all 0.2s;
}

.material-header:hover {
  background-color: #fff8dc;
}

.material-header.active {
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
  border: 1px solid #ffd700;
  color: #b8860b;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.material-download-btn:hover {
  background-color: #ffd700;
  color: #333;
}

/* Estilos para VERSIÓN 1: RENDIR SIMULACRO (rojo) */
.simulacro-vip-especial .curso-imagen {
  background: linear-gradient(135deg, #f57070 0%, #a24b4f 50%, #350502 100%);
  position: relative;
  overflow: hidden;
}

.simulacro-vip-especial .curso-imagen::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -10%;
  width: 200px;
  height: 200px;
  background: #dc2626;
  opacity: 0.2;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  z-index: 2;
}

.simulacro-vip-especial .curso-imagen::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 150px;
  height: 150px;
  background: #ef4444;
  opacity: 0.15;
  border-radius: 50%;
  animation: float 8s ease-in-out infinite reverse;
  z-index: 2;
}

.simulacro-vip-especial .simulacro-vip-badge {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.5px;
  padding: 6px 10px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 3px 10px rgba(255, 215, 0, 0.4);
  text-transform: uppercase;
}

.simulacro-vip-especial .curso-info h2 {
  color: #dc2626;
  font-weight: 700;
  text-align: center;
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
}

.simulacro-vip-especial .curso-info p {
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #666;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.simulacro-vip-especial:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(255, 215, 0, 0.3);
}

.simulacro-vip-especial:hover .curso-info h2 {
  color: #b91c1c;
}

/* Estilos para VERSIÓN 2: VER RESULTADOS (verde) */
.simulacro-resultados .curso-imagen {
  background: linear-gradient(
    135deg,
    #10b981 0%,
    #059669 50%,
    #065f46 100%
  ) !important;
}

.simulacro-resultados .curso-imagen::before {
  background: #16a34a !important;
}

.simulacro-resultados .curso-imagen::after {
  background: #22c55e !important;
}

.simulacro-resultados .simulacro-resultados-badge {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.5px;
  padding: 6px 10px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 3px 10px rgba(255, 215, 0, 0.4);
  text-transform: uppercase;
}

.simulacro-resultados .curso-info h2 {
  color: #16a34a !important;
}

.simulacro-resultados:hover {
  box-shadow: 0 16px 32px rgba(16, 185, 129, 0.3) !important;
}

.simulacro-resultados:hover .curso-info h2 {
  color: #15803d !important;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

.grupos-switch {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

.grupos-switch-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.grupos-switch-label {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
  white-space: nowrap;
}

.grupos-buttons {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.grupo-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  min-height: 44px;
}

.grupo-btn:hover:not(:disabled) {
  border-color: #ffd700;
  background: #fffacd;
  color: #b8860b;
  transform: translateY(-1px);
}

.grupo-btn.active {
  border-color: #ffd700;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #333;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.grupo-btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.grupo-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.grupo-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.grupo-loading svg {
  animation: spin 1s linear infinite;
}

.grupo-btn.grupo-restringido {
  opacity: 0.6;
  cursor: not-allowed;
  position: relative;
}

.grupo-btn.grupo-restringido:hover {
  transform: none;
  border-color: #e0e0e0;
  background: white;
}

/* Toast */
.toast-container {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.8rem 1.5rem;
  min-width: 250px;
  max-width: 80%;
  animation: fadeIn 0.3s;
  opacity: 0.95;
}

.toast-container.error {
  border-left: 4px solid #f44336;
}

.toast-container.info {
  border-left: 4px solid #2196f3;
}

.toast-container.success {
  border-left: 4px solid #4caf50;
}

.toast-message {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.toast-message svg {
  flex-shrink: 0;
}

.toast-container.error svg {
  color: #f44336;
}

.toast-container.info svg {
  color: #2196f3;
}

.toast-container.success svg {
  color: #4caf50;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }

  to {
    opacity: 0.95;
    transform: translate(-50%, 0);
  }
}

/* Responsive */
@media (max-width: 900px) {
  .dashboard-main-wrapper,
  .main-content-layout {
    flex-direction: column;
  }

  .materiales-sidebar {
    width: 100%;
    max-width: 100%;
    order: 2;
  }

  .cursos-grid {
    max-width: 100%;
    order: 1;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 650px) {
  .dashboard-header {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .header-content h1 {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
  }

  .user-menu {
    flex-wrap: nowrap;
    gap: 0.8rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .user-email-container {
    flex: 1;
    max-width: none;
    min-width: 0;
  }

  .user-name {
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .copy-email-btn {
    padding: 0.25rem;
    flex-shrink: 0;
  }

  .user-grupo {
    flex-shrink: 0;
  }

  .vip-badge {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    flex-shrink: 0;
  }

  .logout-btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .logout-btn span {
    display: none;
  }

  .dashboard-content {
    padding: 0 1rem;
    margin: 1.5rem auto;
  }

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

  .grupos-switch-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .grupos-buttons {
    width: 100%;
    justify-content: center;
  }

  .grupo-btn {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }

  .simulacro-vip-especial .curso-info h2,
  .simulacro-resultados .curso-info h2 {
    font-size: 1.1rem;
  }

  .simulacro-vip-especial .curso-info p,
  .simulacro-resultados .curso-info p {
    font-size: 0.8rem;
  }

  .toast-container {
    width: 85%;
    padding: 0.7rem 1rem;
    bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .vip-welcome-banner {
    padding: 1.5rem;
  }

  .vip-no-access-card {
    padding: 1.5rem;
  }

  .vip-no-access-full {
    padding: 1rem;
  }

  .user-email-container {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
    flex: 0 1 auto;
  }
}

.reto-diario-card {
  margin-bottom: 1.5rem;
}

.reto-diario-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.reto-diario-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.reto-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  flex-shrink: 0;
}

.reto-content {
  flex: 1;
  text-align: left;
}

.reto-content h3 {
  margin: 0 0 0.3rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
}

.reto-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
}

.reto-arrow {
  color: white;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .reto-diario-card {
    margin-bottom: 1rem;
  }
}
</style>
