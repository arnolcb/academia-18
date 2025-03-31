<template>
  <section class="rendir-test-form">
    <h2 class="form-title">Rendir Test</h2>
    <!-- Formulario Inicial -->
    <form v-if="currentStep === 'form'" @submit.prevent="handleTestSubmit" class="form-container">
      <div class="form-group">
        <div class="floating-input">
          <input type="text" id="nombre" v-model="formData.nombre" required />
          <label for="nombre" :class="{ 'active': formData.nombre }">Nombre Completo</label>
        </div>
      </div>
      <div class="form-group">
        <div class="floating-input">
          <input type="email" id="email" v-model="formData.email" required />
          <label for="email" :class="{ 'active': formData.email }">Correo electrónico</label>
        </div>
      </div>
      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="nivel" v-model="formData.nivel" required>
            <option value="" disabled selected></option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
          <label for="nivel" :class="{ 'active': formData.nivel }">Selecciona tu Nivel</label>
        </div>
      </div>
      <div class="form-group submit-group">
        <button type="submit" class="submit-btn">
          <span>Iniciar Test</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </form>

    <!-- Contenedor de Test -->
    <div v-if="currentStep === 'test'" class="test-container">
      <div class="test-header">
        <h3>{{ `Test de Nivel ${formData.nivel}` }}</h3>
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${(currentQuestionIndex + 1) / testQuestions.length * 100}%` }"></div>
        </div>
        <p class="question-counter">Pregunta {{ currentQuestionIndex + 1 }} de {{ testQuestions.length }}</p>
      </div>
      
      <div class="question-container">
        <h4 class="question-text">{{ currentQuestion.pregunta }}</h4>
        
        <div class="options-container">
          <div 
            v-for="(opcion, index) in currentQuestion.opciones" 
            :key="index"
            :class="['option', { 
              'selected': selectedOption === index,
              'correct': showAnswers && index === currentQuestion.respuestaCorrecta,
              'incorrect': showAnswers && selectedOption === index && selectedOption !== currentQuestion.respuestaCorrecta
            }]"
            @click="selectOption(index)"
          >
            <div class="option-letter">{{ ['A', 'B', 'C', 'D'][index] }}</div>
            <div class="option-text">{{ opcion }}</div>
          </div>
        </div>
      </div>
      
      <div class="test-actions">
        <button 
          v-if="!showAnswers" 
          :disabled="selectedOption === null" 
          @click="validateAnswer" 
          class="action-btn validate-btn"
        >
          Verificar Respuesta
        </button>
        <button 
          v-if="showAnswers && currentQuestionIndex < testQuestions.length - 1" 
          @click="nextQuestion" 
          class="action-btn next-btn"
        >
          Siguiente Pregunta
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <button 
          v-if="showAnswers && currentQuestionIndex === testQuestions.length - 1" 
          @click="finishTest" 
          class="action-btn finish-btn"
        >
          Finalizar Test
        </button>
      </div>
    </div>

    <!-- Resultados del Test -->
    <div v-if="currentStep === 'results'" class="results-container">
      <div class="results-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#0052af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 class="results-title">¡Test Completado!</h3>
      <div class="results-score">
        <div class="score-circle">
          <span class="score-number">{{ correctAnswers }}</span>
          <span class="score-total">/ {{ testQuestions.length }}</span>
        </div>
        <p class="score-text">Respuestas correctas</p>
      </div>
      <div class="results-message">
        <p>Gracias por completar el test de nivel {{ formData.nombre }}.</p>
        <p>Hemos enviado un correo a <strong>{{ formData.email }}</strong> con tus resultados detallados y recomendaciones personalizadas para mejorar tu nivel.</p>
      </div>
      <button @click="resetForm" class="action-btn reset-btn">
        Realizar otro test
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// Estado del formulario
const formData = ref({
  nombre: '',
  email: '',
  nivel: '',
});

// Estado del test
const currentStep = ref('form'); // 'form', 'test', 'results'
const currentQuestionIndex = ref(0);
const selectedOption = ref(null);
const showAnswers = ref(false);
const correctAnswers = ref(0);

// Banco de preguntas por nivel
const testBanks = {
  'Básico': [
    {
      pregunta: '¿Cuál es la capital de Francia?',
      opciones: ['Madrid', 'París', 'Roma', 'Berlín'],
      respuestaCorrecta: 1
    },
    {
      pregunta: '¿Cuánto es 2 + 2?',
      opciones: ['3', '4', '5', '22'],
      respuestaCorrecta: 1
    }
  ],
  'Intermedio': [
    {
      pregunta: '¿Cuál es el río más largo del mundo?',
      opciones: ['Nilo', 'Amazonas', 'Misisipi', 'Yangtsé'],
      respuestaCorrecta: 0
    },
    {
      pregunta: '¿En qué año comenzó la Segunda Guerra Mundial?',
      opciones: ['1939', '1941', '1945', '1935'],
      respuestaCorrecta: 0
    }
  ],
  'Avanzado': [
    {
      pregunta: '¿Quién formuló la teoría de la relatividad?',
      opciones: ['Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'Nikola Tesla'],
      respuestaCorrecta: 1
    },
    {
      pregunta: '¿Cuál es el elemento químico con símbolo Hg?',
      opciones: ['Hierro', 'Hidrógeno', 'Mercurio', 'Helio'],
      respuestaCorrecta: 2
    }
  ]
};

// Preguntas actuales basadas en el nivel seleccionado
const testQuestions = ref([]);

// Pregunta actual
const currentQuestion = computed(() => {
  return testQuestions.value[currentQuestionIndex.value] || {};
});

// Iniciar el test
const handleTestSubmit = () => {
  if (formData.value.nombre && formData.value.email && formData.value.nivel) {
    // Seleccionar las preguntas según el nivel
    testQuestions.value = testBanks[formData.value.nivel];
    currentStep.value = 'test';
    currentQuestionIndex.value = 0;
    selectedOption.value = null;
    showAnswers.value = false;
    correctAnswers.value = 0;
  }
};

// Seleccionar una opción
const selectOption = (index) => {
  if (!showAnswers.value) {
    selectedOption.value = index;
  }
};

// Validar respuesta
const validateAnswer = () => {
  showAnswers.value = true;
  if (selectedOption.value === currentQuestion.value.respuestaCorrecta) {
    correctAnswers.value++;
  }
};

// Ir a la siguiente pregunta
const nextQuestion = () => {
  currentQuestionIndex.value++;
  selectedOption.value = null;
  showAnswers.value = false;
};

// Finalizar el test
const finishTest = () => {
  currentStep.value = 'results';
};

// Reiniciar el formulario
const resetForm = () => {
  formData.value = {
    nombre: '',
    email: '',
    nivel: '',
  };
  currentStep.value = 'form';
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  showAnswers.value = false;
  correctAnswers.value = 0;
};
</script>

<style scoped>
.rendir-test-form {
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
}

.form-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #0052af;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.form-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem 2rem;
  position: relative;
  z-index: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.floating-input {
  position: relative;
  width: 100%;
}

.floating-input input,
.floating-input select {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  background-color: white;
  z-index: 1;
  position: relative;
}

.floating-input input:focus,
.floating-input select:focus {
  border-color: #0052af;
  box-shadow: 0 0 0 3px rgba(0, 82, 175, 0.1);
}

.floating-input label {
  position: absolute;
  left: 1rem;
  top: 0.8rem;
  color: #757575;
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
  background-color: transparent;
  padding: 0 0.3rem;
}

.floating-input input:focus ~ label,
.floating-input input:not(:placeholder-shown) ~ label,
.floating-input select:focus ~ label,
.floating-input label.active {
  top: -0.6rem;
  left: 0.8rem;
  font-size: 0.8rem;
  color: #0052af;
  background-color: white;
}

.floating-input input::placeholder {
  color: transparent;
}

.floating-input input:focus::placeholder {
  color: #aaa;
}

.floating-select select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230052af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

.submit-group {
  grid-column: span 1;
  margin-top: 1rem;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: #0052af;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 82, 175, 0.2);
}

.submit-btn:hover {
  background: #003c8f;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 82, 175, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 82, 175, 0.2);
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:hover svg {
  transform: translateX(4px);
}

/* Estilos para el Test */
.test-container {
  position: relative;
  z-index: 1;
}

.test-header {
  text-align: center;
  margin-bottom: 2rem;
}

.test-header h3 {
  font-size: 1.8rem;
  color: #0052af;
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress {
  height: 100%;
  background-color: #0052af;
  transition: width 0.3s ease;
}

.question-counter {
  color: #757575;
  font-size: 0.9rem;
}

.question-container {
  background: #f8f9fa;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.question-text {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.options-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option:hover {
  border-color: #0052af;
  background-color: rgba(0, 82, 175, 0.05);
}

.option.selected {
  border-color: #0052af;
  background-color: rgba(0, 82, 175, 0.1);
}

.option.correct {
  border-color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
}

.option.incorrect {
  border-color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #0052af;
  color: white;
  font-weight: 600;
  margin-right: 1rem;
  flex-shrink: 0;
}

.option-text {
  flex-grow: 1;
}

.test-actions {
  display: flex;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.validate-btn {
  background-color: #0052af;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 82, 175, 0.2);
}

.validate-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  box-shadow: none;
}

.next-btn, .finish-btn {
  background-color: #0052af;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 82, 175, 0.2);
}

.next-btn:hover, .finish-btn:hover, .validate-btn:hover:not(:disabled) {
  background-color: #003c8f;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 82, 175, 0.3);
}

/* Estilos para los Resultados */
.results-container {
  text-align: center;
  padding: 2rem;
}

.results-icon {
  margin-bottom: 1.5rem;
}

.results-title {
  font-size: 2rem;
  color: #0052af;
  margin-bottom: 2rem;
}

.results-score {
  margin-bottom: 2rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f0f7ff;
  border: 4px solid #0052af;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.score-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0052af;
  line-height: 1;
}

.score-total {
  font-size: 1.2rem;
  color: #757575;
}

.score-text {
  font-size: 1.1rem;
  color: #333;
}

.results-message {
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.6;
}

.reset-btn {
  background-color: #0052af;
  color: white;
  padding: 0.8rem 2rem;
  margin: 0 auto;
}

.reset-btn:hover {
  background-color: #003c8f;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 82, 175, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .rendir-test-form {
    padding: 2.5rem 1.5rem;
    margin: 1rem;
  }
  
  .form-container {
    grid-template-columns: 1fr !important;
    gap: 1.2rem;
  }
  
  .form-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  
  .question-container {
    padding: 1.5rem;
  }
  
  .question-text {
    font-size: 1.1rem;
  }
  
  .option {
    padding: 0.8rem;
  }
  
  .option-letter {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
  
  .test-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .action-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .rendir-test-form {
    padding: 2rem 1rem;
    border-radius: 1rem;
  }
  
  .form-title {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
  
  .question-container {
    padding: 1rem;
  }
  
  .option-letter {
    width: 28px;
    height: 28px;
    margin-right: 0.7rem;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
  }
  
  .score-number {
    font-size: 2rem;
  }
}
</style>