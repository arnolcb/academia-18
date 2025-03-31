<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <div class="text-content">
          <h1 class="title">Ciclo VERANO</h1>
          <p class="subtitle">Prepárate con nosotros para el futuro.</p>
          <RouterLink to="/matriculate" class="cta-button">Matricúlate ya</RouterLink>
        </div>
        <div class="image-container">
          <img src="@/assets/img/CICLOVERANO.webp" alt="Estudiante Ciclo Verano" class="student-image" />
        </div>
      </div>
    </section>

    <!-- Detalles del Curso -->
    <section class="course-details">
      <div class="container grid">
        <!-- Información -->
        <div class="info-box">
          <ul class="info-list">
            <li class="info-header"><strong>Dirigido a estudiantes que se encuentran cursando los últimos años de secundaria y deseen postular a <span class="beca-text">Beca 18</span> o iniciar su preparación pre-universitaria</strong></li>
            <li><strong>Inicio:</strong> 31 de marzo de 2025</li>
            <li><strong>Fin:</strong> 5 de marzo de 2025</li>
            <li><strong>Modalidad:</strong> Virtual</li>
            <li><strong>Turnos: Lunes a Viernes</strong>
              <ul class="horarios-list">
                <li><span class="horario-icon morning"></span>Mañana: 8:00 a.m. - 1:00 p.m.</li>
                <li><span class="horario-icon afternoon"></span>Tarde: 2:00 p.m. - 7:00 p.m.</li>
                <li><span class="horario-icon night"></span>Noche: 5:00 p.m. - 10:00 p.m.</li>
              </ul>
            </li>
            <li class="more-info"><a href="#">Más información</a></li>
          </ul>
        </div>
        
        <!-- Video -->
        <div class="video-box">
          <div class="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/EXAMPLE"
              class="video"
              title="Video de preparación académica"
              allowfullscreen
            ></iframe>
            <div class="play-button">
              <span class="play-icon"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Hero Section */
.hero {
  background-color: #0056b3; /* Azul principal, ajustado para coincidir con la imagen */
  color: #ffffff;
  padding: 3rem 0;
  overflow: hidden;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.text-content {
  max-width: 500px;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 400;
}

.cta-button {
  background-color: white;
  color: #0056b3;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  background-color: #f2f2f2;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.student-image {
  max-width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
  z-index: 2;
}

/* Detalles del Curso */
.course-details {
  padding: 5rem 2rem;
  background-color: #ffffff;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: flex-start;
}

.info-box,
.video-box {
  background: #ffffff;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.info-list li {
  margin-bottom: 1.2rem;
  line-height: 1.6;
}

.info-header {
  font-size: 1.1rem;
  margin-bottom: 1.5rem !important;
  line-height: 1.5 !important;
}

/* Estilo especial para Beca 18 */
.beca-text {
  font-family: 'Panton','bold';
  font-weight: bold;
  /*
  
  color: #0056b3;
  position: relative;
  display: inline-block;
  */
}

/* Estilos para los iconos de horarios */
.horarios-list {
  list-style: none;
  padding: 0.5rem 0 0.5rem 1rem;
  margin: 0.75rem 0;
}

.horarios-list li {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
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
  margin-top: 1.5rem;
}

.more-info a {
  color: #0056b3;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.more-info a:hover {
  color: #003d80;
  text-decoration: underline;
}

.video-wrapper {
  position: relative;
  width: 100%;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.video {
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
}

.play-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0 15px 25px;
  border-color: transparent transparent transparent #ffffff;
  margin-left: 5px;
}

/* Responsive */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .hero-content {
    min-height: 360px;
  }
  
  .video-wrapper {
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
}

@media (max-width: 767px) {
  .hero {
    padding: 2rem 0;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .student-image {
    max-width: 250px;
    margin-top: 1.5rem;
  }
  
  .course-details {
    padding: 3rem 1.5rem;
  }
  
  .cta-button {
    padding: 0.7rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .student-image {
    max-width: 200px;
  }
}
</style>