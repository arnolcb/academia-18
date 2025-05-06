<!-- src/views/AboutUsView.vue -->
<template>
  <div class="about-us-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Sobre Nosotros</h1>
        <p class="hero-subtitle">Conoce a Academia 18</p>
      </div>
    </section>

    <!-- Misión Section -->
    <section class="mission-section">
      <div class="content-wrapper">
        <div class="mission-content">
          <h2>Nuestra Misión</h2>
          <p class="mission-text">
            Somos un grupo de docentes que tenemos la misión de llevar una educación de calidad a todos los lugares del país, 
            nuestras clases son exclusivas para los postulantes a BECA18 y Beca Hijo de Docentes, así como también para todos 
            aquellos que deseen elevar su nivel en matemáticas y ciencias.
          </p>
        </div>
        <div class="mission-icon">
          <!-- Icono SVG de diana/objetivo (similar a tu imagen) -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="mission-svg">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" fill="#0052af"/>
            <path d="M256 128C185.3 128 128 185.3 128 256s57.33 128 128 128c70.64 0 128-57.3 128-128S326.6 128 256 128zM256 336c-44.11 0-80-35.89-80-80c0-44.11 35.89-80 80-80c44.11 0 80 35.89 80 80C336 300.1 300.1 336 256 336z" fill="#0052af"/>
            <path d="M256 224C238.3 224 224 238.3 224 256s14.33 32 32 32c17.67 0 32-14.33 32-32S273.7 224 256 224z" fill="#0052af"/>
            <path d="M470.6 0L336 134.6l36.69 36.69L506.6 37.37c7.031-7.031 6.953-18.12-.1562-25.25C499.2-1.177 477.6-7.219 470.6 0z" fill="#0052af"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Visión Section (Nueva sección) -->
    <section class="vision-section">
      <div class="content-wrapper">
        <div class="vision-icon">
          <!-- Icono SVG de visión -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="vision-svg">
            <path d="M288 144a110.94 110.94 0 0 0-31.24 5a55.4 55.4 0 0 1 7.24 27a56 56 0 0 1-56 56a55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z" fill="#0052af"/>
            <path d="M288 256a63.93 63.93 0 0 0 44.51-18.07 54.44 54.44 0 0 1-8.51-18.07A32.09 32.09 0 0 1 352 184a31.47 31.47 0 0 1 20-29.25 59.94 59.94 0 0 0-11.94-2.6A64 64 0 1 0 288 256z" fill="#0052af"/>
          </svg>
        </div>
        <div class="vision-content">
          <h2>Nuestra Visión</h2>
          <p class="vision-text">
            Aspiramos a ser reconocidos como la institución líder en preparación académica para becas gubernamentales, 
            transformando la vida de miles de estudiantes a través de una educación de excelencia que les permita desarrollar 
            su máximo potencial y contribuir al desarrollo de nuestro país.
          </p>
        </div>
      </div>
    </section>

    <!-- Valores Section -->
    <section class="values-section">
      <div class="content-wrapper">
        <h2>Nuestros Valores</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3>Accesibilidad</h3>
            <p>Creemos que una educación de calidad debe estar al alcance de todos, independientemente de su ubicación geográfica o condición socioeconómica.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3>Excelencia</h3>
            <p>Nos comprometemos a ofrecer la más alta calidad educativa, con metodologías actualizadas y docentes altamente calificados.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Comunidad</h3>
            <p>Fomentamos un entorno de aprendizaje colaborativo donde estudiantes y docentes crecen juntos a través del conocimiento compartido.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>Compromiso</h3>
            <p>Nos dedicamos a apoyar a cada estudiante en su camino hacia el éxito académico, proporcionando las herramientas y el apoyo necesarios.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Llamado a la acción -->
    <section class="cta-section">
      <div class="content-wrapper">
        <div class="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nuestra comunidad académica y prepárate para alcanzar tus metas</p>
          <RouterLink to="/matriculate" class="cta-button">
            Matricúlate Ahora
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.about-us-container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  background-color: #0052af;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.2;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-section h1 {
  font-size: 3.5rem;
  margin: 0 0 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 300;
}

/* Mission Section */
.mission-section {
  padding: 5rem 2rem;
  background-color: #fff;
}

.mission-section .content-wrapper {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.mission-content {
  flex: 1;
}

.mission-icon {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mission-svg {
  width: 200px;
  height: 200px;
  filter: drop-shadow(0 10px 15px rgba(0, 82, 175, 0.2));
}

.mission-content h2 {
  font-size: 2.5rem;
  color: #0052af;
  margin-bottom: 1.5rem;
}

.mission-text {
  font-size: 1.25rem;
  line-height: 1.7;
}

/* Vision Section */
.vision-section {
  padding: 5rem 2rem;
  background-color: #f0f7ff;
}

.vision-section .content-wrapper {
  display: flex;
  align-items: center;
  gap: 4rem;
  flex-direction: row-reverse;
}

.vision-content {
  flex: 1;
}

.vision-icon {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vision-svg {
  width: 200px;
  height: 200px;
  filter: drop-shadow(0 10px 15px rgba(0, 82, 175, 0.2));
}

.vision-content h2 {
  font-size: 2.5rem;
  color: #0052af;
  margin-bottom: 1.5rem;
}

.vision-text {
  font-size: 1.25rem;
  line-height: 1.7;
}

/* Values Section */
.values-section {
  padding: 5rem 2rem;
  background-color: #fff;
}

.values-section h2 {
  font-size: 2.5rem;
  color: #0052af;
  text-align: center;
  margin-bottom: 3rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background-color: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.value-icon {
  color: #0052af;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.value-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #0052af;
}

.value-card p {
  color: #555;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: 4rem 2rem;
  background-color: #0052af;
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background-color: white;
  color: #0052af;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .mission-section .content-wrapper,
  .vision-section .content-wrapper {
    flex-direction: column;
    gap: 3rem;
  }
  
  .mission-icon, 
  .vision-icon {
    order: -1;
  }
  
  .mission-svg,
  .vision-svg {
    width: 250px;
    height: 250px;
  }
  
  .hero-section h1 {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 2rem;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .mission-section, 
  .vision-section,
  .values-section,
  .cta-section {
    padding: 4rem 1.5rem;
  }
  
  .mission-content h2,
  .vision-content h2,
  .values-section h2,
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .mission-text,
  .vision-text {
    font-size: 1.1rem;
  }
  
  .mission-svg,
  .vision-svg {
    width: 200px;
    height: 200px;
  }
  
  .cta-section p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 3.5rem 1.5rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .content-wrapper {
    padding: 0 1.5rem;
  }
  
  .mission-section, 
  .vision-section,
  .values-section,
  .cta-section {
    padding: 3rem 1rem;
  }
  
  .mission-content h2,
  .vision-content h2,
  .values-section h2,
  .cta-section h2 {
    font-size: 1.75rem;
  }
  
  .mission-svg,
  .vision-svg {
    width: 180px;
    height: 180px;
  }
  
  .value-card {
    padding: 1.5rem;
  }
  
  .cta-button {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
}
</style>