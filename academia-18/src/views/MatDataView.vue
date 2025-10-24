<template>
  <section class="matricula-form">
    <div class="wave-container">
      <div class="waves"></div>
    </div>
    <h2 class="form-title">Actualización de datos</h2>
    <form @submit.prevent="handleSubmit" class="form-container">
      <!-- Nombres y Apellidos -->
      <div class="form-group">
        <div class="floating-input">
          <input type="text" id="nombres" v-model="formData.nombres" required />
          <label for="nombres" :class="{ active: formData.nombres }">Nombres</label>
        </div>
      </div>
      <div class="form-group">
        <div class="floating-input">
          <input type="text" id="apellidos" v-model="formData.apellidos" required />
          <label for="apellidos" :class="{ active: formData.apellidos }">Apellidos</label>
        </div>
      </div>

      <!-- DNI y Celular -->
      <div class="form-group">
        <div class="floating-input">
          <input
            type="tel"
            id="dni"
            v-model="formData.dni"
            maxlength="8"
            pattern="^\d{8}$"
            required
            @input="formData.dni = formData.dni.replace(/\D/g, '').slice(0, 8)"
          />
          <label for="dni" :class="{ active: formData.dni }">DNI (8 dígitos)</label>
        </div>
      </div>
      <div class="form-group">
        <div class="floating-input">
          <input
            type="tel"
            id="celular"
            v-model="formData.celular"
            maxlength="9"
            pattern="^\d{9}$"
            required
            @input="formData.celular = formData.celular.replace(/\D/g, '').slice(0, 9)"
          />
          <label for="celular" :class="{ active: formData.celular }">Número de celular (9 dígitos)</label>
        </div>
      </div>

      <!-- Correos -->
      <div class="form-group">
        <div class="floating-input">
          <input
            type="email"
            id="correoMeet"
            v-model="formData.correoMeet"
            required
          />
          <label for="correoMeet" :class="{ active: formData.correoMeet }">Correo del meet</label>
        </div>
      </div>
      <div class="form-group">
        <div class="floating-input">
          <input
            type="email"
            id="correoAula"
            v-model="formData.correoAula"
            required
          />
          <label for="correoAula" :class="{ active: formData.correoAula }">Correo aula virtual</label>
        </div>
      </div>

      <!-- Departamento -->
      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="departamento" v-model="formData.departamento" required>
            <option value="" disabled selected></option>
            <option value="Amazonas">Amazonas</option>
            <option value="Áncash">Áncash</option>
            <option value="Apurímac">Apurímac</option>
            <option value="Arequipa">Arequipa</option>
            <option value="Ayacucho">Ayacucho</option>
            <option value="Cajamarca">Cajamarca</option>
            <option value="Callao">Callao</option>
            <option value="Cusco">Cusco</option>
            <option value="Huancavelica">Huancavelica</option>
            <option value="Huánuco">Huánuco</option>
            <option value="Ica">Ica</option>
            <option value="Junín">Junín</option>
            <option value="La Libertad">La Libertad</option>
            <option value="Lambayeque">Lambayeque</option>
            <option value="Lima">Lima</option>
            <option value="Loreto">Loreto</option>
            <option value="Madre de Dios">Madre de Dios</option>
            <option value="Moquegua">Moquegua</option>
            <option value="Pasco">Pasco</option>
            <option value="Piura">Piura</option>
            <option value="Puno">Puno</option>
            <option value="San Martín">San Martín</option>
            <option value="Tacna">Tacna</option>
            <option value="Tumbes">Tumbes</option>
            <option value="Ucayali">Ucayali</option>
          </select>
          <label for="departamento" :class="{ active: formData.departamento }">Departamento</label>
        </div>
      </div>

      <!-- Año de estudio -->
      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="grado" v-model="formData.grado" required>
            <option value="" disabled selected></option>
            <option value="1° de secundaria">1° de secundaria</option>
            <option value="2° de secundaria">2° de secundaria</option>
            <option value="3° de secundaria">3° de secundaria</option>
            <option value="4° de secundaria">4° de secundaria</option>
            <option value="5° de secundaria">5° de secundaria</option>
            <option value="Egresado de secundaria">Egresado de secundaria</option>
          </select>
          <label for="grado" :class="{ active: formData.grado }">Año de estudio</label>
        </div>
      </div>

      <!-- Turno de estudio -->
      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="turno" v-model="formData.turno" required>
            <option value="" disabled selected></option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="No aplica">No aplica</option>
          </select>
          <label for="turno" :class="{ active: formData.turno }">Turno</label>
        </div>
      </div>

      <!-- Carrera -->
      <div class="form-group">
        <div class="floating-input">
          <input
            type="text"
            id="carrera"
            v-model="formData.carrera"
            required
          />
          <label for="carrera" :class="{ active: formData.carrera }">¿A qué carrera postularás?</label>
        </div>
      </div>

      <!-- Universidad Opción 1 -->
      <div class="form-group">
        <div class="floating-input">
          <input
            type="text"
            id="universidad1"
            v-model="formData.universidad1"
            required
          />
          <label for="universidad1" :class="{ active: formData.universidad1 }">¿A qué universidad? (Opción 1)</label>
        </div>
      </div>

      <!-- Universidad Opción 2 -->
      <div class="form-group">
        <div class="floating-input">
          <input
            type="text"
            id="universidad2"
            v-model="formData.universidad2"
            required
          />
          <label for="universidad2" :class="{ active: formData.universidad2 }">¿A qué universidad? (Opción 2)</label>
        </div>
      </div>

      <!-- Botón de envío -->
      <div class="form-group submit-group">
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Enviar</span>
          <span v-else>Enviando...</span>
          <svg
            v-if="!isSubmitting"
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
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          <div v-else class="spinner"></div>
        </button>
      </div>
    </form>

    <!-- Toast de confirmación -->
    <Transition name="toast">
      <div v-if="showToast" class="toast-notification">
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div class="toast-content">
          <h3>¡Datos enviados correctamente!</h3>
          <p>Tu matrícula ha sido registrada exitosamente</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  nombres: "",
  apellidos: "",
  dni: "",
  celular: "",
  correoMeet: "",
  correoAula: "",
  departamento: "",
  grado: "",
  turno: "",
  carrera: "",
  universidad1: "",
  universidad2: "",
});

const isSubmitting = ref(false);
const showToast = ref(false);

const handleSubmit = async () => {
  // Prevenir múltiples envíos
  if (isSubmitting.value) {
    return;
  }

  // Validar DNI
  if (formData.value.dni.length !== 8) {
    alert("El DNI debe tener exactamente 8 dígitos.");
    return;
  }

  // Validar Celular
  if (formData.value.celular.length !== 9) {
    alert("El número de celular debe tener exactamente 9 dígitos.");
    return;
  }

  isSubmitting.value = true;

  const url =
    "https://script.google.com/macros/s/AKfycbyV-jKgmg5wuIJfjOISlryYN2DpEv8O9TaTeUCzDsptEYebeq2PD8wbkrQN6JpmzW2f9w/exec";

  const params = new URLSearchParams();
  params.append("nombres", formData.value.nombres);
  params.append("apellidos", formData.value.apellidos);
  params.append("dni", formData.value.dni);
  params.append("celular", formData.value.celular);
  params.append("correoMeet", formData.value.correoMeet);
  params.append("correoAula", formData.value.correoAula);
  params.append("departamento", formData.value.departamento);
  params.append("grado", formData.value.grado);
  params.append("turno", formData.value.turno);
  params.append("carrera", formData.value.carrera);
  params.append("universidad1", formData.value.universidad1);
  params.append("universidad2", formData.value.universidad2);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const result = await response.json();
    console.log("Respuesta:", result);

    // Mostrar toast de éxito
    showToast.value = true;

    // Limpiar el formulario
    formData.value = {
      nombres: "",
      apellidos: "",
      dni: "",
      celular: "",
      correoMeet: "",
      correoAula: "",
      departamento: "",
      grado: "",
      turno: "",
      carrera: "",
      universidad1: "",
      universidad2: "",
    };

    // Ocultar el toast después de 4 segundos
    setTimeout(() => {
      showToast.value = false;
    }, 4000);

  } catch (error) {
    console.error("Error al enviar datos:", error);
    alert("Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.");
  } finally {
    // Reactivar el botón después de 3 segundos para evitar spam
    setTimeout(() => {
      isSubmitting.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
.matricula-form {
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
}

/* Ondas en el fondo */
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
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230052af15' fill-opacity='1' d='M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,176C840,203,960,245,1080,250.7C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3Cpath fill='%230052af10' fill-opacity='1' d='M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,117.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3C/svg%3E")
    repeat-x;
  background-size: 1440px 320px;
  opacity: 0.8;
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
  grid-template-columns: repeat(2, 1fr);
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
  grid-column: span 2;
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

.submit-btn:hover:not(:disabled) {
  background: #003c8f;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 82, 175, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 82, 175, 0.2);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) svg {
  transform: translateX(4px);
}

/* Spinner para el botón */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Toast de notificación */
.toast-notification {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #0052af 0%, #003c8f 100%);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 82, 175, 0.4);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 10000;
  max-width: 500px;
  min-width: 350px;
}

.toast-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  color: white;
  animation: checkmark 0.5s ease-in-out;
}

@keyframes checkmark {
  0% {
    transform: scale(0) rotate(0deg);
  }
  50% {
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

.toast-content h3 {
  margin: 0 0 0.3rem 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.toast-content p {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.95;
}

/* Animación del toast */
.toast-enter-active {
  animation: slideDown 0.4s ease-out;
}

.toast-leave-active {
  animation: slideUp 0.4s ease-in;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-100px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .matricula-form {
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

  .submit-btn {
    padding: 0.9rem;
  }

  .submit-group {
    grid-column: 1 / -1;
  }

  .toast-notification {
    min-width: 300px;
    max-width: calc(100% - 2rem);
    padding: 1.2rem 1.5rem;
  }

  .toast-icon {
    width: 32px;
    height: 32px;
  }

  .toast-content h3 {
    font-size: 1.1rem;
  }

  .toast-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .matricula-form {
    padding: 2rem 1rem;
    border-radius: 1rem;
  }

  .form-title {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
}
</style>