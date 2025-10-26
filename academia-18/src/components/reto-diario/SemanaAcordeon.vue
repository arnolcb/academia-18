<template>
  <div class="rd-semana-item">
    <div class="rd-semana-header" @click="toggle" :class="{ 'active': isOpen }">
      <div class="rd-semana-info">
        <h3>{{ semana.titulo }}</h3>
      </div>
      <div class="rd-semana-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>

    <div v-show="isOpen" class="rd-semana-contenido">
      <div class="rd-materiales-container">
        <MaterialSeccion
          titulo="TEORÍA"
          :items="semana.teoria"
          tipo="teoria"
          @ver-item="archivo => $emit('abrir-teoria', archivo)"
        />
        <MaterialSeccion
          titulo="PRÁCTICA"
          :items="semana.practica"
          tipo="practica"
          @ver-item="tarea => $emit('abrir-tarea', { semanaId: semana.id, tarea })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MaterialSeccion from './MaterialSeccion.vue';

const props = defineProps({
  semana: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['abrir-tarea', 'abrir-teoria', 'toggle']);

const toggle = () => {
  emit('toggle');
};
</script>