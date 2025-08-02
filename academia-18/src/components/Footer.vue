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
              <!-- BOTÓN DE WHATSAPP MEJORADO -->
              <a 
                @click="abrirWhatsApp" 
                class="whatsapp-phone-btn"
                role="button"
                tabindex="0"
                @keydown.enter="abrirWhatsApp"
                @keydown.space.prevent="abrirWhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="whatsapp-icon">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                </svg>
                <span class="phone-text">916 963 262</span>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-right">
          <nav aria-label="Footer navigation">
            <ul class="footer-links">
              <li><RouterLink to="/">Inicio</RouterLink></li>
              <li><RouterLink to="/matriculate">Matrícula</RouterLink></li>
              <li><RouterLink to="/aula-virtual">Aula Virtual</RouterLink></li>
              <li><RouterLink to="/cursos">Cursos</RouterLink></li>
                <!-- <li><RouterLink to="/rendir-test">Rendir Test</RouterLink></li> -->
              <li><RouterLink to="/sobre-nosotros">Sobre Nosotros</RouterLink></li>
              <!--<li><RouterLink to="/libro-reclamaciones">Libro de reclamaciones</RouterLink></li>-->
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

  // Función para abrir WhatsApp
  const abrirWhatsApp = () => {
    const numeroWhatsApp = "519222322060"; // Número con código de país
    const mensaje = `¡Hola! 👋

Me interesa conocer información sobre los ciclos y servicios de Academia18.

¿Podrían brindarme más detalles?`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    window.open(enlaceWhatsApp, '_blank');
  };
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

  /* NUEVO: Botón de WhatsApp - Estilo minimalista */
  .whatsapp-phone-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    width: fit-content;
  }

  .whatsapp-phone-btn:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .whatsapp-phone-btn:focus {
    outline: 2px solid #25D366;
    outline-offset: 2px;
  }

  .whatsapp-icon {
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .whatsapp-phone-btn:hover .whatsapp-icon {
    transform: scale(1.1);
  }

  .phone-text {
    white-space: nowrap;
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

    /* Centrar botón WhatsApp en móvil */
    .whatsapp-phone-btn {
      margin: 0 auto;
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

    /* Ajustar botón WhatsApp para móviles pequeños */
    .whatsapp-phone-btn {
      font-size: 1.125rem;
      padding: 0.625rem 0.875rem;
    }
    
    .footer-bottom {
      margin-top: 2rem;
    }
  }
  </style>