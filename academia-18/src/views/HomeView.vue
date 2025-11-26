<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text" data-aos="fade-right" data-aos-duration="1000">
            <h1>
              Preparación
              de Excelencia
            </h1>
            <p class="subtitle">
              Formamos a los próximos Becarios y estudiantes universitarios con
              metodologías probadas y docentes especializados.
            </p>
            <div class="hero-buttons">
              <router-link to="/matriculate" class="btn-primary"
                >Matricúlate Ya</router-link
              >
              <a href="#video-section" class="btn-secondary">Ver Cursos</a>
            </div>
          </div>
          <div class="hero-image" data-aos="fade-left" data-aos-duration="1200">
            <img
              src="@/assets/img/NuevoBanner-min.png"
              alt="Estudiantes Academia"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="stat-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 20h9"></path>
                <path
                  d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                ></path>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">100%</div>
              <div class="stat-label">Material exclusivo y actualizado</div>
            </div>
          </div>

          <div class="stat-card" data-aos="zoom-in" data-aos-delay="400">
            <div class="stat-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">100%</div>
              <div class="stat-label">Docentes Especializados</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ciclo Section -->
    <section class="ciclo-section" id="ciclo-verano">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">
            Ciclo <span class="accent-text">VERANO</span> 2025
          </h2>
          <p class="section-subtitle">
            Prepárate con nosotros para alcanzar tus metas
          </p>
        </div>

        <div class="ciclo-grid">
          <div class="ciclo-info" data-aos="fade-right">
            <div class="info-header">
              <div class="info-badge">
                <span>Dirigido a:</span>
              </div>
              <p>
                Estudiantes que se encuentran cursando los últimos años de
                secundaria y deseen postular a
                <span class="highlight"
                  >COAR, Beca 18 y Beca Hijo de Docente</span
                >
                o quieran reforzar sus conocimientos y nivel académico.
              </p>
            </div>

            <div class="info-details">
              <div class="info-item">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <span>Inicio:</span>
                  <strong>21 de abril de 2025</strong>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <span>Fin:</span>
                  <strong>28 de noviembre de 2025</strong>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <span>Modalidad:</span>
                  <strong>Virtual</strong>
                </div>
              </div>

              <div class="info-item horarios">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <span>Horarios:</span>
                  <div class="horario-options">
                    <div class="horario-tag">
                      Grupo COAR → 6:30 p.m a 8:00 p.m
                    </div>
                    <div class="horario-tag">
                      Grupo BECA18 y BHD → 8:00 p.m a 9:30 p.m
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <router-link to="/matriculate" class="ciclo-cta"
              >Reserva Tu Vacante</router-link
            >
          </div>

          <div class="ciclo-video" data-aos="fade-left" id="video-section">
            <div class="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/hFPHCYIcmRs?si=NQ7V9oyRt0upZtdd"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              <div class="video-overlay">
                <button class="play-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
                <div class="video-caption">
                  <h3>Raz Matemático</h3>
                  <p>Prof. Billy Verde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cursos Section -->
    <section class="cursos-section" id="cursos">
      <div class="wave-container">
        <div class="waves"></div>
      </div>
      
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">
            Nuestros <span class="accent-text">Cursos</span>
          </h2>
          <p class="section-subtitle">
            Descubre nuestra variedad de cursos diseñados para maximizar tu
            éxito académico
          </p>
        </div>

        <div
          class="cursos-carousel-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="cursos-carousel" ref="cursosCarousel">
            <div
              v-for="(curso, index) in cursos"
              :key="index"
              class="curso-card"
              @click="openModal(curso)"
            >
              <div class="curso-icon">
                <component :is="curso.icon" />
              </div>
              <h3 class="curso-title">{{ curso.title }}</h3>
              <button class="curso-link">Ver más</button>
            </div>
          </div>

          <div class="carousel-indicators">
            <div
              v-for="(_, index) in Math.ceil(cursos.length / itemsVisible)"
              :key="index"
              class="indicator"
              :class="{ active: currentPage === index }"
              @click="goToPage(index)"
            ></div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <transition name="fade">
        <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
          <div class="modal-container">
            <button class="close-btn" @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 class="modal-title">{{ selectedCurso.title }}</h2>
            
            <div class="modal-video-container">
              <iframe 
                :src="selectedCurso.videoUrl"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            
            <div class="curso-descripcion">
              <p>{{ selectedCurso.descripcion }}</p>
            </div>
          </div>
        </div>
      </transition>

      <div class="shape-divider shape-bottom">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content" data-aos="zoom-in">
          <h2>¿Listo para iniciar tu camino al éxito universitario?</h2>
          <p>
            Únete ahora a nuestra academia y prepárate con los mejores
            profesores y métodos de enseñanza.
          </p>
          <router-link to="/matriculate" class="cta-button"
            >¡Matricúlate Hoy!</router-link
          >
        </div>
      </div>
      <div class="cta-shape"></div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, defineComponent, h } from "vue";

// Componentes SVG para los iconos
const VerbalIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M12 20h9' }),
      h('path', { d: 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' })
    ]);
  }
});

const MathReasoningIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('line', { x1: '8', y1: '12', x2: '16', y2: '12' }),
      h('line', { x1: '12', y1: '8', x2: '12', y2: '16' })
    ]);
  }
});

const ArithmeticIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
      h('polyline', { points: '12 5 19 12 12 19' })
    ]);
  }
});

const AlgebraIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z' })
    ]);
  }
});

const GeometryIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
      h('line', { x1: '3', y1: '9', x2: '21', y2: '9' }),
      h('line', { x1: '9', y1: '21', x2: '9', y2: '9' })
    ]);
  }
});

const TrigonometryIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M3 20h18L12 4z' })
    ]);
  }
});

const PhysicsIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '2' }),
      h('path', { d: 'M12 2v4' }),
      h('path', { d: 'M12 18v4' }),
      h('path', { d: 'm4.93 4.93 2.83 2.83' }),
      h('path', { d: 'm16.24 16.24 2.83 2.83' }),
      h('path', { d: 'M2 12h4' }),
      h('path', { d: 'M18 12h4' }),
      h('path', { d: 'm4.93 19.07 2.83-2.83' }),
      h('path', { d: 'm16.24 7.76 2.83-2.83' })
    ]);
  }
});

const ChemistryIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '40',
      height: '40',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M10 2v7.31' }),
      h('path', { d: 'M14 9.3V2' }),
      h('path', { d: 'M8.5 2h7' }),
      h('path', { d: 'M14 9.3a6.5 6.5 0 1 1-4 0' }),
      h('path', { d: 'M5.52 16h12.96' })
    ]);
  }
});

// Datos de cursos
const cursos = ref([
  {
    title: 'Razonamiento Verbal',
    icon: VerbalIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1',
    descripcion: 'Curso diseñado para desarrollar habilidades de comprensión lectora, análisis de textos, vocabulario y razonamiento crítico. Ideal para preparación de exámenes de admisión y desarrollo académico.'
  },
  {
    title: 'Razonamiento Matemático',
    icon: MathReasoningIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
    descripcion: 'Enfocado en desarrollar el pensamiento lógico-matemático para resolver problemas de manera eficiente. Incluye estrategias para series, analogías numéricas, problemas de lógica y razonamiento espacial.'
  },
  {
    title: 'Aritmética',
    icon: ArithmeticIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3',
    descripcion: 'Curso fundamental que abarca operaciones básicas, números naturales, enteros, racionales, decimales, proporcionalidad, porcentajes y aplicaciones prácticas para resolver problemas cotidianos.'
  },
  {
    title: 'Álgebra',
    icon: AlgebraIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_4',
    descripcion: 'Estudio de ecuaciones, polinomios, factorización y funciones algebraicas. Este curso proporciona las bases para el análisis matemático avanzado y es esencial en la preparación preuniversitaria.'
  },
  {
    title: 'Geometría',
    icon: GeometryIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_5',
    descripcion: 'Exploración de propiedades y relaciones de figuras en el plano y el espacio. Incluye geometría plana, del espacio, analítica y transformacional con enfoque en demostración de teoremas y resolución de problemas.'
  },
  {
    title: 'Trigonometría',
    icon: TrigonometryIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_6',
    descripcion: 'Estudio de las relaciones entre ángulos y lados de triángulos. Abarca funciones trigonométricas, identidades, ecuaciones y aplicaciones en diversos campos como física, ingeniería y navegación.'
  },
  {
    title: 'Física',
    icon: PhysicsIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_7',
    descripcion: 'Curso integrado que aborda principios fundamentales de física (mecánica, termodinámica, electricidad). Enfocado en aplicaciones prácticas y preparación para estudios superiores.'
  },
  {
    title: 'Química',
    icon: ChemistryIcon,
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_8',
    descripcion: 'Estudio de la estructura, propiedades y transformaciones de la materia. Abarca química orgánica, inorgánica, analítica y fisicoquímica con enfoque en experimentación y resolución de problemas.'
  }
]);

const modalOpen = ref(false);
const selectedCurso = ref({});
const currentPage = ref(0);
const itemsVisible = ref(4);
const cursosCarousel = ref(null);

// Responsive items visible
const updateItemsVisible = () => {
  const width = window.innerWidth;
  if (width < 576) {
    itemsVisible.value = 1;
  } else if (width < 768) {
    itemsVisible.value = 2;
  } else if (width < 992) {
    itemsVisible.value = 3;
  } else {
    itemsVisible.value = 4;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  if (cursosCarousel.value) {
    const cardWidth = cursosCarousel.value.querySelector('.curso-card').offsetWidth;
    const gap = 32;
    const scrollAmount = (cardWidth + gap) * itemsVisible.value * page;
    cursosCarousel.value.style.transform = `translateX(-${scrollAmount}px)`;
  }
};

const openModal = (curso) => {
  selectedCurso.value = curso;
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true });
  }

  updateItemsVisible();
  window.addEventListener('resize', updateItemsVisible);

  const playButton = document.querySelector(".play-button");
  const videoOverlay = document.querySelector(".video-overlay");

  if (playButton && videoOverlay) {
    playButton.addEventListener("click", () => {
      videoOverlay.style.opacity = "0";
      setTimeout(() => {
        videoOverlay.style.display = "none";
      }, 500);
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsVisible);
});
</script>

<style scoped>
/* Base Styles */
.home-view {
  font-family: "Poppins", sans-serif;
  color: #333;
  overflow-x: hidden;
}

:root {
  --primary-color: #0052af;
  --primary-light: rgba(0, 82, 175, 0.1);
  --accent-color: #8ffb8f;
  --text-dark: #333;
  --text-medium: #555;
  --text-light: #777;
  --white: #fff;
  --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 15px 30px rgba(0, 0, 0, 0.15);
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --transition: all 0.3s ease;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-medium);
  max-width: 700px;
  margin: 0 auto;
}

.accent-text {
  color: var(--primary-color);
  font-weight: 800;
}

/* Shape Dividers */
.shape-divider {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 1;
}

.shape-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 80px;
}

.shape-divider .shape-fill {
  fill: var(--white);
}

.shape-bottom {
  bottom: -1px;
  transform: rotate(180deg);
}

.shape-bottom .shape-fill {
  fill: var(--primary-light);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #0052af, #003d80);
  padding: 6rem 0 9rem;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.hero-text {
  flex: 1;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-text .subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: #fff;
  color: #0052af;
  font-weight: 600;
  padding: 0.9rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  font-weight: 600;
  padding: 0.9rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  max-width: 100%;
  border-radius: 1.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Stats Section */
.stats-section {
  padding: 4rem 0;
  background-color: #fff;
  position: relative;
  z-index: 2;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  border-bottom: 4px solid transparent;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-bottom: 4px solid #0052af;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background-color: rgba(0, 82, 175, 0.1);
  color: #0052af;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0052af;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #555;
  font-size: 1.1rem;
}

/* Ciclo Section */
.ciclo-section {
  padding: 6rem 0;
  background-color: rgba(0, 82, 175, 0.1);
}

.ciclo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  align-items: center;
}

.ciclo-info {
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

.info-header {
  margin-bottom: 2rem;
}

.info-badge {
  display: inline-block;
  background-color: #0052af;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
}

.info-badge span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.highlight {
  background-color: rgba(143, 251, 143, 0.3);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 600;
}

.info-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  background-color: rgba(0, 82, 175, 0.1);
  color: #0052af;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.info-item span {
  color: #777;
  display: block;
  margin-bottom: 0.3rem;
}

.info-item strong {
  color: #333;
  font-weight: 600;
}

.horarios {
  align-items: flex-start;
}

.horario-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.horario-tag {
  background-color: rgba(0, 82, 175, 0.1);
  color: #0052af;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
}

.ciclo-cta {
  display: inline-block;
  background-color: #0052af;
  color: #fff;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.ciclo-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.ciclo-video {
  position: relative;
}

.video-container {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.video-container iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 1rem;
  display: block;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.play-button {
  width: 80px;
  height: 80px;
  background-color: #0052af;
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background-color: #006ae0;
}

.video-caption {
  color: #fff;
  text-align: center;
}

.video-caption h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Cursos Section */
.cursos-section {
  padding: 6rem 0;
  position: relative;
  background-color: rgba(0, 82, 175, 0.02);
}

.wave-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.waves {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230052af08' fill-opacity='1' d='M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,176C840,203,960,245,1080,250.7C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  background-size: 1440px 320px;
  opacity: 1;
}

.cursos-carousel-container {
  position: relative;
  margin-top: 3rem;
  padding: 1rem 0;
  overflow: hidden;
}

.cursos-carousel {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
}

.curso-card {
  min-width: calc(25% - 1.5rem);
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.curso-card:hover {
  border-bottom: 4px solid #0052af;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.curso-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  color: #0052af;
  transition: all 0.3s ease;
}

.curso-card:hover .curso-icon {
  background: linear-gradient(135deg, #0052af 0%, #003d80 100%);
  color: white;
  transform: scale(1.1);
}

.curso-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.curso-link {
  display: inline-block;
  color: #0052af;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  font-family: inherit;
}

.curso-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #0052af;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

.curso-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: #0052af;
  width: 30px;
  border-radius: 10px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(0, 82, 175, 0.1);
  color: #0052af;
  transform: rotate(90deg);
}

.modal-title {
  color: #0052af;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  padding-right: 2rem;
}

.modal-video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin-bottom: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.curso-descripcion {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: left;
}

.curso-descripcion p {
  margin: 0;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #0052af, #003d80);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.cta-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background-color: #fff;
  color: #0052af;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.cta-shape {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  transform: skewX(-30deg) translateX(50%);
  z-index: 0;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .hero-text h1 {
    font-size: 3rem;
  }

  .curso-card {
    min-width: calc(33.333% - 1.33rem);
  }
}

@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
  }

  .hero-text {
    text-align: center;
    margin-bottom: 2rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .curso-card {
    min-width: calc(33.333% - 1.33rem);
  }

  .curso-icon {
    width: 90px;
    height: 90px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .cursos-section {
    padding: 4rem 0;
  }

  .curso-card {
    min-width: calc(50% - 1rem);
  }

  .curso-icon {
    width: 80px;
    height: 80px;
  }

  .curso-title {
    font-size: 1.1rem;
  }

  .modal-title {
    font-size: 1.6rem;
    padding-right: 3rem;
  }

  .modal-container {
    padding: 2rem;
  }

  .cta-content h2 {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .curso-card {
    min-width: 100%;
    padding: 2rem;
  }

  .cursos-section {
    padding: 3rem 0;
  }

  .modal-container {
    padding: 1.5rem;
    width: 95%;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  .curso-descripcion {
    font-size: 1rem;
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }

  .cta-button {
    width: 100%;
  }
}
</style>