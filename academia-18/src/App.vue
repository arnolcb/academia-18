<script setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Estilos globales */
:root {
  --primary-color: #0056b3;
  --primary-hover: #0052AF;
  --background-light: #f8f8f8;
  --text-color: #333333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  background-color: #fafafa;
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .content {
    padding: 1rem 0.75rem;
  }
}
</style>