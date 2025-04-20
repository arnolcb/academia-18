<template>
  <section class="matricula-form">
    <div class="wave-container">
      <div class="waves"></div>
    </div>
    <h2 class="form-title">Matrícula</h2>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-group">
        <div class="floating-input">
          <input type="text" id="nombre" v-model="formData.nombre" required />
          <label for="nombre" :class="{ active: formData.nombre }"
            >Nombre</label
          >
        </div>
      </div>
      <div class="form-group">
        <div class="floating-input">
          <input
            type="text"
            id="apellido"
            v-model="formData.apellido"
            required
          />
          <label for="apellido" :class="{ active: formData.apellido }"
            >Apellido</label
          >
        </div>
      </div>
      
      <div class="form-group">
        <div class="floating-input">
          <input
            type="tel"
            id="celular"
            v-model="formData.celular"
            maxlength="9"
            pattern="^\d{9}$"
            required
            @input="
              formData.celular = formData.celular.replace(/\D/g, '').slice(0, 9)
            "
          />
          <label for="celular" :class="{ active: formData.celular }"
            >Número de celular</label
          >
        </div>
      </div>

<!-- Departamento -->
<div class="form-group">
  <div class="floating-input floating-select">
    <select id="departamento" v-model="formData.departamento" required>
      <option value="" disabled selected></option>
      <option value="Amazonas">Amazonas</option>
      <option value="Áncash">Áncash</option>
      <option value="Apurímac">Apurímac</option>
      <option value="Arequipa">Arequipa</option>
      <option value="Ayacucho">Ayacucho</option>
      <option value="Cajamarca">Cajamarca</option>
      <option value="Callao">Callao</option>
      <option value="Cusco">Cusco</option>
      <option value="Huancavelica">Huancavelica</option>
      <option value="Huánuco">Huánuco</option>
      <option value="Ica">Ica</option>
      <option value="Junín">Junín</option>
      <option value="La Libertad">La Libertad</option>
      <option value="Lambayeque">Lambayeque</option>
      <option value="Lima">Lima</option>
      <option value="Loreto">Loreto</option>
      <option value="Madre de Dios">Madre de Dios</option>
      <option value="Moquegua">Moquegua</option>
      <option value="Pasco">Pasco</option>
      <option value="Piura">Piura</option>
      <option value="Puno">Puno</option>
      <option value="San Martín">San Martín</option>
      <option value="Tacna">Tacna</option>
      <option value="Tumbes">Tumbes</option>
      <option value="Ucayali">Ucayali</option>
    </select>
    <label for="departamento" :class="{ active: formData.departamento }">Departamento</label>
  </div>
</div>

      <!-- Grado de estudio -->
      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="grado" v-model="formData.grado" required>
            <option value="" disabled selected></option>
            <option value="1° de secundaria">1° de secundaria</option>
            <option value="2° de secundaria">2° de secundaria</option>
            <option value="3° de secundaria">3° de secundaria</option>
            <option value="4° de secundaria">4° de secundaria</option>
            <option value="5° de secundaria">5° de secundaria</option>
            <option value="Egresado de secundaria">
              Soy egresado de secundaria
            </option>
          </select>
          <label for="grado" :class="{ active: formData.grado }"
            >¿Qué grado estás cursando?</label
          >
        </div>
      </div>

      <!-- Turno de estudio -->
      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="turno" v-model="formData.turno" required>
            <option value="" disabled selected></option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="No aplica">No aplica</option>
          </select>
          <label for="turno" :class="{ active: formData.turno }"
            >¿En que turno estás estudiando?</label
          >
        </div>
      </div>

      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="modalidad" v-model="formData.modalidad" required>
            <option value="" disabled selected></option>
            <option value="Beca 18">Beca 18</option>
            <option value="Beca Hijo de docente">Beca Hijo de docente</option>
            <option value="COAR">COAR</option>
            <option value="Reforzamiento">Reforzamiento</option>
            <option value="Nivelación">Nivelación</option>
            <option value="Otros">Otros</option>
          </select>
          <label for="modalidad" :class="{ active: formData.modalidad }"
            >Modalidad a matricular</label
          >
        </div>
      </div>
      <div class="form-group">
        <div class="floating-input floating-select">
          <select id="horario" v-model="formData.horario" required>
            <option value="" disabled selected></option>
            <option value="L-V (6:30 p.m a 8:00 p.m)">
              L-V (6:30 p.m a 8:00 p.m)
            </option>
            <option value="L-V (8:00 p.m a 9:30 p.m)">
              L-V (8:00 p.m a 9:30 p.m)
            </option>
          </select>
          <label for="modalidad" :class="{ active: formData.horario }"
            >Horario a matricular</label
          >
        </div>
      </div>

      <div class="form-group submit-group">
        <button type="submit" class="submit-btn">
          <span>Enviar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  nombre: "",
  apellido: "",
  grado: "",
  turno: "",
  celular: "",
  departamento: "",
  ciclo: "",
  modalidad: "",
  horario: "",
});

const handleSubmit = async () => {
  const url =
    "https://script.google.com/macros/s/AKfycbxcb2qc_Xl_ICbS1Iws8oCqlTkEC5EpWObu0yLDuAwbRK5bzK0h-mIhHuiWQf0mkYTr/exec";

  const params = new URLSearchParams();
  for (const key in formData.value) {
    params.append(key, formData.value[key]);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const result = await response.json();
    console.log("Respuesta:", result);
    alert("Formulario enviado correctamente");
    formData.value = {
      nombre: "",
      apellido: "",
      grado: "",
      turno: "",
      celular: "",
      departamento: "",
      ciclo: "",
      modalidad: "",
      horario: "",
    };
  } catch (error) {
    console.error("Error al enviar datos:", error);
    alert("Ocurrió un error. Intenta nuevamente.");
  }
};
</script>

<style>
/* Estilo global para asegurar que el media query tenga prioridad */
@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr !important;
  }
}
</style>

<style scoped>
.matricula-form {
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 900px;
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
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230052af15' fill-opacity='1' d='M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,176C840,203,960,245,1080,250.7C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3Cpath fill='%230052af10' fill-opacity='1' d='M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,117.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3C/svg%3E")
    repeat-x;
  background-size: 1440px 320px;
  opacity: 0.8;
}

.form-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #0052af;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.form-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
  position: relative;
  z-index: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.floating-input {
  position: relative;
  width: 100%;
}

.floating-input input,
.floating-input select {
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

.floating-input input:focus,
.floating-input select:focus {
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
.floating-input select:focus ~ label,
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

.floating-input input:focus::placeholder {
  color: #aaa;
}

.floating-select select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230052af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

.submit-group {
  grid-column: span 2;
  margin-top: 1rem;
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

/* Responsive Design with stronger specificity */
@media (max-width: 768px) {
  .matricula-form {
    padding: 2.5rem 1.5rem;
    margin: 1rem;
  }

  .form-container {
    grid-template-columns: 1fr !important;
    gap: 1.2rem;
  }

  .form-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .submit-btn {
    padding: 0.9rem;
  }

  .submit-group {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .matricula-form {
    padding: 2rem 1rem;
    border-radius: 1rem;
  }

  .form-title {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
}
</style>
