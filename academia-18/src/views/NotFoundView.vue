<template>
    <div class="not-found-container">
      <div class="not-found-content">
        <div class="illustration">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#0052af" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <div class="buttons">
          <button @click="volverAtras" class="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Volver atrás</span>
          </button>
          <router-link to="/" class="home-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Ir al inicio</span>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const volverAtras = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  .not-found-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 2rem;
  }
  
  .not-found-content {
    text-align: center;
    background-color: white;
    border-radius: 1.5rem;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    max-width: 500px;
    width: 100%;
  }
  
  .illustration {
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }
  
  h1 {
    font-size: 5rem;
    font-weight: 700;
    color: #0052af;
    margin: 0;
    line-height: 1;
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
    margin: 0.5rem 0 1rem;
  }
  
  p {
    color: #757575;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .back-btn, .home-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    border-radius: 12px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .back-btn {
    background: #f0f4f8;
    color: #0052af;
    border: none;
  }
  
  .back-btn:hover {
    background: #e0eaf2;
  }
  
  .home-btn {
    background: #0052af;
    color: white;
    border: none;
    text-decoration: none;
  }
  
  .home-btn:hover {
    background: #003c8f;
  }
  
  @media (max-width: 480px) {
    .not-found-content {
      padding: 2rem 1.5rem;
    }
    
    h1 {
      font-size: 4rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    .buttons {
      flex-direction: column;
    }
  }
  </style>