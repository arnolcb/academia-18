<template>
  <div class="rd-material-seccion" :class="tipo">
    <div class="rd-seccion-header" @click="toggle" :class="{ 'active': isOpen }">
      <svg v-if="tipo === 'teoria'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
      <span>{{ titulo }}</span>
      <div class="rd-seccion-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>

    <div v-show="isOpen" class="rd-archivos-lista">
  <div v-if="!items || items.length === 0" class="rd-archivos-empty">
    <p>No hay material disponible</p>
  </div>
  
  <!-- TEORÍA -->
  <template v-else-if="tipo === 'teoria'">
    <div v-for="archivo in items" :key="archivo.id" class="rd-archivo-item">
      <div class="rd-archivo-info">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <span>{{ archivo.titulo }}</span>
      </div>
      <button @click="$emit('ver-item', archivo)" class="rd-view-btn" title="Ver teoría">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </button>
    </div>
  </template>
  
  <!-- PRÁCTICA -->
  <template v-else>
    <div v-for="tarea in items" :key="tarea.id" class="rd-archivo-item rd-tarea-item">
      <div class="rd-tarea-header">
        <div class="rd-archivo-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span>{{ tarea.titulo }}</span>
        </div>
        <div v-if="tarea.calificacion !== undefined" class="rd-nota-badge" :class="getNotaClase(tarea.calificacion)">
          {{ tarea.calificacion }}/5
        </div>
      </div>
      <div class="rd-tarea-acciones">
        <button @click="$emit('ver-item', tarea)" class="rd-responder-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          <span>{{ tarea.calificacion !== undefined ? 'Ver Entrega' : 'Responder' }}</span>
        </button>
      </div>
    </div>
  </template>
</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  titulo: String,
  items: Array,
  tipo: String, // 'teoria' o 'practica'
});

defineEmits(['ver-item']);

// Este estado ahora es interno de cada sección
const isOpen = ref(false); 

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const getNotaClase = (nota) => {
  if (nota >= 5) return 'excelente';
  if (nota >= 4) return 'buena';
  if (nota >= 3) return 'regular';
  return 'mala';
};
</script>