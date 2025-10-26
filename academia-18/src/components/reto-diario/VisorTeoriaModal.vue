<template>
  <div class="rd-modal">
    <div class="rd-modal-overlay" @click="$emit('close')"></div>
    <div class="rd-modal-container rd-modal-viewer">
      <div class="rd-modal-header">
        <h3>{{ archivo.titulo }}</h3>
        <button @click="$emit('close')" class="rd-modal-close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="rd-modal-content rd-modal-content-viewer">
        <div class="rd-document-viewer-full">
          <div class="rd-viewer-toolbar">
            <button @click="abrirEnNuevaVentana(archivo.archivoUrl)" class="rd-toolbar-btn" title="Abrir en nueva pestaña">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Abrir en Drive
            </button>
          </div>
          <iframe 
            v-if="archivo.archivoUrl"
            :src="getPreviewUrl(archivo.archivoUrl)" 
            class="rd-document-iframe-full"
            frameborder="0"
            allowfullscreen>
          </iframe>
           <div v-else class="rd-document-placeholder">
              <p>No hay documento para previsualizar.</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  archivo: Object,
});

defineEmits(['close']);

const getPreviewUrl = (url) => {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
};

const abrirEnNuevaVentana = (url) => {
  if (!url) return;
  window.open(url, '_blank');
};
</script>