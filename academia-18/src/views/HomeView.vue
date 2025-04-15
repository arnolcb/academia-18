<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text" data-aos="fade-right" data-aos-duration="1000">
            <h1>Preparación <!--<span class="accent-text">Preuniversitaria</span>--> de Excelencia</h1>
            <p class="subtitle">Formamos a los próximos Becarios y estudiantes universitarios con metodologías probadas y docentes especializados.</p>
            <div class="hero-buttons">
              <router-link to="/matriculate" class="btn-primary">Matricúlate Ya</router-link>
              <a href="#video-section" class="btn-secondary">Ver Cursos</a>
            </div>
          </div>
          <div class="hero-image" data-aos="fade-left" data-aos-duration="1200">
            <img src="@/assets/img/NuevoBanner.png" alt="Estudiantes Academia" />
          </div>
        </div>
      </div>
      <!--
      <div class="shape-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>
      </div>-->
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">100%</div>
              <div class="stat-label">Material exclusivo y actualizado</div>
            </div>
          </div>
          <!--
          <div class="stat-card" data-aos="zoom-in" data-aos-delay="100">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">95%</div>
              <div class="stat-label">Tasa de Ingreso</div>
            </div>
          </div>
          
          <div class="stat-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">2,500+</div>
              <div class="stat-label">Estudiantes</div>
            </div>
          </div>
-->
          <div class="stat-card" data-aos="zoom-in" data-aos-delay="400">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <h2 class="section-title">Ciclo <span class="accent-text">VERANO</span> 2025</h2>
          <p class="section-subtitle">Prepárate con nosotros para alcanzar tus metas</p>
        </div>
        
        <div class="ciclo-grid">
          <div class="ciclo-info" data-aos="fade-right">
            <div class="info-header">
              <div class="info-badge">
                <span>Dirigido a:</span>
              </div>
              <p>Estudiantes que se encuentran cursando los últimos años de secundaria y deseen postular a <span class="highlight">COAR, Beca 18 y Beca Hijo de Docente</span> o quieran reforzar sus conocimientos y nivel académico.</p>
            </div>
            
            <div class="info-details">
              <div class="info-item">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"></path>
                  </svg>
                </div>
                <div>
                  <span>Modalidad:</span>
                  <strong>Virtual</strong>
                </div>
              </div>
              
              <div class="info-item horarios">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <span>Horarios:</span>
                  <div class="horario-options">
                    <div class="horario-tag">Grupo COAR → 6:30 p.m a 8:00 p.m</div>
                    <div class="horario-tag">Grupo BECA18 y BHD → 8:00 p.m a 9:30 p.m</div>
                  </div>
                </div>
              </div>
            </div>
            
            <router-link to="/matriculate" class="ciclo-cta">Reserva Tu Vacante</router-link>
          </div>
          
          <div class="ciclo-video" data-aos="fade-left" id="video-section">
            <div class="video-container">
              <iframe 
                src="https://www.youtube.com/embed/EXAMPLE" 
                title="Video promocional de Academia 18" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              <div class="video-overlay">
                <button class="play-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
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
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Nuestros <span class="accent-text">Cursos</span></h2>
          <p class="section-subtitle">Descubre nuestra variedad de cursos diseñados para maximizar tu éxito académico</p>
        </div>
        
        <div class="cursos-carousel-container" data-aos="fade-up" data-aos-delay="200">
          <div class="cursos-carousel" ref="cursosCarousel">
            <div v-for="(curso, index) in cursos" :key="index" class="curso-card">
              <div class="curso-logo">
                <img :src="curso.logo" :alt="curso.title" />
              </div>
              <h3 class="curso-title">{{ curso.title }}</h3>
              <router-link :to="'/cursos'" class="curso-link">Ver más</router-link>
            </div>
          </div>
          
          <div class="carousel-indicators">
            <div v-for="(_, index) in Math.ceil(cursos.length / itemsVisible)" :key="index" 
                 class="indicator" 
                 :class="{ active: currentPage === index }"
                 @click="goToPage(index)">
            </div>
          </div>
        </div>
      </div>
      <div class="shape-divider shape-bottom">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>
      </div>
    </section>
    
    <!-- Testimonios Section 
    <section class="testimonios-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Lo que dicen nuestros <span class="accent-text">Estudiantes</span></h2>
          <p class="section-subtitle">Conoce las experiencias de quienes ya alcanzaron sus metas con nosotros</p>
        </div>
        
        <div class="testimonios-slider" ref="testimoniosSlider" data-aos="fade-up" data-aos-delay="200">
          <div v-for="(testimonio, index) in testimonios" :key="index" class="testimonio-card">
            <div class="testimonio-quote">"</div>
            <p class="testimonio-text">{{ testimonio.text }}</p>
            <div class="testimonio-author">
              <div class="author-avatar">
                <img :src="testimonio.avatar" :alt="testimonio.name" />
              </div>
              <div class="author-info">
                <h4>{{ testimonio.name }}</h4>
                <p>{{ testimonio.university }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    -->
    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content" data-aos="zoom-in">
          <h2>¿Listo para iniciar tu camino al éxito universitario?</h2>
          <p>Únete ahora a nuestra academia y prepárate con los mejores profesores y métodos de enseñanza.</p>
          <router-link to="/matriculate" class="cta-button">¡Matricúlate Hoy!</router-link>
        </div>
      </div>
      <div class="cta-shape"></div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Datos de cursos
const cursos = ref([
  { title: 'Razonamiento Matemático', logo: '/icons/math-reasoning.svg' },
  { title: 'Razonamiento Verbal', logo: '/icons/verbal.svg' },
  { title: 'Aritmética', logo: '/icons/arithmetic.svg' },
  { title: 'Álgebra', logo: '/icons/algebra.svg' },
  { title: 'Geometría', logo: '/icons/geometry.svg' },
  { title: 'Trigonometría', logo: '/icons/trigonometry.svg' },
  { title: 'Física', logo: '/icons/physics-chemistry.svg' },
  { title: 'Química', logo: '/icons/chemistry.svg' }
]);

// Datos de testimonios
const testimonios = ref([
  {
    text: 'La metodología de enseñanza es excepcional, los profesores explican de manera clara y didáctica. Gracias a su apoyo, logré ingresar a la carrera de mis sueños.',
    name: 'María Fernández',
    university: 'Universidad Nacional de Ingeniería',
    avatar: '/img/testimonials/student1.jpg'
  },
  {
    text: 'El material educativo y los simulacros de examen fueron clave para mi preparación. La academia me brindó todas las herramientas necesarias para superar el examen de admisión.',
    name: 'Carlos Mendoza',
    university: 'Universidad Nacional Mayor de San Marcos',
    avatar: '/img/testimonials/student2.jpg'
  },
  {
    text: 'Estudiar en esta academia fue definitivamente la mejor decisión. Los profesores tienen una forma única de hacer que temas complejos sean fáciles de entender.',
    name: 'Ana Rodríguez',
    university: 'Universidad Peruana Cayetano Heredia',
    avatar: '/img/testimonials/student3.jpg'
  }
]);

// Referencias para los carruseles
const cursosCarousel = ref(null);
const testimoniosSlider = ref(null);

// Variables para el carrusel de cursos
const currentPage = ref(0);
const itemsVisible = ref(4);
const isDragging = ref(false);
const startPos = ref(0);
const currentTranslate = ref(0);
const prevTranslate = ref(0);
const animationID = ref(null);

// Responsive items visible
const updateItemsVisible = () => {
  if (window.innerWidth < 600) {
    itemsVisible.value = 1;
  } else if (window.innerWidth < 900) {
    itemsVisible.value = 2;
  } else if (window.innerWidth < 1200) {
    itemsVisible.value = 3;
  } else {
    itemsVisible.value = 4;
  }
};

// Cálculo de páginas totales
const totalPages = computed(() => {
  return Math.ceil(cursos.value.length / itemsVisible.value);
});

// Función para ir a una página específica
const goToPage = (pageIndex) => {
  if (pageIndex >= 0 && pageIndex < totalPages.value) {
    currentPage.value = pageIndex;
    updateCarouselPosition();
  }
};

// Actualizar posición del carrusel
const updateCarouselPosition = () => {
  if (!cursosCarousel.value) return;
  
  const cardWidth = cursosCarousel.value.querySelector('.curso-card').offsetWidth;
  const gap = parseInt(getComputedStyle(cursosCarousel.value).columnGap);
  const offset = currentPage.value * (cardWidth * itemsVisible.value + gap * (itemsVisible.value - 1));
  
  prevTranslate.value = -offset;
  currentTranslate.value = -offset;
  
  setSliderPosition();
};

// Set position for slider
const setSliderPosition = () => {
  if (!cursosCarousel.value) return;
  cursosCarousel.value.style.transform = `translateX(${currentTranslate.value}px)`;
};

// Touch events for cursos carousel
const touchStart = (e) => {
  if (!cursosCarousel.value) return;
  
  const touch = e.type === 'touchstart' ? e.touches[0] : e;
  isDragging.value = true;
  startPos.value = touch.clientX;
  
  cancelAnimationFrame(animationID.value);
  
  document.addEventListener('touchmove', touchMove, { passive: false });
  document.addEventListener('touchend', touchEnd);
  document.addEventListener('mousemove', touchMove);
  document.addEventListener('mouseup', touchEnd);
};

const touchMove = (e) => {
  if (!isDragging.value) return;
  
  const touch = e.type === 'touchmove' ? e.touches[0] : e;
  const currentPosition = touch.clientX;
  const movedBy = currentPosition - startPos.value;
  
  currentTranslate.value = prevTranslate.value + movedBy;
  setSliderPosition();
  
  // Prevent page scroll
  if (e.type === 'touchmove') {
    e.preventDefault();
  }
};

const touchEnd = () => {
  isDragging.value = false;
  const movedBy = currentTranslate.value - prevTranslate.value;
  
  // Determine if slide changed
  if (movedBy < -100 && currentPage.value < totalPages.value - 1) {
    currentPage.value += 1;
  } else if (movedBy > 100 && currentPage.value > 0) {
    currentPage.value -= 1;
  }
  
  updateCarouselPosition();
  
  document.removeEventListener('touchmove', touchMove);
  document.removeEventListener('touchend', touchEnd);
  document.removeEventListener('mousemove', touchMove);
  document.removeEventListener('mouseup', touchEnd);
};

// Inicialización y limpieza
onMounted(() => {
  // Inicializar AOS (simulado, deberías importar AOS)
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }
  
  // Configurar para responsive
  updateItemsVisible();
  window.addEventListener('resize', () => {
    updateItemsVisible();
    updateCarouselPosition();
  });
  
  // Set up touch events for carousel
  if (cursosCarousel.value) {
    cursosCarousel.value.addEventListener('touchstart', touchStart, { passive: true });
    cursosCarousel.value.addEventListener('mousedown', touchStart);
    cursosCarousel.value.addEventListener('dragstart', (e) => e.preventDefault());
  }
  
  // Configurar slider de testimonios (simulado, usa una librería como Swiper en producción)
  if (testimoniosSlider.value) {
    // Aquí se configuraría Swiper u otra librería de sliders
  }
  
  // Video overlay click handler
  const playButton = document.querySelector('.play-button');
  const videoOverlay = document.querySelector('.video-overlay');
  
  if (playButton && videoOverlay) {
    playButton.addEventListener('click', () => {
      videoOverlay.style.opacity = '0';
      setTimeout(() => {
        videoOverlay.style.display = 'none';
      }, 500);
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsVisible);
  
  if (cursosCarousel.value) {
    cursosCarousel.value.removeEventListener('touchstart', touchStart);
    cursosCarousel.value.removeEventListener('mousedown', touchStart);
  }
  
  document.removeEventListener('touchmove', touchMove);
  document.removeEventListener('touchend', touchEnd);
  document.removeEventListener('mousemove', touchMove);
  document.removeEventListener('mouseup', touchEnd);
  
  cancelAnimationFrame(animationID.value);
});
</script>

<style scoped>
/* Base Styles */
.home-view {
  font-family: 'Poppins', sans-serif;
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

.hero-text .accent-text {
  color: #8ffb8f;
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
}

.cursos-carousel-container {
  position: relative;
  margin-top: 3rem;
  padding: 1rem 0;
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
}

.curso-card:hover {
  
  border-bottom: 4px solid #0052af;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.curso-logo {
  width: 80px;
  height: 80px;
  background-color: rgba(0, 82, 175, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
}

.curso-logo img {
  width: 40px;
  height: 40px;
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
}

.curso-link::after {
  content: '';
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

/* Testimonios Section */
.testimonios-section {
  padding: 6rem 0;
  background-color: #fff;
}

.testimonios-slider {
  display: flex;
  gap: 2rem;
  overflow-x: scroll;
  padding: 2rem 0;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
}

.testimonios-slider::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.testimonio-card {
  min-width: 350px;
  flex: 0 0 350px;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  position: relative;
  scroll-snap-align: center;
}

.testimonio-quote {
  font-size: 5rem;
  color: #0052af;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 1rem;
  line-height: 1;
}

.testimonio-text {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.testimonio-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.3rem;
}

.author-info p {
  font-size: 0.9rem;
  color: #777;
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
    min-width: calc(50% - 1rem);
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
  
  .curso-card {
    min-width: 100%;
  }
  
  .testimonio-card {
    min-width: 300px;
    flex: 0 0 300px;
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
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
  
  .cta-button {
    width: 100%;
  }
}</style>