<template>
  <section class="form-wrapper">
    <!-- Background blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="card">
      <!-- Header -->
      <div class="card-header">
        <div class="icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h1 class="card-title">MATRÍCULA CICLO GRATUITO</h1>
        <p class="card-subtitle">Completa tu información para continuar</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="form" novalidate>

        <!-- Email -->
        <div class="field" :class="{ focused: focused.correo, filled: formData.correo, error: errors.correo }">
          <div class="field-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <div class="field-body">
            <label for="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              v-model="formData.correo"
              autocomplete="email"
              @focus="focused.correo = true"
              @blur="focused.correo = false; validateField('correo')"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <Transition name="err">
            <span v-if="errors.correo" class="field-error">{{ errors.correo }}</span>
          </Transition>
        </div>

        <!-- Facebook -->
        <div class="field" :class="{ focused: focused.nombreFacebook, filled: formData.nombreFacebook, error: errors.nombreFacebook }">
          <div class="field-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </div>
          <div class="field-body">
            <label for="nombreFacebook">Nombre de cuenta de Facebook</label>
            <input
              type="text"
              id="nombreFacebook"
              v-model="formData.nombreFacebook"
              autocomplete="name"
              @focus="focused.nombreFacebook = true"
              @blur="focused.nombreFacebook = false; validateField('nombreFacebook')"
              placeholder="Tal como aparece en tu perfil"
            />
          </div>
          <Transition name="err">
            <span v-if="errors.nombreFacebook" class="field-error">{{ errors.nombreFacebook }}</span>
          </Transition>
        </div>

        <!-- WhatsApp -->
        <div class="field" :class="{ focused: focused.whatsapp, filled: formData.whatsapp, error: errors.whatsapp }">
          <div class="field-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.22 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div class="field-body">
            <label for="whatsapp">Número de WhatsApp</label>
            <input
              type="tel"
              id="whatsapp"
              v-model="formData.whatsapp"
              maxlength="9"
              @input="formData.whatsapp = formData.whatsapp.replace(/\D/g, '').slice(0, 9)"
              @focus="focused.whatsapp = true"
              @blur="focused.whatsapp = false; validateField('whatsapp')"
              placeholder="9 dígitos"
            />
          </div>
          <Transition name="err">
            <span v-if="errors.whatsapp" class="field-error">{{ errors.whatsapp }}</span>
          </Transition>
        </div>

        <!-- Submit -->
        <button type="submit" class="submit-btn" :class="{ loading: isSubmitting }" :disabled="isSubmitting">
          <span v-if="!isSubmitting" class="btn-content">
            Enviar información
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          <span v-else class="btn-content">
            <span class="spinner"></span>
            Enviando...
          </span>
        </button>

      </form>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="showToast" class="toast" :class="toastType">
        <div class="toast-icon-wrap">
          <svg v-if="toastType === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div class="toast-text">
          <strong>{{ toastTitle }}</strong>
          <span>{{ toastMessage }}</span>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";

const formData = reactive({
  correo: "",
  nombreFacebook: "",
  whatsapp: "",
});

const focused = reactive({ correo: false, nombreFacebook: false, whatsapp: false });
const errors = reactive({ correo: "", nombreFacebook: "", whatsapp: "" });

const isSubmitting = ref(false);
const showToast = ref(false);
const toastType = ref("success");
const toastTitle = ref("");
const toastMessage = ref("");

const validateField = (field) => {
  if (field === "correo") {
    if (!formData.correo) {
      errors.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errors.correo = "Ingresa un correo válido.";
    } else {
      errors.correo = "";
    }
  }
  if (field === "nombreFacebook") {
    errors.nombreFacebook = !formData.nombreFacebook.trim() ? "El nombre de Facebook es obligatorio." : "";
  }
  if (field === "whatsapp") {
    if (!formData.whatsapp) {
      errors.whatsapp = "El número de WhatsApp es obligatorio.";
    } else if (formData.whatsapp.length !== 9) {
      errors.whatsapp = "Debe tener exactamente 9 dígitos.";
    } else {
      errors.whatsapp = "";
    }
  }
};

const validateAll = () => {
  validateField("correo");
  validateField("nombreFacebook");
  validateField("whatsapp");
  return !errors.correo && !errors.nombreFacebook && !errors.whatsapp;
};

const showToastMsg = (type, title, message) => {
  toastType.value = type;
  toastTitle.value = title;
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => { showToast.value = false; }, 4000);
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  if (!validateAll()) return;

  isSubmitting.value = true;

  // 🔁 REEMPLAZA ESTA URL con la de tu nuevo Apps Script
  const url = "https://script.google.com/macros/s/AKfycbytfnZOnrBB8RaEBxzZjOj6oxskkbtUZ4rYi1A7EPhkf_ooJ0M6zvOrmZyZS95mJWkN/exec";

  const params = new URLSearchParams();
  params.append("correo", formData.correo);
  params.append("nombreFacebook", formData.nombreFacebook);
  params.append("whatsapp", formData.whatsapp);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    await response.json();

    // Limpiar formulario
    formData.correo = "";
    formData.nombreFacebook = "";
    formData.whatsapp = "";
    errors.correo = "";
    errors.nombreFacebook = "";
    errors.whatsapp = "";

    showToastMsg("success", "¡Listo!", "Tus datos fueron enviados correctamente.");
  } catch (error) {
    console.error("Error:", error);
    showToastMsg("error", "Error", "No se pudo enviar. Intenta nuevamente.");
  } finally {
    setTimeout(() => { isSubmitting.value = false; }, 2000);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

* { box-sizing: border-box; }

.form-wrapper {
  font-family: 'Sora', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4ff;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* Blobs decorativos */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  pointer-events: none;
}
.blob-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #bfd0ff, #d4e2ff);
  top: -150px; left: -150px;
}
.blob-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #c7f0e0, #d8f5ea);
  bottom: -120px; right: -100px;
}

/* Card */
.card {
  background: #ffffff;
  border-radius: 24px;
  padding: 2.5rem 2.5rem 2.8rem;
  width: 100%;
  max-width: 480px;
  box-shadow:
    0 0 0 1px rgba(0, 82, 175, 0.06),
    0 8px 24px rgba(0, 82, 175, 0.08),
    0 32px 64px rgba(0, 82, 175, 0.07);
  position: relative;
  z-index: 1;
}

/* Header */
.card-header {
  text-align: center;
  margin-bottom: 2.2rem;
}

.icon-ring {
  width: 60px; height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, #e8f0fe, #d2e3fc);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.2rem;
  color: #0052af;
}

.card-title {
  font-size: 1.55rem;
  font-weight: 700;
  color: #0d1b3e;
  margin: 0 0 0.4rem;
  letter-spacing: -0.02em;
}

.card-subtitle {
  font-size: 0.9rem;
  color: #7a8599;
  margin: 0;
  font-weight: 400;
}

/* Form fields */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  border: 1.5px solid #e4e9f2;
  border-radius: 14px;
  padding: 0.9rem 1rem 0.9rem 0.9rem;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto auto;
  column-gap: 0.5rem;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  background: #fafbff;
  position: relative;
}

.field.focused {
  border-color: #0052af;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(0, 82, 175, 0.08);
}

.field.error {
  border-color: #e53e3e;
  background: #fff8f8;
  box-shadow: 0 0 0 4px rgba(229, 62, 62, 0.07);
}

.field-icon {
  grid-row: 1 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9aa5bb;
  transition: color 0.2s;
}

.field.focused .field-icon { color: #0052af; }
.field.error .field-icon { color: #e53e3e; }

.field-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.field-body label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9aa5bb;
  transition: color 0.2s;
  pointer-events: none;
}

.field.focused .field-body label { color: #0052af; }
.field.error .field-body label { color: #e53e3e; }

.field-body input {
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Sora', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #0d1b3e;
  padding: 0;
  width: 100%;
}

.field-body input::placeholder {
  color: #c5ccda;
  font-weight: 400;
}

.field-error {
  grid-column: 2;
  font-size: 0.75rem;
  color: #e53e3e;
  margin-top: 0.2rem;
  font-weight: 500;
}

/* Error transition */
.err-enter-active, .err-leave-active { transition: all 0.2s ease; }
.err-enter-from, .err-leave-to { opacity: 0; transform: translateY(-4px); }

/* Submit button */
.submit-btn {
  margin-top: 0.6rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #0052af, #0070e0);
  color: #fff;
  font-family: 'Sora', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(0, 82, 175, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(0, 82, 175, 0.38);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(0, 82, 175, 0.25);
}

.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

.btn-content svg {
  transition: transform 0.25s;
}
.submit-btn:hover:not(:disabled) .btn-content svg {
  transform: translateX(4px);
}

/* Spinner */
.spinner {
  width: 16px; height: 16px;
  border: 2.5px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.4rem;
  border-radius: 16px;
  min-width: 300px;
  max-width: 420px;
  z-index: 9999;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.toast.success {
  background: #0d1b3e;
  color: #fff;
}

.toast.error {
  background: #fff;
  border: 1.5px solid #fed7d7;
  color: #0d1b3e;
}

.toast-icon-wrap {
  width: 36px; height: 36px;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}

.toast.success .toast-icon-wrap {
  background: rgba(255,255,255,0.12);
  color: #6ef7b0;
}

.toast.error .toast-icon-wrap {
  background: #fff5f5;
  color: #e53e3e;
}

.toast-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: 0.88rem;
}

.toast-text strong { font-weight: 700; }
.toast-text span { opacity: 0.8; }

/* Toast transition */
.toast-enter-active { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-leave-active { animation: slideDown 0.3s ease-in; }

@keyframes slideUp {
  from { opacity: 0; transform: translateX(-50%) translateY(24px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes slideDown {
  from { opacity: 1; transform: translateX(-50%) translateY(0); }
  to   { opacity: 0; transform: translateX(-50%) translateY(24px); }
}

/* Responsive */
@media (max-width: 520px) {
  .form-wrapper { padding: 1.2rem; }
  .card { padding: 2rem 1.5rem; }
  .card-title { font-size: 1.3rem; }
  .toast { min-width: unset; width: calc(100% - 2rem); }
}
</style>