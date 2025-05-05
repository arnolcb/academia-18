<template>
  <section class="matriculate-container">
    <div class="wave-container">
      <div class="waves"></div>
    </div>
    
    <div class="matriculate-content">
      <div class="form-section">
        <h2 class="form-title">Crear Cuenta Aula Virtual</h2>
        <p class="form-subtitle">Crea tu cuenta para acceder al aula virtual!</p>
        
        <!-- Alerta de éxito o error -->
        <div v-if="mensaje" class="alert" :class="{ 'alert-success': exito, 'alert-error': !exito }">
          {{ mensaje }}
        </div>
        
        <form @submit.prevent="handleSubmit" class="registro-form">
          <!-- Datos de contacto -->
          <div class="form-group">
            <div class="floating-input">
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required 
                @blur="validarEmail"
              />
              <label for="email" :class="{ 'active': formData.email }">Correo electrónico</label>
              <p v-if="errores.email" class="error-message">{{ errores.email }}</p>
            </div>
          </div>
          
          <!-- Contraseña para la cuenta -->
          <div class="form-group">
            <div class="floating-input">
              <input 
                type="password" 
                id="password" 
                v-model="formData.password" 
                required 
                minlength="6" 
                @blur="validarPassword"
              />
              <label for="password" :class="{ 'active': formData.password }">Contraseña</label>
              <p v-if="errores.password" class="error-message">{{ errores.password }}</p>
              <p class="input-helper">La contraseña debe tener al menos 6 caracteres</p>
            </div>
            
            <div class="floating-input">
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="formData.confirmPassword" 
                required 
                @blur="validarConfirmPassword"
                @input="validarConfirmPassword"
              />
              <label for="confirmPassword" :class="{ 'active': formData.confirmPassword }">Confirmar contraseña</label>
              <p v-if="errores.confirmPassword" class="error-message">{{ errores.confirmPassword }}</p>
            </div>
          </div>
          
          <!-- Términos y condiciones -->
          <div class="form-terms">
            <div class="checkbox-container">
              <input type="checkbox" id="terminos" v-model="formData.terminos" required @change="validarTerminos" />
              <label for="terminos">Acepto los <a href="#" @click.prevent="mostrarTerminos">términos y condiciones</a></label>
              <p v-if="errores.terminos" class="error-message">{{ errores.terminos }}</p>
            </div>
          </div>
          
          <!-- Botón de envío -->
          <div class="submit-container">
            <button 
              type="submit" 
              class="submit-btn" 
              :disabled="isLoading || !esFormularioValido"
            >
              <span v-if="isLoading">Registrando...</span>
              <span v-else>Crear mi cuenta</span>
              <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          
          <div class="login-link">
            <p>¿Ya tienes una cuenta? <a href="/aula-virtual">Iniciar sesión</a></p>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Modal de términos y condiciones -->
    <div v-if="modalVisible" class="terminos-modal">
      <div class="modal-overlay" @click="cerrarModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3>Términos y condiciones</h3>
          <button @click="cerrarModal" class="cerrar-modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <h4>1. Servicios de Academia 18</h4>
          <p>Academia 18 ofrece servicios de preparación para la postulación a BECA 18, el programa de becas del Estado Peruano. Nuestros servicios incluyen clases en línea, materiales de estudio y asesoría personalizada.</p>
          
          <h4>2. Responsabilidades del estudiante</h4>
          <p>El estudiante se compromete a asistir a las clases programadas, realizar las tareas asignadas y participar activamente en las actividades académicas.</p>
          
          <h4>3. Protección de datos personales</h4>
          <p>Los datos personales proporcionados serán tratados de acuerdo a la Ley de Protección de Datos Personales (Ley N° 29733) y su reglamento.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Script simplificado para Matricula2View.vue - Enfocado en Authentication
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db, authService } from '@/firebase';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

const router = useRouter();
const isLoading = ref(false);
const mensaje = ref('');
const exito = ref(false);
const modalVisible = ref(false);

// Datos del formulario
const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  terminos: false
});

// Errores de validación
const errores = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  terminos: ''
});

// Validar email
const validarEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errores.email = 'El correo electrónico es obligatorio';
  } else if (!emailRegex.test(formData.email)) {
    errores.email = 'Ingresa un correo electrónico válido';
  } else {
    errores.email = '';
  }
};

// Validar contraseña
const validarPassword = () => {
  if (!formData.password) {
    errores.password = 'La contraseña es obligatoria';
  } else if (formData.password.length < 6) {
    errores.password = 'La contraseña debe tener al menos 6 caracteres';
  } else {
    errores.password = '';
  }
  
  // Si ya se ingresó confirmación, volver a validar
  if (formData.confirmPassword) {
    validarConfirmPassword();
  }
};

// Validar confirmación de contraseña
const validarConfirmPassword = () => {
  if (!formData.confirmPassword) {
    errores.confirmPassword = 'Debes confirmar tu contraseña';
  } else if (formData.password !== formData.confirmPassword) {
    errores.confirmPassword = 'Las contraseñas no coinciden';
  } else {
    errores.confirmPassword = '';
  }
};

// Validar términos y condiciones
const validarTerminos = () => {
  errores.terminos = formData.terminos ? '' : 'Debes aceptar los términos y condiciones';
};

// Verificar si el formulario es válido
const esFormularioValido = computed(() => {
  return (
    !errores.email &&
    !errores.password &&
    !errores.confirmPassword &&
    !errores.terminos &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.terminos
  );
});

// Mostrar términos y condiciones
const mostrarTerminos = () => {
  modalVisible.value = true;
};

// Cerrar modal
const cerrarModal = () => {
  modalVisible.value = false;
};

// Verificar si un correo ya existe
const verificarCorreoExistente = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error('Error al verificar correo:', error);
    return false;
  }
};

// SOLUCIÓN SIMPLIFICADA: Enfoque en la autenticación primero
// Los datos de Firestore se manejarán en otra pantalla después
const handleSubmit = async () => {
  // Validar todos los campos antes de enviar
  validarEmail();
  validarPassword();
  validarConfirmPassword();
  validarTerminos();
  
  // Comprobar si hay errores
  if (!esFormularioValido.value) {
    mensaje.value = 'Por favor, corrige los errores en el formulario';
    exito.value = false;
    return;
  }
  
  isLoading.value = true;
  mensaje.value = '';
  exito.value = false;
  
  try {
    // Paso 1: Verificar correo existente
    console.log('Verificando si el correo ya existe...');
    const correoExiste = await verificarCorreoExistente(formData.email);
    if (correoExiste) {
      mensaje.value = 'Este correo electrónico ya está registrado';
      exito.value = false;
      isLoading.value = false;
      return;
    }
    
    // Paso 2: Registrar en Authentication
    console.log('Creando usuario en Authentication...');
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    
    // IMPORTANTE: En esta solución simplificada, no intentamos guardar nada en Firestore
    // Esto nos permite verificar si el problema está en Firestore o en Authentication
    
    // Mensaje de éxito
    exito.value = true;
    mensaje.value = '¡Cuenta creada exitosamente! Redirigiendo al Aula Virtual...';
    
    // Redirigir al dashboard después de 2 segundos
    setTimeout(() => {
      // Guardamos el email en localStorage para uso futuro
      localStorage.setItem('userEmail', formData.email);
      router.push('/dashboard');
    }, 2000);
    
  } catch (error) {
    console.error('Error completo:', error);
    exito.value = false;
    
    // Manejar errores
    if (error.code === 'auth/email-already-in-use') {
      mensaje.value = 'Este correo electrónico ya está registrado';
    } else if (error.code === 'auth/invalid-email') {
      mensaje.value = 'El correo electrónico no es válido';
    } else if (error.code === 'auth/weak-password') {
      mensaje.value = 'La contraseña es demasiado débil';
    } else {
      mensaje.value = error.message || 'Error al registrar. Intenta de nuevo más tarde.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.matriculate-container {
  padding: 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 500px;
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
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230052af15' fill-opacity='1' d='M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,176C840,203,960,245,1080,250.7C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3Cpath fill='%230052af10' fill-opacity='1' d='M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,117.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  background-size: 1440px 320px;
  opacity: 0.8;
}

.matriculate-content {
  position: relative;
  z-index: 1;
}

.form-section {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0052af;
  margin-bottom: 0.5rem;
  text-align: center;
}

.form-subtitle {
  font-size: 1rem;
  color: #757575;
  margin-bottom: 2rem;
  text-align: center;
}

/* Alertas */
.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.alert-success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
}

.alert-error {
  background-color: #ffebee;
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
}

/* Formulario */
.registro-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.floating-input {
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
}

.floating-input input {
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

.floating-input input:focus {
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

.input-helper {
  font-size: 0.8rem;
  color: #757575;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}

/* Mensaje de error */
.error-message {
  color: #d32f2f;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}

/* Checkbox de términos */
.form-terms {
  display: flex;
  align-items: flex-start;
  margin-top: -0.5rem;
}

.checkbox-container {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 0.5rem;
}

.checkbox-container label {
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
}

.checkbox-container a {
  color: #0052af;
  text-decoration: none;
  transition: color 0.3s;
  margin-left: 0.3rem;
}

.checkbox-container a:hover {
  color: #003c8f;
  text-decoration: underline;
}

/* Botón de envío */
.submit-container {
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

.submit-btn:disabled {
  background: #8cb8e8;
  transform: none;
  cursor: not-allowed;
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 82, 175, 0.2);
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) svg {
  transform: translateX(4px);
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link p {
  font-size: 0.9rem;
  color: #555;
}

.login-link a {
  color: #0052af;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.login-link a:hover {
  color: #003c8f;
  text-decoration: underline;
}

/* Modal de términos */
.terminos-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal-container {
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #0052af;
  font-size: 1.5rem;
}

.cerrar-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: #757575;
  transition: color 0.3s;
}

.cerrar-modal:hover {
  color: #333;
}

.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-content h4 {
  color: #0052af;
  margin: 1.5rem 0 0.8rem;
  font-size: 1.1rem;
}

.modal-content h4:first-child {
  margin-top: 0;
}

.modal-content p {
  color: #555;
  line-height: 1.6;
  margin: 0 0 1rem;
}

/* Responsive */
@media (max-width: 480px) {
  .matriculate-container {
    padding: 1.5rem 1rem;
    border-radius: 1rem;
    margin: 1rem;
  }
  
  .form-title {
    font-size: 1.6rem;
  }
  
  .form-subtitle {
    margin-bottom: 1.5rem;
  }
  
  .registro-form {
    gap: 1.2rem;
  }
}
</style>