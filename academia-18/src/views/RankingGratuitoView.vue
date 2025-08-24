<template>
    <div class="ranking-container">
        <!-- Header con navegación -->
        <header class="ranking-header">
            <div class="header-content">
                <button @click="volverASimulacro" class="back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <!--<span>Volver al simulacro</span>-->
                    <span>Volver al aula virtual</span>
                </button>

                <h1 class="ranking-titulo">Ranking - {{ simulacro.titulo || 'Cargando...' }}</h1>
            </div>
        </header>

        <!-- Contenido principal -->
        <main class="ranking-content">
            <!-- Estados de carga y error -->
            <div v-if="loading" class="estado-container">
                <div class="loading-spinner"></div>
                <p>Cargando ranking del simulacro...</p>
            </div>

            <div v-else-if="error" class="estado-container error-container">
                <p>{{ error }}</p>
                <button @click="cargarRanking" class="retry-btn">Intentar nuevamente</button>
            </div>

            <!-- Contenido del ranking -->
            <div v-else class="ranking-table-container">
                <!-- Encabezado del ranking -->
                <div class="ranking-header-info">
                    <h2>{{ simulacro.titulo }}</h2>
                    <p>{{ resultados.length }} estudiantes han completado este simulacro</p>
                </div>
                <div class="search-container">
                    <div class="search-input-wrapper">
                        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input v-model="terminoBusqueda" type="text" placeholder="Buscar estudiante por nombre..."
                            class="search-input" />
                        <button v-if="terminoBusqueda" @click="terminoBusqueda = ''" class="clear-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="search-info" v-if="terminoBusqueda">
                        <span>{{ resultadosFiltrados.length }} resultado{{ resultadosFiltrados.length !== 1 ? 's' : ''
                        }} encontrado{{ resultadosFiltrados.length !== 1 ? 's' : '' }}</span>
                    </div>
                </div>
                <!-- Tabla de ranking -->
                <div class="tabla-ranking">
                    <table>
                        <thead>
                            <tr>
                                <th class="posicion-header">Posición</th>
                                <th class="estudiante-header">Estudiante</th>
                                <th class="puntuacion-header">Puntuación</th>
                                <th class="correctas-header">Respuestas correctas</th>
                                <th class="tiempo-header">Tiempo</th>
                                <th class="fecha-header">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="resultado in resultadosFiltrados" :key="resultado.id">
                                <td class="posicion-col">
                                    <div class="posicion-badge" :class="getPosicionClass(resultado.posicionReal)">
                                        {{ resultado.posicionReal }}
                                    </div>
                                </td>
                                <td class="estudiante-col">
                                    <div class="estudiante-info">
                                        <div class="estudiante-info-mobile">
                                            <div class="posicion-mobile"
                                                :class="getPosicionClass(resultado.posicionReal)">
                                                #{{ resultado.posicionReal }}
                                            </div>
                                            <div class="avatar">
                                                {{ getInitials(resultado.userNick) }}
                                            </div>
                                        </div>
                                        <div class="nombre">
                                            <span>{{ resultado.userNick }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="puntuacion-col">{{ resultado.calificacion }}</td>
                                <td class="correctas-col">{{ resultado.correctas }} / {{ simulacro.totalPreguntas }}
                                </td>
                                <td class="tiempo-col">{{ formatearTiempo(resultado.tiempoUtilizado) }}</td>
                                <td class="fecha-col">{{ formatearFecha(resultado.fechaRealizacion) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mensaje si no hay resultados -->
                <div v-if="resultados.length === 0" class="sin-resultados">
                    <p>Aún no hay resultados para este simulacro.</p>
                    <p>¡Sé el primero en completarlo!</p>
                    <button @click="irASimulacro" class="btn-iniciar">Realizar simulacro</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth, db } from '@/firebase';
import {
    doc,
    getDoc,
    collection,
    query,
    orderBy,
    getDocs,
    where,
    limit,
    Timestamp
} from 'firebase/firestore';

// Router y route
const router = useRouter();
const route = useRoute();

// Estados
const simulacro = ref({});
const resultados = ref([]);
const loading = ref(true);
const error = ref(null);
const currentUserId = ref(null);

// Cargar datos
onMounted(async () => {
    // Obtener ID de usuario local
    currentUserId.value = localStorage.getItem('simulacro_user_id');
    await cargarRanking();
});

//filtrar resultados por usuario
const terminoBusqueda = ref('');

const resultadosFiltrados = computed(() => {
    if (!terminoBusqueda.value.trim()) {
        return resultados.value.map((resultado, index) => ({
            ...resultado,
            posicionReal: index + 1
        }));
    }

    return resultados.value
        .map((resultado, index) => ({
            ...resultado,
            posicionReal: index + 1
        }))
        .filter(resultado =>
            resultado.userNick.toLowerCase().includes(terminoBusqueda.value.toLowerCase())
        );
});


const cargarRanking = async () => {
    loading.value = true;
    error.value = null;

    try {
        const simulacroId = route.params.id;

        // Cargar información del simulacro
        const simulacroDoc = await getDoc(doc(db, 'simulacrosGratuitos', simulacroId));
        if (!simulacroDoc.exists()) {
            throw new Error('El simulacro no existe');
        }

        simulacro.value = {
            id: simulacroDoc.id,
            ...simulacroDoc.data()
        };

        // NUEVO: Cargar resultados desde Firestore
        const resultadosRef = collection(db, 'resultadosGratuitos');
        const q = query(
            resultadosRef,
            where('simulacroId', '==', simulacroId),
            orderBy('calificacion', 'desc'),
            orderBy('tiempoUtilizado', 'asc')
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            resultados.value = [];
        } else {
            const resultadosFirestore = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    userNick: data.userNick,
                    calificacion: data.calificacion,
                    correctas: data.correctas,
                    tiempoUtilizado: data.tiempoUtilizado,
                    fechaRealizacion: data.fechaRealizacion?.toDate() || new Date(data.fechaRealizacion)
                };
            });

            resultados.value = resultadosFirestore;
        }

    } catch (err) {
        console.error('Error al cargar el ranking:', err);
        error.value = 'No se pudo cargar el ranking. Por favor, intenta de nuevo.';

    } finally {
        loading.value = false;
    }
};

const obtenerResultadosLocales = (simulacroId) => {
    try {
        const resultadosGuardados = JSON.parse(localStorage.getItem('simulacros_resultados') || '[]');

        // Filtrar solo los resultados de este simulacro
        const resultadosSimulacro = resultadosGuardados.filter(r => r.simulacroId === simulacroId);

        // Procesar resultados para mostrar
        const resultadosProcesados = resultadosSimulacro.map(resultado => ({
            id: resultado.userNick + '_' + resultado.fechaRealizacion,
            userNick: resultado.userNick,
            calificacion: resultado.calificacion,
            correctas: resultado.correctas,
            tiempoUtilizado: resultado.tiempoUtilizado,
            fechaRealizacion: new Date(resultado.fechaRealizacion)
        }));

        // Ordenar por calificación (mayor a menor) y luego por tiempo (menor a mayor)
        resultadosProcesados.sort((a, b) => {
            if (a.calificacion !== b.calificacion) {
                return b.calificacion - a.calificacion;
            }
            return a.tiempoUtilizado - b.tiempoUtilizado;
        });

        return resultadosProcesados;
    } catch (error) {
        console.error('Error al obtener resultados locales:', error);
        return [];
    }
};


// Funciones de utilidad
const getPosicionClass = (posicion) => {
    if (posicion === 1) return 'primero';
    if (posicion === 2) return 'segundo';
    if (posicion === 3) return 'tercero';
    return '';
};

const getTextoPos = (posicion) => {
    if (posicion === 1) return 'er';
    if (posicion === 2) return 'do';
    if (posicion === 3) return 'er';
    return 'to';
};

const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
};

const formatearFecha = (fecha) => {
    if (!fecha) return '';

    const opciones = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return fecha.toLocaleDateString('es-ES', opciones);
};

const getInitials = (nombre) => {
    if (!nombre) return '?';
    return nombre.split(' ').map(n => n[0]).join('').substr(0, 2).toUpperCase();
};

// Navegación
const volverASimulacro = () => {
    //router.push(`/simulacro/${simulacro.value.id}`);
    router.push('/clases-gratuitas');
};

const irASimulacro = () => {
    router.push(`/simulacro-gratuito/${simulacro.value.id}`);
};
</script>

<style scoped>
.ranking-container {
    min-height: 100vh;
    background-color: #f8f9fa;
}

.ranking-header {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 10;
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2rem;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #d5deec;
    border: none;
    color: #0B215C;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0.7rem 1.2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.back-btn:hover {
    background-color: rgba(0, 82, 175, 0.1);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.back-btn svg {
    width: 18px;
    height: 18px;
}

.ranking-titulo {
    color: #333;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
}

.ranking-content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
}

/* Estados de carga y error */
.estado-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #0052af;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error-container {
    color: #d32f2f;
}

.retry-btn {
    margin-top: 1rem;
    padding: 0.7rem 1.5rem;
    background-color: #0052af;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.retry-btn:hover {
    background-color: #003c8f;
}

/* Contenido del ranking */
.ranking-table-container {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 2rem;
}

.ranking-header-info {
    margin-bottom: 2rem;
    text-align: center;
}

.ranking-header-info h2 {
    color: #0052af;
    margin: 0 0 0.5rem;
    font-size: 1.8rem;
}

.ranking-header-info p {
    margin: 0;
    color: #666;
}

/* Mi resultado */
.mi-resultado {
    background-color: #f4f9ff;
    border: 2px solid #d5deec;
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.mi-resultado h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #0052af;
    font-size: 1.2rem;
}

.resultado-detalle {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
}

.posicion {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.posicion .numero {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
}

.posicion .texto {
    font-size: 1rem;
    opacity: 0.7;
}

.posicion.primero {
    color: #ffc107;
}

.posicion.segundo {
    color: #757575;
}

.posicion.tercero {
    color: #cd7f32;
}

.puntuacion,
.correctas,
.tiempo {
    text-align: center;
}

.valor {
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.3rem;
}

.label {
    font-size: 0.9rem;
    color: #666;
}

/* Tabla de ranking */
.tabla-ranking {
    overflow-x: auto;
    margin-bottom: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid #eee;
    color: #555;
    font-weight: 600;
}

td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #333;
}

tr.mi-fila {
    background-color: #f4f9ff;
}

.posicion-col {
    width: 80px;
    text-align: center;
}

.posicion-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f8f9fa;
    font-weight: 600;
}

.posicion-badge.primero {
    background-color: #fff9e6;
    color: #ffc107;
    border: 2px solid #ffc107;
}

.posicion-badge.segundo {
    background-color: #f5f5f5;
    color: #757575;
    border: 2px solid #bdbdbd;
}

.posicion-badge.tercero {
    background-color: #f9f2ec;
    color: #cd7f32;
    border: 2px solid #cd7f32;
}

.estudiante-col {
    min-width: 200px;
}

.estudiante-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #0052af;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.nombre {
    font-weight: 500;
}

.nombre span {
    font-weight: normal;
    font-size: 0.9rem;
    opacity: 0.7;
    margin-left: 0.3rem;
}

.puntuacion-col {
    font-weight: 600;
    color: #0052af;
}

/* Sin resultados */
.sin-resultados {
    text-align: center;
    padding: 3rem 1rem;
}

.sin-resultados p {
    margin: 0 0 1rem;
    color: #666;
}

.btn-iniciar {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: #0052af;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
}

.btn-iniciar:hover {
    background-color: #003c8f;
}

/* Barra de búsqueda */
.search-container {
    margin-bottom: 2rem;
}

.search-input-wrapper {
    position: relative;
    max-width: 400px;
    margin: 0 auto;
}

.search-input {
    width: 100%;
    padding: 0.8rem 2.5rem 0.8rem 2.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #0052af;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(0, 82, 175, 0.1);
}

.search-icon {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
}

.clear-search {
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 50%;
    transition: all 0.2s;
}

.clear-search:hover {
    background-color: #f0f0f0;
    color: #666;
}

.search-info {
    text-align: center;
    margin-top: 0.8rem;
    color: #666;
    font-size: 0.9rem;
}

/* Responsive para búsqueda */
@media (max-width: 768px) {
    .search-input-wrapper {
        max-width: none;
    }

    .search-input {
        font-size: 0.9rem;
        padding: 0.7rem 2.2rem 0.7rem 2.2rem;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .ranking-content {
        padding: 0 1rem;
        margin: 1rem auto;
    }

    .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .back-btn {
        width: 100%;
        justify-content: center;
    }

    .ranking-table-container {
        padding: 1rem;
    }

    .resultado-detalle {
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .tabla-ranking {
        font-size: 0.9rem;
    }

    th,
    td {
        padding: 0.8rem 0.5rem;
    }

    .posicion-col,
    .fecha-col,
    .tiempo-col {
        display: none;
    }

    .correctas-col,
    .tiempo-col {
        text-align: center;
        font-size: 0.85rem;
    }

    .estudiante-col {
        min-width: 150px;
    }
    /* Ocultar encabezados innecesarios en mobile */
.posicion-header,
.fecha-header {
    display: none;
}

/* Reorganizar encabezados en mobile */
.estudiante-header {
    width: 50%;
}

.puntuacion-header,
.correctas-header {
    width: 25%;
    text-align: center;
}

.tiempo-header {
    display: none;
}

/* Ajustar el ancho de las columnas en mobile */
.estudiante-col {
    width: 50%;
    min-width: auto;
}

.puntuacion-col,
.correctas-col {
    width: 25%;
    text-align: center;
}

.tiempo-col {
    display: none;
}
}

/* Estilos para mobile - mostrar posición junto al nombre */
.estudiante-info-mobile {
    display: none;
    align-items: center;
    gap: 0.8rem;
}

.posicion-mobile {
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
    border-radius: 12px;
    background-color: #f0f0f0;
    color: #666;
    min-width: 35px;
    text-align: center;
}

.posicion-mobile.primero {
    background-color: #fff9e6;
    color: #ffc107;
}

.posicion-mobile.segundo {
    background-color: #f5f5f5;
    color: #757575;
}

.posicion-mobile.tercero {
    background-color: #f9f2ec;
    color: #cd7f32;
}

@media (max-width: 768px) {
    .estudiante-info-mobile {
        display: flex;
    }

    .estudiante-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>