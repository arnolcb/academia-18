<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const isMenuOpen = ref(false);
const isMobile = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  
  // Prevent scrolling when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value && isMenuOpen.value) {
    isMenuOpen.value = false;
    document.body.style.overflow = '';
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  document.body.style.overflow = '';
});
</script>

<template>
  <header class="sticky top-0 z-50">
    <div class="navbar">
      <div class="logo-container">
        <RouterLink to="/">
          <img src="@/assets/img/Logo_A18_v1.png" alt="Logo Academia 18" class="logo" />
        </RouterLink>
      </div>
      
      <button class="menu-button" @click="toggleMenu" aria-label="Menú">
        <span class="menu-icon"></span>
      </button>
      
      <nav class="desktop-menu">
        <RouterLink to="/cursos">Cursos</RouterLink>
        <RouterLink to="/matriculate">Matricúlate</RouterLink>
        <RouterLink to="/registro-aula-virtual">Registro Aula</RouterLink>
        <RouterLink to="/aula-virtual">Aula Virtual</RouterLink>
      </nav>
    </div>

    <transition name="menu-fade">
      <div v-if="isMenuOpen" class="mobile-menu">
        <div class="overlay" @click="toggleMenu"></div>
        <div class="menu-content">
          <div class="menu-header">
            <button class="close-button" @click="toggleMenu" aria-label="Cerrar menú">
              <span class="close-icon"></span>
            </button>
          </div>
          <div class="menu-links">
            <RouterLink to="/cursos" class="menu-link" @click="toggleMenu">Cursos</RouterLink>
            <RouterLink to="/matriculate" class="menu-link" @click="toggleMenu">Matricúlate</RouterLink>
            <RouterLink to="/registro-aula-virtual" class="menu-link" @click="toggleMenu">Registro Aula</RouterLink>
            <RouterLink to="/aula-virtual" class="menu-link" @click="toggleMenu">Aula Virtual</RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  width: auto;
}

.desktop-menu {
  display: flex;
  gap: 1rem;
}

.desktop-menu a {
  background: #f8f8f8;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 1rem;
  color: #0056b3;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
}

.desktop-menu a:hover {
  background: #0052AF;
  color: #fff;
}

/* Botón de menú moderno */
.menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.menu-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-icon, 
.menu-icon::before, 
.menu-icon::after {
  content: '';
  position: absolute;
  height: 2px;
  background: #0056b3;
  transition: all 0.3s ease;
}

.menu-icon {
  width: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-icon::before {
  width: 20px;
  top: -6px;
  left: 0;
}

.menu-icon::after {
  width: 20px;
  top: 6px;
  left: 0;
}

/* Menú móvil mejorado */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1000;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.menu-content {
  position: relative;
  background: white;
  padding: 1rem;
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

.menu-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.close-icon::before,
.close-icon::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background: #0056b3;
  top: 50%;
  left: 50%;
}

.close-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.menu-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.5rem;
}

.menu-link {
  background: #f8f8f8;
  padding: 0.8rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 1rem;
  color: #0056b3;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease-in-out;
}

.menu-link:hover {
  background: #0052AF;
  color: #fff;
}

/* Transición del menú */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Responsive mejorado */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .menu-button {
    display: block;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.75rem 1rem;
  }
  
  .logo {
    height: 40px;
  }
  
  .menu-content {
    width: 80%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .desktop-menu {
    gap: 0.75rem;
  }
  
  .desktop-menu a {
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>