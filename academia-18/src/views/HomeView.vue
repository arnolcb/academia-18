<template>
  <div class="home-view">
    <!-- Banner principal -->
    <section class="main-banner">
      <div class="banner-content">
        <div class="banner-text">
          <h1>Ciclo<span class="destacado"> VERANO</span></h1>
          <p class="subtitle">Prepárate con nosotros para el futuro.</p>
          <router-link to="/matriculate" class="enrollment-btn">Matricúlate ya!</router-link>
        </div>
        <div class="banner-image">
          <img src="@/assets/img/CICLOVERANO.webp" alt="Estudiante Ciclo Verano" class="student-image" />
        </div>
      </div>
    </section>

    <!-- Información del ciclo y video -->
    <section class="cycle-content">
      <div class="container">
        <div class="content-grid">
          <!-- Columna de información -->
          <div class="info-column">
            <p class="info-intro">
              <strong>Dirigido a estudiantes que se encuentran cursando los últimos años de secundaria y deseen postular a <span class="beca-text">Beca 18</span> o iniciar su preparación pre-universitaria</strong>
            </p>
            
            <div class="info-details">
              <div class="info-group">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div class="info-text">
                  <span>Inicio</span>
                  <strong>14 de abril de 2025</strong>
                </div>
              </div>
              
              <div class="info-group">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div class="info-text">
                  <span>Fin de ciclo</span>
                  <strong>28 de noviembre de 2025</strong>
                </div>
              </div>
              
              <div class="info-group">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div class="info-text">
                  <span>Modalidad</span>
                  <strong>Virtual</strong>
                </div>
              </div>
              
              <div class="info-group">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div class="info-text">
                  <span>Horarios</span>
                  <div class="horarios-list">
                    <div class="horario-item">
                      <span class="horario-icon morning"></span>

                      <span>Tarde → 4:30 p.m a 6:00 p.m</span>
                    </div>
                    <div class="horario-item">
                      <span class="horario-icon night"></span>
                      <span>Noche → 6:45 p.m a 8:15 p.m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="more-info">
              <a href="#">Más Información</a>
            </div>
          </div>
          
          <!-- Columna de video -->
          <div class="video-column">
            <div class="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/EXAMPLE"
                class="video-frame"
                title="Video de presentación de la academia"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div class="play-button">
                <span class="play-icon"></span>
              </div>
            </div>
            <div class="video-info">
              <h3>GEOMETRÍA</h3>
              <p>Prof. Victor Tello</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cursos Carrusel -->
    <section class="courses-section">
      <div class="container">
        <h2 class="section-title">
          <span class="title-text">Cursos</span>
        </h2>
        
        <div class="carousel-container">
          <button class="carousel-button prev" @click="slidePrev">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="carousel-track" ref="carouselTrack">
            <div class="course-card" v-for="(course, index) in courses" :key="index">
              <div class="course-image">
                <img src="@/assets/img/Logo_A18_v1.png" alt="Academia 18" class="academy-logo" />
              </div>
              <div class="course-info">
                <h3>{{ course.title }}</h3>
                <p>{{ course.description }}</p>
              </div>
            </div>
          </div>
          
          <button class="carousel-button next" @click="slideNext">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        <div class="carousel-dots">
          <button 
            v-for="(_, index) in Math.ceil(courses.length / itemsPerView)" 
            :key="index" 
            class="dot" 
            :class="{ active: currentPage === index }"
            @click="goToPage(index)"
          ></button>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">
          <span class="title-text">Testimonios</span>
        </h2>
        
        <div class="testimonial-container">
          <div class="testimonial-image">
            <img src="@/assets/img/estudiante-testimonio.png" alt="Testimonio de estudiante" />
          </div>
          <div class="testimonial-content">
            <p>"La academia me ayudó enormemente en mi preparación para Beca 18. Los profesores son excelentes y explican de manera clara y didáctica. Gracias a su apoyo, logré obtener un puntaje sobresaliente en el examen de admisión."</p>
            <div class="testimonial-author">
              <strong>María Fernández</strong>
              <span>Ingresante a Universidad Nacional de Ingeniería</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// Datos de cursos
const courses = ref([
  { title: 'RAZ. MATEMÁTICO', description: 'Álgebra y Aritmética' },
  { title: 'RAZ. MATEMÁTICO', description: 'Álgebra y Geometría' },
  { title: 'RAZ. MATEMÁTICO', description: 'Geometría y Trigonometría' },
  { title: 'LENGUAJE', description: 'Comprensión lectora' },
  { title: 'FÍSICA', description: 'Cinemática y Dinámica' },
  { title: 'QUÍMICA', description: 'Química orgánica e inorgánica' }
]);

// Configuración del carrusel
const carouselTrack = ref(null);
const currentIndex = ref(0);
const itemsPerView = ref(3);
const currentPage = ref(0);

// Calcular items por vista según el ancho de la pantalla
onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', updateItemsPerView);
});

const updateItemsPerView = () => {
  if (window.innerWidth >= 1200) {
    itemsPerView.value = 3;
  } else if (window.innerWidth >= 768) {
    itemsPerView.value = 2;
  } else {
    itemsPerView.value = 1;
  }
  // Actualizar la página actual si es necesario
  if (currentIndex.value >= courses.value.length) {
    currentIndex.value = Math.max(0, courses.value.length - itemsPerView.value);
  }
  currentPage.value = Math.floor(currentIndex.value / itemsPerView.value);
};

// Funciones de navegación del carrusel
const slideNext = () => {
  if (currentIndex.value + itemsPerView.value < courses.value.length) {
    currentIndex.value += itemsPerView.value;
    currentPage.value = Math.floor(currentIndex.value / itemsPerView.value);
    updateCarouselPosition();
  }
};

const slidePrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value = Math.max(0, currentIndex.value - itemsPerView.value);
    currentPage.value = Math.floor(currentIndex.value / itemsPerView.value);
    updateCarouselPosition();
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  currentIndex.value = page * itemsPerView.value;
  updateCarouselPosition();
};

const updateCarouselPosition = () => {
  const trackElement = carouselTrack.value;
  if (trackElement) {
    const cardWidth = trackElement.querySelector('.course-card').offsetWidth;
    const gap = 16; // gap entre cards en px
    trackElement.style.transform = `translateX(-${currentIndex.value * (cardWidth + gap)}px)`;
  }
};
</script>

<style scoped>
.home-view {
  font-family: 'Poppins', 'Arial', sans-serif;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}

/* Banner principal */
.main-banner {
  background-color: #0052af;
  border-radius: 1.5rem;
  overflow: hidden;
  margin: 2rem auto;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.banner-text {
  width: 50%;
  padding: 2rem;
}

.banner-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: white;
}

.destacado {
  color: #8ffb8f;
  display: block;
  font-size: 4rem;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 400;
}

.enrollment-btn {
  background-color: white;
  color: #0052af;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  display: inline-block;
}

.enrollment-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.banner-image {
  width: 45%;
  display: flex;
  justify-content: center;
  position: relative;
}

.student-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

/* Contenido: Información y Video */
.cycle-content {
  margin: 3rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* Columna de información */
.info-column {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.info-intro {
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.beca-text {
  font-weight: bold;
  color: #0052af;
}

.info-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.info-group {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-icon {
  color: #0052af;
  margin-top: 3px;
}

.info-text {
  display: flex;
  flex-direction: column;
}

.info-text span {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.info-text strong {
  color: #333;
  font-weight: 600;
}

.horarios-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.horario-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.horario-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
}

.morning {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z'/%3E%3C/svg%3E") no-repeat center center;
  background-size: contain;
}

.afternoon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z'/%3E%3Cpath d='M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z'/%3E%3C/svg%3E") no-repeat center center;
  background-size: contain;
}

.night {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z'/%3E%3C/svg%3E") no-repeat center center;
  background-size: contain;
}

.more-info {
  margin-top: 2rem;
  text-align: right;
}

.more-info a {
  color: #0052af;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.more-info a:hover {
  color: #003d80;
  text-decoration: underline;
}

/* Columna de video */
.video-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.video-wrapper {
  position: relative;
  width: 100%;
  background-color: #000;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.video-frame {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background-color: rgba(255, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  transition: transform 0.3s ease;
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.play-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0 15px 25px;
  border-color: transparent transparent transparent #ffffff;
  margin-left: 5px;
}

.video-info {
  padding: 1rem;
}

.video-info h3 {
  font-size: 1.5rem;
  color: #0052af;
  margin-bottom: 0.5rem;
}

.video-info p {
  color: #555;
  font-size: 1rem;
}

/* Sección de títulos estilizados */
.section-title {
  position: relative;
  margin-bottom: 3rem;
  text-align: center;
  color: #0052af;
  font-size: 2rem;
  font-weight: 700;
}

.title-text {
  position: relative;
  background-color: white;
  padding: 0 1.5rem;
  z-index: 1;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 2px;
  background-color: #0052af;
  z-index: 0;
}

/* Carrusel de cursos */
.courses-section {
  margin: 5rem 0;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  overflow: hidden;
  width: 100%;
  transition: transform 0.5s ease;
}

.course-card {
  min-width: calc(33.333% - 0.667rem);
  flex: 0 0 auto;
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.course-image {
  background-color: #0052af;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.academy-logo {
  width: 80px;
  height: auto;
}

.course-info {
  padding: 1.5rem;
  text-align: center;
}

.course-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.course-info p {
  color: #666;
  font-size: 0.9rem;
}

.carousel-button {
  background-color: white;
  border: 1px solid #eaeaea;
  color: #0052af;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.carousel-button:hover {
  background-color: #0052af;
  color: white;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #d1d1d1;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #0052af;
  transform: scale(1.2);
}

/* Testimonios */
.testimonials-section {
  margin: 5rem 0;
}

.testimonial-container {
  display: flex;
  align-items: center;
  gap: 3rem;
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.testimonial-image {
  width: 30%;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.testimonial-image img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.testimonial-content {
  width: 70%;
  padding: 2rem;
  color: #555;
  line-height: 1.6;
}

.testimonial-author {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
}

.testimonial-author strong {
  font-size: 1.1rem;
  color: #333;
}

.testimonial-author span {
  font-size: 0.9rem;
  color: #666;
}

/* Responsive */
@media (max-width: 1200px) {
  .course-card {
    min-width: calc(50% - 0.5rem);
  }
}

@media (max-width: 992px) {
  .banner-text h1 {
    font-size: 3rem;
  }
  
  .destacado {
    font-size: 3.5rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .main-banner {
    padding: 1.5rem 1rem;
  }
  
  .banner-content {
    flex-direction: column-reverse;
  }
  
  .banner-text, .banner-image {
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }
  
  .course-card {
    min-width: 100%;
  }
  
  .testimonial-container {
    flex-direction: column;
  }
  
  .testimonial-image, .testimonial-content {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .banner-text h1 {
    font-size: 2.5rem;
  }
  
  .destacado {
    font-size: 2.8rem;
  }
  
  .enrollment-btn {
    font-size: 1rem;
    padding: 0.7rem 1.5rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .carousel-button {
    width: 35px;
    height: 35px;
  }
}
</style>