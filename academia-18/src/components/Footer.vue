<!-- src/components/Footer.vue -->
<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-left">
          <div class="logo-section">
            <img src="@/assets/img/Logo_A18_v1.png" alt="Academia 18" class="footer-logo" />
            <div class="contact-wrapper">
              <p class="contact-info">
                Si deseas conocer información de nuestros ciclos o servicios, comunícate a nuestro número.
              </p>
              <p class="phone-number">916 963 262</p>
            </div>
          </div>
        </div>
        <div class="footer-right">
          <nav aria-label="Footer navigation">
            <ul class="footer-links">
              <li><RouterLink to="/">Inicio</RouterLink></li>
              <li><RouterLink to="/matricula">Matrícula</RouterLink></li>
              <li><RouterLink to="/aula-virtual">Aula Virtual</RouterLink></li>
              <li><RouterLink to="/cursos">Cursos</RouterLink></li>
              <li><RouterLink to="/rendir-test">Rendir Test</RouterLink></li>
              <li><RouterLink to="/sobre-nosotros">Sobre Nosotros</RouterLink></li>
              <li><RouterLink to="/libro-reclamaciones">Libro de reclamaciones</RouterLink></li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; Copyright 2024 - Academia 18</p>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  </script>
  
  <style scoped>
  .footer {
    background-color: #0052af;
    color: #ffffff;
    padding: 2.5rem 3rem 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1280px;
    margin: 0 auto;
    gap: 4rem;
  }
  
  .footer-left {
    flex: 0 0 400px;
  }
  
  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .footer-logo {
    width: 140px;
    height: auto;
    margin-bottom: 1.5rem;
    filter: brightness(1.1);
  }
  
  .contact-wrapper {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .contact-info {
    font-size: 1rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    max-width: 300px;
  }
  
  .phone-number {
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .phone-number::before {
    content: "📞";
  }
  
  .footer-right {
    flex: 1 1 auto;
    padding-top: 0.5rem;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    justify-content: end;
  }
  
  .footer-links li {
    margin: 0;
    transition: transform 0.2s;
  }
  
  .footer-links li:hover {
    transform: translateX(5px);
  }
  
  .footer-links a {
    text-decoration: none;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s;
    display: inline-block;
    padding: 0.25rem 0;
    position: relative;
    white-space: nowrap;
  }
  
  .footer-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #cce4ff;
    transition: width 0.3s;
  }
  
  .footer-links a:hover {
    color: #cce4ff;
  }
  
  .footer-links a:hover::after {
    width: 100%;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 2.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0.9rem;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Mejoras de responsividad */
  @media (max-width: 1200px) {
    .footer-container {
      padding: 0 2rem;
    }
    
    .footer-links {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 992px) {
    .footer {
      padding: 2.5rem 2rem 1rem;
    }
    
    .footer-container {
      gap: 3rem;
    }
    
    .footer-left {
      flex: 0 0 350px;
    }
    
    .footer-links {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem 2rem;
    }
  }
  
  @media (max-width: 768px) {
    .footer {
      padding: 2rem 1.5rem 1rem;
    }
    
    .footer-container {
      flex-direction: column;
      gap: 2.5rem;
    }
    
    .footer-left {
      flex: 1 1 100%;
      width: 100%;
      max-width: 450px;
      margin: 0 auto;
    }
    
    .logo-section {
      align-items: center;
    }
    
    .contact-wrapper {
      text-align: center;
    }
    
    .footer-right {
      width: 100%;
    }
    
    .footer-links {
      justify-content: center;
      text-align: center;
    }
    
    .footer-links li:hover {
      transform: none;
    }
    
    .footer-links a::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 480px) {
    .footer {
      padding: 1.5rem 1rem 0.75rem;
    }
    
    .footer-links {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    .contact-info {
      font-size: 0.95rem;
    }
    
    .phone-number {
      font-size: 1.125rem;
    }
    
    .footer-bottom {
      margin-top: 2rem;
    }
  }
  </style>