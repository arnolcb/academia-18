<script setup>
import { onMounted, ref } from 'vue';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const cursos = ref([]);

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, "cursos"));
    cursos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Cursos cargados correctamente", cursos.value);
  } catch (err) {
    console.error("Error al cargar cursos:", err);
  }
});
</script>

<template>
  <div>
    <h2>Cursos</h2>
    <ul>
      <li v-for="curso in cursos" :key="curso.id">
        {{ curso.id }} - {{ curso.nombre }}
      </li>
    </ul>
  </div>
</template>
