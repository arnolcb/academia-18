<template>
  <section class="aulavirtual-login">
    <div class="wave-container">
      <div class="waves"></div>
    </div>
    <div class="login-container">
      <div class="image-container">
        <!-- Reemplazado el marcador de posición con una imagen real -->
        <img src="@/assets/img/study-min-min.jpeg" alt="Estudiantes en aula virtual" class="login-image" />
      </div>
      <div class="form-section">
        <h2 class="login-title">Aula Virtual</h2>
        <p class="login-subtitle">Accede a tus cursos y contenido educativo</p>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <div class="floating-input">
              <input type="text" id="usuario" v-model="loginData.usuario" required />
              <label for="usuario" :class="{ 'active': loginData.usuario }">Usuario / Correo</label>
            </div>
          </div>
          <div class="form-group">
            <div class="floating-input">
              <input type="password" id="password" v-model="loginData.password" required />
              <label for="password" :class="{ 'active': loginData.password }">Contraseña</label>
            </div>
          </div>
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="recordar" v-model="loginData.recordar" />
              <label for="recordar">Recordarme</label>
            </div>
            <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
          <div class="submit-group">
            <button type="submit" class="submit-btn">
              <span>Ingresar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          <div class="register-link">
            <p>¿Aún no estás matriculado? <a href="/matriculate ">Matricúlate aquí</a></p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const loginData = ref({
  usuario: '',
  password: '',
  recordar: false
});

const handleLogin = () => {
  console.log('Datos de inicio de sesión:', loginData.value);
  // Aquí iría la lógica de autenticación
  alert('Iniciando sesión...');
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

.login-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #0052af;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.login-subtitle {
  font-size: 1rem;
  color: #757575;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.floating-input {
  position: relative;
  width: 100%;
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

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link p {
  font-size: 0.9rem;
  color: #555;
}

.register-link a {
  color: #0052af;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.register-link a:hover {
  color: #003c8f;
  text-decoration: underline;
}

/* Responsive Design */
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
  
  .login-title {
    font-size: 1.8rem;
    text-align: center;
  }
  
  .login-subtitle {
    text-align: center;
  }
  
  .submit-btn {
    padding: 0.9rem;
  }
}

@media (max-width: 480px) {
  .aulavirtual-login {
    padding: 2rem 1rem;
    border-radius: 1rem;
  }
  
  .login-title {
    font-size: 1.6rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;
  }
}
</style>