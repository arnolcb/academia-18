<template>
  <section class="aulavirtual-login">
    <div class="wave-container">
      <div class="waves"></div>
    </div>
    
    <div class="login-container">
      <div class="image-container">
        <img src="@/assets/img/study-min-min.jpeg" alt="Estudiantes en aula virtual" class="login-image" />
      </div>
      
      <div class="form-section">
        <!-- Cabecera con pestañas -->
        <div class="tabs-container">
          <button 
            @click="activeTab = 'login'" 
            :class="['tab-button', { 'active': activeTab === 'login' }]"
          >
            Iniciar Sesión
          </button>
          <button 
            @click="activeTab = 'register'" 
            :class="['tab-button', { 'active': activeTab === 'register' }]"
          >
            Crear Cuenta
          </button>
        </div>

        <!-- Vista de Login -->
        <div v-if="activeTab === 'login'" class="tab-content">
          <h2 class="form-title">Aula Virtual</h2>
          <p class="form-subtitle">Accede a tus cursos VIP y contenido exclusivo</p>
          
          <!-- Alert para mostrar errores -->
          <div v-if="errorMessage" class="error-alert">
            {{ errorMessage }}
          </div>
          
          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="form-group">
              <div class="floating-input">
                <input type="email" id="usuario" v-model="loginData.usuario" required />
                <label for="usuario" :class="{ 'active': loginData.usuario }">Usuario / Correo</label>
              </div>
            </div>
            <div class="form-group">
              <div class="floating-input password-input">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="loginData.password" 
                  required 
                />
                <label for="password" :class="{ 'active': loginData.password }">Contraseña</label>
                <button 
                  type="button" 
                  class="toggle-password" 
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                >
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="recordar" v-model="loginData.recordar" />
                <label for="recordar">Recordarme</label>
              </div>
              <a href="#" @click.prevent="olvidarPassword" class="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            <div class="submit-group">
              <button type="submit" class="submit-btn" :disabled="isLoading">
                <span>{{ isLoading ? 'Cargando...' : 'Ingresar' }}</span>
                <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <!-- Vista de Registro -->
        <div v-if="activeTab === 'register'" class="tab-content">
          <h2 class="form-title">Crear Cuenta</h2>
          <p class="form-subtitle">Únete al aula virtual para acceso exclusivo</p>
          
          <!-- Alerta de éxito o error -->
          <div v-if="mensaje" class="alert" :class="{ 'alert-success': exito, 'alert-error': !exito }">
            {{ mensaje }}
          </div>
          
          <form @submit.prevent="handleRegister" class="auth-form">
            <!-- Datos de contacto -->
            <div class="form-group">
              <div class="floating-input">
                <input 
                  type="email" 
                  id="register-email" 
                  v-model="registerData.email" 
                  required 
                  @blur="validarEmail"
                />
                <label for="register-email" :class="{ 'active': registerData.email }">Correo electrónico</label>
                <p v-if="errores.email" class="error-message">{{ errores.email }}</p>
              </div>
            </div>
            
            <!-- Contraseña para la cuenta -->
            <div class="form-group">
              <div class="floating-input password-input">
                <input 
                  :type="showRegisterPassword ? 'text' : 'password'" 
                  id="register-password" 
                  v-model="registerData.password" 
                  required 
                  minlength="6" 
                  @blur="validarPassword"
                />
                <label for="register-password" :class="{ 'active': registerData.password }">Contraseña</label>
                <button 
                  type="button" 
                  class="toggle-password" 
                  @click="showRegisterPassword = !showRegisterPassword"
                  :aria-label="showRegisterPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                >
                  <svg v-if="!showRegisterPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
                <p v-if="errores.password" class="error-message">{{ errores.password }}</p>
                <p class="input-helper">La contraseña debe tener al menos 6 caracteres</p>
              </div>
              
              <div class="floating-input password-input">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  id="register-confirm-password" 
                  v-model="registerData.confirmPassword" 
                  required 
                  @blur="validarConfirmPassword"
                  @input="validarConfirmPassword"
                />
                <label for="register-confirm-password" :class="{ 'active': registerData.confirmPassword }">Confirmar contraseña</label>
                <button 
                  type="button" 
                  class="toggle-password" 
                  @click="showConfirmPassword = !showConfirmPassword"
                  :aria-label="showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                >
                  <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
                <p v-if="errores.confirmPassword" class="error-message">{{ errores.confirmPassword }}</p>
              </div>
            </div>
            
            <!-- Términos y condiciones -->
            <div class="form-terms">
              <div class="checkbox-container">
                <input type="checkbox" id="terminos" v-model="registerData.terminos" required @change="validarTerminos" />
                <label for="terminos">Acepto los <a href="#" @click.prevent="mostrarTerminos">términos y condiciones</a></label>
                <p v-if="errores.terminos" class="error-message">{{ errores.terminos }}</p>
              </div>
            </div>
            
            <!-- Botón de envío -->
            <div class="submit-group">
              <button 
                type="submit" 
                class="submit-btn" 
                :disabled="isRegisterLoading || !esFormularioValido"
              >
                <span v-if="isRegisterLoading">Registrando...</span>
                <span v-else>Crear mi cuenta</span>
                <svg v-if="!isRegisterLoading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </form>
        </div>
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
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/firebase';
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

const router = useRouter();

// Estados para las pestañas
const activeTab = ref('login');

// Estados para login
const isLoading = ref(false);
const errorMessage = ref('');
const showPassword = ref(false);

const loginData = reactive({
  usuario: '',
  password: '',
  recordar: false
});

// Estados para registro
const isRegisterLoading = ref(false);
const mensaje = ref('');
const exito = ref(false);
const modalVisible = ref(false);
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);

const registerData = reactive({
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

// Funciones de login
const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Validación básica
    if (!loginData.usuario || !loginData.password) {
      errorMessage.value = 'Por favor, completa todos los campos';
      isLoading.value = false;
      return;
    }
    
    // Intentar iniciar sesión
    await authService.login(loginData.usuario, loginData.password, loginData.recordar);
    
    // Redireccionar al dashboard con pestaña VIP activa
    router.push('/dashboard?tab=vip');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    
    // Manejar diferentes tipos de errores
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage.value = 'No existe una cuenta con este correo electrónico';
        break;
      case 'auth/wrong-password':
        errorMessage.value = 'Contraseña incorrecta';
        break;
      case 'auth/invalid-email':
        errorMessage.value = 'El correo electrónico no es válido';
        break;
      case 'auth/user-disabled':
        errorMessage.value = 'Esta cuenta ha sido deshabilitada';
        break;
      default:
        errorMessage.value = 'Error al iniciar sesión. Inténtalo de nuevo.';
    }
  } finally {
    isLoading.value = false;
  }
};

const olvidarPassword = async () => {
  if (!loginData.usuario) {
    errorMessage.value = 'Ingresa tu correo electrónico para restablecer la contraseña';
    return;
  }
  
  try {
    isLoading.value = true;
    const auth = getAuth();
    await sendPasswordResetEmail(auth, loginData.usuario);
    errorMessage.value = '';
    alert('Se ha enviado un correo para restablecer tu contraseña');
  } catch (error) {
    console.error('Error al enviar correo de recuperación:', error);
    errorMessage.value = 'No se pudo enviar el correo de recuperación';
  } finally {
    isLoading.value = false;
  }
};

// Funciones de registro
const validarEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!registerData.email) {
    errores.email = 'El correo electrónico es obligatorio';
  } else if (!emailRegex.test(registerData.email)) {
    errores.email = 'Ingresa un correo electrónico válido';
  } else {
    errores.email = '';
  }
};

const validarPassword = () => {
  if (!registerData.password) {
    errores.password = 'La contraseña es obligatoria';
  } else if (registerData.password.length < 6) {
    errores.password = 'La contraseña debe tener al menos 6 caracteres';
  } else {
    errores.password = '';
  }
  
  if (registerData.confirmPassword) {
    validarConfirmPassword();
  }
};

const validarConfirmPassword = () => {
  if (!registerData.confirmPassword) {
    errores.confirmPassword = 'Debes confirmar tu contraseña';
  } else if (registerData.password !== registerData.confirmPassword) {
    errores.confirmPassword = 'Las contraseñas no coinciden';
  } else {
    errores.confirmPassword = '';
  }
};

const validarTerminos = () => {
  errores.terminos = registerData.terminos ? '' : 'Debes aceptar los términos y condiciones';
};

const esFormularioValido = computed(() => {
  return (
    !errores.email &&
    !errores.password &&
    !errores.confirmPassword &&
    !errores.terminos &&
    registerData.email &&
    registerData.password &&
    registerData.confirmPassword &&
    registerData.terminos
  );
});

const mostrarTerminos = () => {
  modalVisible.value = true;
};

const cerrarModal = () => {
  modalVisible.value = false;
};

const verificarCorreoExistente = async (email) => {
  try {
    const methods = await fetchSignInMethodsForEmail(getAuth(), email);
    return methods.length > 0;
  } catch (error) {
    console.error('Error al verificar correo:', error);
    return false;
  }
};

const handleRegister = async () => {
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
  
  isRegisterLoading.value = true;
  mensaje.value = '';
  exito.value = false;
  
  try {
    // Paso 1: Verificar correo existente
    console.log('Verificando si el correo ya existe...');
    const correoExiste = await verificarCorreoExistente(registerData.email);
    if (correoExiste) {
      mensaje.value = 'Este correo electrónico ya está registrado';
      exito.value = false;
      isRegisterLoading.value = false;
      return;
    }
    
    // Paso 2: Registrar en Authentication
    console.log('Creando usuario en Authentication...');
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      registerData.email,
      registerData.password
    );
    
    // Mensaje de éxito
    exito.value = true;
    mensaje.value = '¡Cuenta VIP creada exitosamente! Redirigiendo al Aula Virtual...';
    
    // Redirigir al dashboard con pestaña VIP después de 2 segundos
    setTimeout(() => {
      localStorage.setItem('userEmail', registerData.email);
      router.push('/dashboard?tab=vip');
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
    isRegisterLoading.value = false;
  }
};
</script>

<style scoped>
.aulavirtual-login {
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 1100px;
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

.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Pestañas */
.tabs-container {
  display: flex;
  margin-bottom: 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 0.3rem;
}

.tab-button {
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: #666;
}

.tab-button:hover {
  background-color: rgba(0, 82, 175, 0.1);
  color: #0052af;
}

.tab-button.active {
  background-color: white;
  color: #0052af;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-content {
  width: 100%;
}

.form-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #0052af;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.form-subtitle {
  font-size: 1rem;
  color: #757575;
  margin-bottom: 2rem;
}

/* Alertas */
.error-alert,
.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.error-alert,
.alert-error {
  background-color: #ffebee;
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
}

.alert-success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
}

/* Formularios */
.auth-form {
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

.floating-input.password-input {
  position: relative;
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

.password-input input {
  padding-right: 3rem;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #757575;
  transition: color 0.3s;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
}

.toggle-password:hover {
  color: #0052af;
}

.toggle-password svg {
  width: 20px;
  height: 20px;
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

.error-message {
  color: #d32f2f;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.forgot-password {
  font-size: 0.9rem;
  color: #0052af;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #003c8f;
  text-decoration: underline;
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
  margin-top: 0.5rem;
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
@media (max-width: 1024px) {
  .aulavirtual-login {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
  }
  
  .image-container {
    display: none;
  }
  
  .aulavirtual-login {
    padding: 2.5rem 1.5rem;
    margin: 1rem;
  }
  
  .form-title {
    font-size: 1.8rem;
    text-align: center;
  }
}
</style>