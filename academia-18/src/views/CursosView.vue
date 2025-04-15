<template>
  <section class="cursos-section">
    <div class="wave-container">
      <div class="waves"></div>
    </div>
    
    <h1 class="cursos-title">CURSOS</h1>
    
    <div class="cursos-grid">
      <div v-for="(curso, index) in cursos" :key="index" 
           class="curso-card" 
           @click="openModal(curso)">
        <div class="curso-icon">
          <component :is="curso.icon" />
        </div>
        <h3 class="curso-title">{{ curso.title }}</h3>
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
          
          <div class="video-container">
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
  </section>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue';

// Componentes SVG para los iconos
const VerbalIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '32',
      height: '32',
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
      width: '32',
      height: '32',
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
      width: '32',
      height: '32',
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
      width: '32',
      height: '32',
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
      width: '32',
      height: '32',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M3 3h7v7H3z' }),
      h('path', { d: 'M14 3h7v7h-7z' }),
      h('path', { d: 'M14 14h7v7h-7z' }),
      h('path', { d: 'M3 14h7v7H3z' })
    ]);
  }
});

const TrigonometryIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '32',
      height: '32',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M2 18L9 3l4 8 3-6 6 13H2z' })
    ]);
  }
});

const PhysicsIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '32',
      height: '32',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '1' }),
      h('path', { d: 'M8.56 3.69a9 9 0 0 0-2.92 1.95' }),
      h('path', { d: 'M3.69 8.56A9 9 0 0 0 3 12' }),
      h('path', { d: 'M3.69 15.44a9 9 0 0 0 1.95 2.92' }),
      h('path', { d: 'M8.56 20.31A9 9 0 0 0 12 21' }),
      h('path', { d: 'M15.44 20.31a9 9 0 0 0 2.92-1.95' }),
      h('path', { d: 'M20.31 15.44A9 9 0 0 0 21 12' }),
      h('path', { d: 'M20.31 8.56a9 9 0 0 0-1.95-2.92' }),
      h('path', { d: 'M15.44 3.69A9 9 0 0 0 12 3' })
    ]);
  }
});

const ChemistryIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '32',
      height: '32',
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
      h('path', { d: 'M14 9.3a6.5 6.5 0 1 1-4 0' })
    ]);
  }
});

const modalOpen = ref(false);
const selectedCurso = ref({});

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

const openModal = (curso) => {
  selectedCurso.value = curso;
  modalOpen.value = true;
  document.body.style.overflow = 'hidden'; // Prevenir scroll del body
};

const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = 'auto'; // Restaurar scroll
};
</script>

<style scoped>
/* Contenedor principal */
.cursos-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

/* Ondas en el fondo - similar al formulario */
.wave-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.waves {
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230052af15' fill-opacity='1' d='M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,176C840,203,960,245,1080,250.7C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3Cpath fill='%230052af10' fill-opacity='1' d='M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,117.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  background-size: 1440px 320px;
  opacity: 0.8;
}

/* Título principal */
.cursos-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #0052af;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

/* Grid de cursos */
.cursos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

/* Tarjetas de curso */
.curso-card {
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  position: relative;
  overflow: hidden;
}

.curso-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #0052af, #0077ff);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.curso-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 82, 175, 0.1);
}

.curso-card:hover::before {
  transform: scaleX(1);
}

.curso-icon {
  margin-bottom: 1.2rem;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 82, 175, 0.05);
  border-radius: 50%;
  padding: 1rem;
  color: #0052af;
}

.curso-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #0052af;
}

.modal-title {
  color: #0052af;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  margin-bottom: 1.5rem;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}

.curso-descripcion {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
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

/* Responsive */
@media (max-width: 768px) {
  .cursos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .curso-card {
    padding: 1.5rem 1rem;
  }
  
  .cursos-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .cursos-grid {
    grid-template-columns: 1fr;
  }
  
  .cursos-section {
    padding: 2rem 1rem;
  }
  
  .cursos-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  .modal-container {
    padding: 1.5rem;
  }
}
</style>