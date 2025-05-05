<!-- src/views/AdminView.vue -->
<template>
    <div class="admin-container">
        <!-- Header del Admin -->
        <header class="admin-header">
            <div class="header-content">
                <h1>Panel de Administración</h1>
                <div class="user-menu">
                    <button @click="logout" class="logout-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- Contenido principal -->
        <main class="admin-content">
            <div class="admin-tabs">
                <button @click="activeTab = 'cursos'" :class="{ active: activeTab === 'cursos' }" class="tab-button">
                    Cursos
                </button>
                <button @click="activeTab = 'usuarios'" :class="{ active: activeTab === 'usuarios' }"
                    class="tab-button">
                    Usuarios
                </button>
            </div>

            <!-- Sección de Cursos -->
            <div v-if="activeTab === 'cursos'" class="tab-content">
                <div class="section-header">
                    <h2>Gestión de Cursos</h2>
                    <button @click="showCursoForm = true" class="add-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Nuevo Curso</span>
                    </button>
                </div>

                <!-- Lista de cursos -->
                <div v-if="loading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Cargando cursos...</p>
                </div>

                <div v-else-if="cursos.length === 0" class="empty-container">
                    <p>No hay cursos creados aún.</p>
                </div>

                <div v-else class="cursos-list">
                    <div v-for="curso in cursos" :key="curso.id" class="curso-item">
                        <div class="curso-info">
                            <h3>{{ curso.titulo }}</h3>
                            <p>{{ curso.descripcion }}</p>
                        </div>
                        <div class="curso-actions">
                            <button @click="editarCurso(curso)" class="action-btn edit-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button @click="gestionarSemanas(curso)" class="action-btn semanas-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </button>
                            <button @click="eliminarCurso(curso.id)" class="action-btn delete-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Formulario para crear/editar curso -->
                <div v-if="showCursoForm" class="modal-overlay">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3>{{ cursoEditando ? 'Editar Curso' : 'Nuevo Curso' }}</h3>
                            <button @click="cerrarFormularioCurso" class="close-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="guardarCurso">
                                <div class="form-group">
                                    <label for="titulo">Título del curso</label>
                                    <input type="text" id="titulo" v-model="formCurso.titulo" required>
                                </div>
                                <div class="form-group">
                                    <label for="descripcion">Descripción</label>
                                    <textarea id="descripcion" v-model="formCurso.descripcion" rows="4"
                                        required></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="imagen">URL de imagen</label>
                                    <input type="text" id="imagen" v-model="formCurso.imagen" placeholder="https://...">
                                </div>
                                <div class="form-group">
                                    <label for="orden">Orden</label>
                                    <input type="number" id="orden" v-model="formCurso.orden" min="1">
                                </div>
                                <div class="form-group checkbox-group">
                                    <label>
                                        <input type="checkbox" v-model="formCurso.activo">
                                        <span>Curso activo</span>
                                    </label>
                                </div>
                                <div class="form-buttons">
                                    <button type="button" @click="cerrarFormularioCurso"
                                        class="cancel-btn">Cancelar</button>
                                    <button type="submit" class="save-btn" :disabled="guardando">
                                        {{ guardando ? 'Guardando...' : 'Guardar Curso' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Modal de gestión de semanas -->
                <div v-if="showSemanasModal" class="modal-overlay">
                    <div class="modal-container semanas-modal">
                        <div class="modal-header">
                            <h3>Semanas del curso: {{ cursoActual?.titulo }}</h3>
                            <button @click="cerrarModalSemanas" class="close-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="semanas-header">
                                <h4>Semanas</h4>
                                <button @click="nuevaSemana" class="add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    <span>Nueva Semana</span>
                                </button>
                            </div>

                            <!-- Lista de semanas -->
                            <div v-if="cargandoSemanas" class="loading-container">
                                <div class="loading-spinner"></div>
                                <p>Cargando semanas...</p>
                            </div>

                            <div v-else-if="semanas.length === 0" class="empty-container">
                                <p>No hay semanas creadas para este curso.</p>
                            </div>

                            <div v-else class="semanas-list">
                                <div v-for="semana in semanas" :key="semana.id" class="semana-item">
                                    <div class="semana-info">
                                        <div class="semana-order">{{ semana.orden }}</div>
                                        <div class="semana-details">
                                            <h4>{{ semana.titulo }}</h4>
                                            <p>{{ semana.descripcion }}</p>
                                        </div>
                                    </div>
                                    <div class="semana-actions">
                                        <button @click="gestionarRecursos(semana)" class="action-btn recursos-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z">
                                                </path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                                <polyline points="10 9 9 9 8 9"></polyline>
                                            </svg>
                                        </button>
                                        <button @click="editarSemana(semana)" class="action-btn edit-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                                </path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button @click="eliminarSemana(semana.id)" class="action-btn delete-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path
                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                </path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Formulario para crear/editar semana -->
                            <div v-if="showSemanaForm" class="nested-modal">
                                <div class="nested-modal-content">
                                    <div class="modal-header">
                                        <h3>{{ semanaEditando ? 'Editar Semana' : 'Nueva Semana' }}</h3>
                                        <button @click="cerrarFormularioSemana" class="close-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="guardarSemana">
                                            <div class="form-group">
                                                <label for="titulo-semana">Título de la semana</label>
                                                <input type="text" id="titulo-semana" v-model="formSemana.titulo"
                                                    required>
                                            </div>
                                            <div class="form-group">
                                                <label for="descripcion-semana">Descripción</label>
                                                <textarea id="descripcion-semana" v-model="formSemana.descripcion"
                                                    rows="3" required></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label for="orden-semana">Orden</label>
                                                <input type="number" id="orden-semana" v-model="formSemana.orden"
                                                    min="1" required>
                                            </div>
                                            <div class="form-buttons">
                                                <button type="button" @click="cerrarFormularioSemana"
                                                    class="cancel-btn">Cancelar</button>
                                                <button type="submit" class="save-btn" :disabled="guardandoSemana">
                                                    {{ guardandoSemana ? 'Guardando...' : 'Guardar Semana' }}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal de gestión de recursos -->
                <div v-if="showRecursosModal" class="modal-overlay">
                    <div class="modal-container recursos-modal">
                        <div class="modal-header">
                            <h3>Recursos de: {{ semanaActual?.titulo }}</h3>
                            <button @click="cerrarModalRecursos" class="close-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="recursos-header">
                                <h4>Recursos</h4>
                                <button @click="nuevoRecurso" class="add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    <span>Nuevo Recurso</span>
                                </button>
                            </div>

                            <!-- Lista de recursos -->
                            <div v-if="cargandoRecursos" class="loading-container">
                                <div class="loading-spinner"></div>
                                <p>Cargando recursos...</p>
                            </div>

                            <div v-else-if="recursos.length === 0" class="empty-container">
                                <p>No hay recursos creados para esta semana.</p>
                            </div>

                            <div v-else class="recursos-list">
                                <div v-for="recurso in recursos" :key="recurso.id" class="recurso-item">
                                    <div class="recurso-tipo" :class="recurso.tipo">
                                        <!-- Icono según el tipo de recurso -->
                                        <svg v-if="recurso.tipo === 'guia'" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                            <polyline points="10 9 9 9 8 9"></polyline>
                                        </svg>

                                        <svg v-else-if="recurso.tipo === 'clase'" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                        </svg>

                                        <svg v-else-if="recurso.tipo === 'tarea'" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </div>

                                    <div class="recurso-info">
                                        <h4>{{ recurso.titulo }}</h4>
                                        <p>{{ recurso.descripcion }}</p>
                                    </div>

                                    <div class="recurso-actions">
                                        <button v-if="recurso.tipo === 'tarea'" @click="gestionarSolucionario(recurso)"
                                            class="action-btn solucionario-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="9 11 12 14 22 4"></polyline>
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11">
                                                </path>
                                            </svg>
                                        </button>
                                        <button @click="editarRecurso(recurso)" class="action-btn edit-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                                </path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button @click="eliminarRecurso(recurso.id)" class="action-btn delete-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path
                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                </path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Formulario para crear/editar recurso -->
                            <div v-if="showRecursoForm" class="nested-modal">
                                <div class="nested-modal-content">
                                    <div class="modal-header">
                                        <h3>{{ recursoEditando ? 'Editar Recurso' : 'Nuevo Recurso' }}</h3>
                                        <button @click="cerrarFormularioRecurso" class="close-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="guardarRecurso">
                                            <div class="form-group">
                                                <label for="tipo-recurso">Tipo de recurso</label>
                                                <select id="tipo-recurso" v-model="formRecurso.tipo" required>
                                                    <option value="guia">Guía</option>
                                                    <option value="clase">Clase (Video)</option>
                                                    <option value="tarea">Tarea</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="titulo-recurso">Título</label>
                                                <input type="text" id="titulo-recurso" v-model="formRecurso.titulo"
                                                    required>
                                            </div>
                                            <div class="form-group">
                                                <label for="descripcion-recurso">Descripción</label>
                                                <textarea id="descripcion-recurso" v-model="formRecurso.descripcion"
                                                    rows="3" required></textarea>
                                            </div>

                                            <div v-if="formRecurso.tipo === 'guia' || formRecurso.tipo === 'tarea'"
                                                class="form-group">
                                                <label for="archivo-url">URL del archivo</label>
                                                <input type="text" id="archivo-url" v-model="formRecurso.archivoUrl"
                                                    placeholder="https://..." required>
                                            </div>

                                            <div v-if="formRecurso.tipo === 'clase'" class="form-group">
                                                <label for="video-url">URL del video</label>
                                                <input type="text" id="video-url" v-model="formRecurso.videoUrl"
                                                    placeholder="https://..." required>
                                            </div>

                                            <div class="form-buttons">
                                                <button type="button" @click="cerrarFormularioRecurso"
                                                    class="cancel-btn">Cancelar</button>
                                                <button type="submit" class="save-btn" :disabled="guardandoRecurso">
                                                    {{ guardandoRecurso ? 'Guardando...' : 'Guardar Recurso' }}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <!-- Formulario para solucionario -->
                            <div v-if="showSolucionarioForm" class="nested-modal">
                                <div class="nested-modal-content">
                                    <div class="modal-header">
                                        <h3>Solucionario: {{ recursoActual?.titulo }}</h3>
                                        <button @click="cerrarFormularioSolucionario" class="close-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="guardarSolucionario">
                                            <div class="solucionario-info">
                                                <p>Ingresa las respuestas correctas para la tarea. Cada pregunta vale 1
                                                    punto.</p>
                                            </div>

                                            <div class="respuestas-list">
                                                <div v-for="i in 10" :key="i" class="respuesta-item">
                                                    <label :for="'pregunta-' + i">Pregunta {{ i }}</label>
                                                    <input :id="'pregunta-' + i"
                                                        v-model="formSolucionario.respuestas[i - 1].respuesta"
                                                        type="text" placeholder="Respuesta correcta" required>
                                                </div>
                                            </div>

                                            <div class="form-buttons">
                                                <button type="button" @click="cerrarFormularioSolucionario"
                                                    class="cancel-btn">Cancelar</button>
                                                <button type="submit" class="save-btn"
                                                    :disabled="guardandoSolucionario">
                                                    {{ guardandoSolucionario ? 'Guardando...' : 'Guardar Solucionario'
                                                    }}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección de Usuarios -->
            <div v-if="activeTab === 'usuarios'" class="tab-content">
                <div class="section-header">
                    <h2>Gestión de Usuarios</h2>
                    <button @click="showUsuarioForm = true" class="add-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Nuevo Usuario</span>
                    </button>
                </div>

                <!-- Lista de usuarios -->
                <div v-if="loadingUsuarios" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Cargando usuarios...</p>
                </div>

                <div v-else-if="usuarios.length === 0" class="empty-container">
                    <p>No hay usuarios registrados aún.</p>
                </div>

                <div v-else class="usuarios-list">
                    <div v-for="usuario in usuarios" :key="usuario.id" class="usuario-item">
                        <div class="usuario-info">
                            <div class="usuario-avatar">
                                <div v-if="!usuario.avatar" class="avatar-placeholder">
                                    {{ getInitials(usuario.nombre) }}
                                </div>
                                <img v-else :src="usuario.avatar" alt="Avatar" class="avatar-img">
                            </div>
                            <div class="usuario-details">
                                <h3>{{ usuario.nombre }}</h3>
                                <p class="usuario-email">{{ usuario.email }}</p>
                                <div class="usuario-meta">
                                    <span class="rol-badge" :class="usuario.rol">{{ usuario.rol }}</span>
                                    <span class="fecha-registro">Registrado: {{ formatDate(usuario.fechaRegistro)
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="usuario-actions">
                            <button @click="editarUsuario(usuario)" class="action-btn edit-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button @click="gestionarCursosUsuario(usuario)" class="action-btn cursos-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z">
                                    </path>
                                </svg>
                            </button>
                            <button @click="eliminarUsuario(usuario.id)" class="action-btn delete-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Formulario para crear/editar usuario -->
                <div v-if="showUsuarioForm" class="modal-overlay">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3>{{ usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario' }}</h3>
                            <button @click="cerrarFormularioUsuario" class="close-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="guardarUsuario">
                                <div class="form-group">
                                    <label for="nombre">Nombre completo</label>
                                    <input type="text" id="nombre" v-model="formUsuario.nombre" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Correo electrónico</label>
                                    <input type="email" id="email" v-model="formUsuario.email" required>
                                </div>
                                <div v-if="!usuarioEditando" class="form-group">
                                    <label for="password">Contraseña</label>
                                    <input type="password" id="password" v-model="formUsuario.password" required>
                                </div>
                                <div class="form-group">
                                    <label for="rol">Rol</label>
                                    <select id="rol" v-model="formUsuario.rol" required>
                                        <option value="estudiante">Estudiante</option>
                                        <option value="profesor">Profesor</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="avatar">URL de avatar (opcional)</label>
                                    <input type="text" id="avatar" v-model="formUsuario.avatar"
                                        placeholder="https://...">
                                </div>
                                <div class="form-buttons">
                                    <button type="button" @click="cerrarFormularioUsuario"
                                        class="cancel-btn">Cancelar</button>
                                    <button type="submit" class="save-btn" :disabled="guardandoUsuario">
                                        {{ guardandoUsuario ? 'Guardando...' : 'Guardar Usuario' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Modal de gestión de cursos del usuario -->
                <div v-if="showCursosUsuarioModal" class="modal-overlay">
                    <div class="modal-container cursos-usuario-modal">
                        <div class="modal-header">
                            <h3>Cursos de: {{ usuarioActual?.nombre }}</h3>
                            <button @click="cerrarModalCursosUsuario" class="close-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="cursos-usuario-header">
                                <h4>Cursos asignados</h4>
                                <button @click="showAsignarCursoForm = true" class="add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    <span>Asignar Curso</span>
                                </button>
                            </div>

                            <!-- Lista de cursos del usuario -->
                            <div v-if="cargandoCursosUsuario" class="loading-container">
                                <div class="loading-spinner"></div>
                                <p>Cargando cursos...</p>
                            </div>

                            <div v-else-if="cursosUsuario.length === 0" class="empty-container">
                                <p>Este usuario no tiene cursos asignados.</p>
                            </div>

                            <div v-else class="cursos-usuario-list">
                                <div v-for="curso in cursosUsuario" :key="curso.id" class="curso-usuario-item">
                                    <div class="curso-usuario-info">
                                        <h4>{{ curso.titulo }}</h4>
                                        <p>{{ curso.descripcion }}</p>
                                    </div>
                                    <div class="curso-usuario-actions">
                                        <span class="curso-progress" v-if="curso.progreso">{{ curso.progreso }}%
                                            completado</span>
                                        <button @click="eliminarCursoUsuario(curso.id)" class="action-btn delete-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path
                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                </path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Formulario para asignar curso -->
                            <div v-if="showAsignarCursoForm" class="nested-modal">
                                <div class="nested-modal-content">
                                    <div class="modal-header">
                                        <h3>Asignar Curso</h3>
                                        <button @click="cerrarFormularioAsignarCurso" class="close-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="asignarCursoUsuario">
                                            <div class="form-group">
                                                <label for="curso-seleccionado">Seleccionar curso</label>
                                                <select id="curso-seleccionado" v-model="formAsignarCurso.cursoId"
                                                    required>
                                                    <option value="" disabled>Selecciona un curso</option>
                                                    <option v-for="curso in cursosPorAsignar" :key="curso.id"
                                                        :value="curso.id">
                                                        {{ curso.titulo }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="form-buttons">
                                                <button type="button" @click="cerrarFormularioAsignarCurso"
                                                    class="cancel-btn">Cancelar</button>
                                                <button type="submit" class="save-btn" :disabled="guardandoAsignacion">
                                                    {{ guardandoAsignacion ? 'Asignando...' : 'Asignar Curso' }}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

    </main>
</div>
</template>

<script setup>
// Añadir estos estados al setup()
import { ref } from 'vue'
import { db, authService } from '@/firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

const usuarios = ref([]);
const loadingUsuarios = ref(true);
const showUsuarioForm = ref(false);
const usuarioEditando = ref(null);
const guardandoUsuario = ref(false);

// Gestión de cursos del usuario
const showCursosUsuarioModal = ref(false);
const usuarioActual = ref(null);
const cursosUsuario = ref([]);
const cargandoCursosUsuario = ref(false);
const cursosPorAsignar = ref([]);
const showAsignarCursoForm = ref(false);
const guardandoAsignacion = ref(false);

// Cursos
const cursos = ref([]);
const loading = ref(true);

// Formularios
const formUsuario = reactive({
  nombre: '',
  email: '',
  password: '',
  rol: 'estudiante',
  avatar: ''
});

const formAsignarCurso = reactive({
  cursoId: ''
});

const activeTab = ref('cursos'); // 'cursos' or 'usuarios'

// Función para cargar usuarios (añadir a onMounted después de cargarCursos)
const cargarUsuarios = async () => {
  loadingUsuarios.value = true;
  
  try {
    const usuariosRef = collection(db, 'usuarios');
    const querySnapshot = await getDocs(usuariosRef);
    
    const usuariosArray = [];
    querySnapshot.forEach((doc) => {
      usuariosArray.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    usuarios.value = usuariosArray;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    alert('No se pudieron cargar los usuarios. Intenta de nuevo.');
  } finally {
    loadingUsuarios.value = false;
  }
};

// Formateador de fechas
const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  if (timestamp.toDate) {
    // Es un timestamp de Firestore
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
  
  return 'Fecha inválida';
};

// Función para obtener iniciales del nombre
const getInitials = (nombre) => {
  if (!nombre) return '??';
  
  return nombre
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// ----- GESTIÓN DE USUARIOS -----

// Abrir formulario para nuevo usuario
const nuevoUsuario = () => {
  usuarioEditando.value = null;
  formUsuario.nombre = '';
  formUsuario.email = '';
  formUsuario.password = '';
  formUsuario.rol = 'estudiante';
  formUsuario.avatar = '';
  showUsuarioForm.value = true;
};

// Abrir formulario para editar usuario
const editarUsuario = (usuario) => {
  usuarioEditando.value = usuario;
  formUsuario.nombre = usuario.nombre || '';
  formUsuario.email = usuario.email || '';
  formUsuario.password = '';  // No mostramos la contraseña actual
  formUsuario.rol = usuario.rol || 'estudiante';
  formUsuario.avatar = usuario.avatar || '';
  showUsuarioForm.value = true;
};

// Cerrar formulario de usuario
const cerrarFormularioUsuario = () => {
  showUsuarioForm.value = false;
  usuarioEditando.value = null;
};

// Guardar usuario (nuevo o editado)
const guardarUsuario = async () => {
  guardandoUsuario.value = true;
  
  try {
    if (usuarioEditando.value) {
      // Actualizar usuario existente
      const userData = {
        nombre: formUsuario.nombre,
        email: formUsuario.email,
        rol: formUsuario.rol,
        avatar: formUsuario.avatar,
        fechaActualizacion: serverTimestamp()
      };
      
      await updateDoc(doc(db, 'usuarios', usuarioEditando.value.id), userData);
      
    } else {
      // Crear nuevo usuario
      try {
        // Crear usuario en Authentication
        const userCredential = await authService.createUserWithEmailAndPassword(
          formUsuario.email,
          formUsuario.password
        );
        
        // Guardar datos adicionales en Firestore
        const userData = {
          nombre: formUsuario.nombre,
          email: formUsuario.email,
          rol: formUsuario.rol,
          avatar: formUsuario.avatar,
          fechaRegistro: serverTimestamp(),
          fechaActualizacion: serverTimestamp()
        };
        
        await setDoc(doc(db, 'usuarios', userCredential.user.uid), userData);
        
      } catch (authError) {
        console.error('Error al crear usuario:', authError);
        alert(`Error al crear usuario: ${authError.message}`);
        guardandoUsuario.value = false;
        return;
      }
    }
    
    // Refrescar la lista de usuarios
    await cargarUsuarios();
    showUsuarioForm.value = false;
    
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    alert('No se pudo guardar el usuario. Intenta de nuevo.');
  } finally {
    guardandoUsuario.value = false;
  }
};

// Eliminar usuario
const eliminarUsuario = async (userId) => {
  if (!confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
    return;
  }
  
  try {
    // Obtener usuario de Firestore para verificar rol
    const userDoc = await getDoc(doc(db, 'usuarios', userId));
    
    if (userDoc.exists() && userDoc.data().rol === 'admin') {
      // No permitir eliminar administradores (o al menos al último admin)
      const adminsQuery = query(
        collection(db, 'usuarios'),
        where('rol', '==', 'admin')
      );
      const adminsSnapshot = await getDocs(adminsQuery);
      
      if (adminsSnapshot.size <= 1) {
        alert('No puedes eliminar al último administrador.');
        return;
      }
    }
    
    // Eliminar el documento del usuario en Firestore
    await deleteDoc(doc(db, 'usuarios', userId));
    
    // Intentar eliminar al usuario de Authentication (esto puede fallar si solo se tiene acceso a Firestore)
    try {
      await auth.deleteUser(userId);
    } catch (authError) {
      console.error('No se pudo eliminar al usuario de Authentication:', authError);
      // Continuamos ya que al menos el documento se eliminó de Firestore
    }
    
    await cargarUsuarios();
    alert('Usuario eliminado correctamente.');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    alert('No se pudo eliminar el usuario. Intenta de nuevo.');
  }
};

// ----- GESTIÓN DE CURSOS DE USUARIO -----

// Abrir modal de cursos del usuario
const gestionarCursosUsuario = async (usuario) => {
  usuarioActual.value = usuario;
  cargandoCursosUsuario.value = true;
  showCursosUsuarioModal.value = true;
  cursosUsuario.value = [];
  
  try {
    // Obtener todos los cursos
    const cursosRef = collection(db, 'cursos');
    const cursosSnapshot = await getDocs(cursosRef);
    
    const todosCursos = {};
    cursosSnapshot.forEach((doc) => {
      todosCursos[doc.id] = {
        id: doc.id,
        ...doc.data()
      };
    });
    
    // Obtener los cursos asignados al usuario
    const cursosAsignados = [];
    
    for (const cursoId in todosCursos) {
      const curso = todosCursos[cursoId];
      if (curso.estudiantes && curso.estudiantes.includes(usuario.id)) {
        // Obtener progreso del usuario en este curso si existe
        try {
          const progresoDoc = await getDoc(
            doc(db, `usuarios/${usuario.id}/progreso`, cursoId)
          );
          
          if (progresoDoc.exists()) {
            curso.progreso = progresoDoc.data().porcentajeTotal || 0;
          }
        } catch (error) {
          console.error(`Error al obtener progreso del curso ${cursoId}:`, error);
        }
        
        cursosAsignados.push(curso);
      }
    }
    
    cursosUsuario.value = cursosAsignados;
    
    // Preparar cursos disponibles para asignar (los que no tiene asignados)
    cursosPorAsignar.value = Object.values(todosCursos)
      .filter(curso => !cursosAsignados.some(c => c.id === curso.id))
      .filter(curso => curso.activo !== false); // Solo mostrar cursos activos
    
  } catch (error) {
    console.error('Error al cargar cursos del usuario:', error);
    alert('No se pudieron cargar los cursos del usuario. Intenta de nuevo.');
  } finally {
    cargandoCursosUsuario.value = false;
  }
};

// Cerrar modal de cursos del usuario
const cerrarModalCursosUsuario = () => {
  showCursosUsuarioModal.value = false;
  usuarioActual.value = null;
};

// Abrir formulario para asignar curso
const abrirFormularioAsignarCurso = () => {
  formAsignarCurso.cursoId = '';
  showAsignarCursoForm.value = true;
};

// Cerrar formulario de asignar curso
const cerrarFormularioAsignarCurso = () => {
  showAsignarCursoForm.value = false;
};

// Asignar curso al usuario
const asignarCursoUsuario = async () => {
  if (!usuarioActual.value || !formAsignarCurso.cursoId) return;
  
  guardandoAsignacion.value = true;
  
  try {
    const cursoRef = doc(db, 'cursos', formAsignarCurso.cursoId);
    const cursoDoc = await getDoc(cursoRef);
    
    if (!cursoDoc.exists()) {
      throw new Error('El curso seleccionado no existe.');
    }
    
    const cursoData = cursoDoc.data();
    const estudiantes = cursoData.estudiantes || [];
    
    // Verificar si el usuario ya está asignado
    if (estudiantes.includes(usuarioActual.value.id)) {
      alert('El usuario ya está asignado a este curso.');
      guardandoAsignacion.value = false;
      return;
    }
    
    // Añadir el usuario a la lista de estudiantes
    estudiantes.push(usuarioActual.value.id);
    
    // Actualizar el documento del curso
    await updateDoc(cursoRef, { estudiantes });
    
    // Inicializar progreso del usuario para este curso
    await setDoc(
      doc(db, `usuarios/${usuarioActual.value.id}/progreso`, formAsignarCurso.cursoId),
      {
        porcentajeTotal: 0,
        fechaInicio: serverTimestamp(),
        fechaActualizacion: serverTimestamp()
      }
    );
    
    // Refrescar lista de cursos del usuario
    await gestionarCursosUsuario(usuarioActual.value);
    showAsignarCursoForm.value = false;
    
  } catch (error) {
    console.error('Error al asignar curso:', error);
    alert('No se pudo asignar el curso. Intenta de nuevo.');
  } finally {
    guardandoAsignacion.value = false;
  }
};

// Eliminar curso asignado al usuario
const eliminarCursoUsuario = async (cursoId) => {
  if (!usuarioActual.value) return;
  
  if (!confirm('¿Estás seguro de eliminar este curso del usuario? Se perderá todo el progreso.')) {
    return;
  }
  
  try {
    const cursoRef = doc(db, 'cursos', cursoId);
    const cursoDoc = await getDoc(cursoRef);
    
    if (!cursoDoc.exists()) {
      throw new Error('El curso no existe.');
    }
    
    const cursoData = cursoDoc.data();
    let estudiantes = cursoData.estudiantes || [];
    
    // Eliminar al usuario de la lista de estudiantes
    estudiantes = estudiantes.filter(id => id !== usuarioActual.value.id);
    
    // Actualizar el documento del curso
    await updateDoc(cursoRef, { estudiantes });
    
    // Eliminar progreso del usuario para este curso
    try {
      await deleteDoc(
        doc(db, `usuarios/${usuarioActual.value.id}/progreso`, cursoId)
      );
    } catch (error) {
      console.error('Error al eliminar progreso:', error);
      // Continuamos incluso si hay error, ya que el usuario se eliminó de la lista
    }
    
    // Refrescar lista de cursos del usuario
    await gestionarCursosUsuario(usuarioActual.value);
    
  } catch (error) {
    console.error('Error al eliminar curso del usuario:', error);
    alert('No se pudo eliminar el curso. Intenta de nuevo.');
  }
};

const cargarCursos = async () => {
  loading.value = true;
  try {
    const cursosRef = collection(db, 'cursos');
    const querySnapshot = await getDocs(cursosRef);
    const cursosArray = [];
    querySnapshot.forEach((doc) => {
      cursosArray.push({
        id: doc.id,
        ...doc.data()
      });
    });
    cursos.value = cursosArray;
  } catch (error) {
    console.error('Error al cargar cursos:', error);
    alert('No se pudieron cargar los cursos. Intenta de nuevo.');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  cargarCursos();
  cargarUsuarios();
});
</script>

<style scoped>
/* Estilos para el Panel de Administración */

.admin-container {
    min-height: 100vh;
    background-color: #f8f9fa;
}

/* Header */
.admin-header {
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
    justify-content: space-between;
    align-items: center;
}

.header-content h1 {
    color: #0052af;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: #0052af;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
}

.logout-btn:hover {
    background-color: rgba(0, 82, 175, 0.08);
}

/* Contenido principal */
.admin-content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
}

/* Tabs */
.admin-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
}

.tab-button {
    background: none;
    border: none;
    padding: 0.8rem 1.5rem;
    color: #555;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
}

.tab-button.active {
    color: #0052af;
}

.tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #0052af;
    border-radius: 3px 3px 0 0;
}

/* Sección de contenido */
.tab-content {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 2rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.section-header h2 {
    color: #333;
    margin: 0;
    font-size: 1.5rem;
}

/* Botones */
.add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #0052af;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.add-btn:hover {
    background-color: #003c8f;
    transform: translateY(-2px);
}

/* Estados de carga y vacío */
.loading-container,
.empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 1rem;
    min-height: 200px;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(0, 82, 175, 0.1);
    border-top: 3px solid #0052af;
    border-radius: 50%;
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

.empty-container p {
    color: #757575;
}

/* Lista de cursos */
.cursos-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.curso-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    transition: all 0.3s;
}

.curso-item:hover {
    background-color: #f0f4f8;
}

.curso-info {
    flex: 1;
}

.curso-info h3 {
    margin: 0 0 0.5rem;
    color: #333;
    font-size: 1.2rem;
}

.curso-info p {
    margin: 0;
    color: #757575;
    font-size: 0.9rem;
}

.curso-actions {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    color: #555;
    cursor: pointer;
    transition: all 0.2s;
}

.edit-btn:hover {
    background-color: rgba(33, 150, 243, 0.1);
    color: #2196f3;
}

.semanas-btn:hover {
    background-color: rgba(76, 175, 80, 0.1);
    color: #4caf50;
}

.delete-btn:hover {
    background-color: rgba(244, 67, 54, 0.1);
    color: #f44336;
}

.solucionario-btn:hover {
    background-color: rgba(156, 39, 176, 0.1);
    color: #9c27b0;
}

.recursos-btn:hover {
    background-color: rgba(255, 152, 0, 0.1);
    color: #ff9800;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-container {
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.semanas-modal,
.recursos-modal {
    max-width: 800px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
    margin: 0;
    color: #0052af;
    font-size: 1.5rem;
}

.close-btn {
    background: none;
    border: none;
    color: #757575;
    cursor: pointer;
    display: flex;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s;
}

.close-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #333;
}

.modal-body {
    padding: 1.5rem;
    overflow-y: auto;
}

/* Formularios */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus,
.form-group textarea:focus,
.form-group select:focus {
    border-color: #0052af;
    box-shadow: 0 0 0 2px rgba(0, 82, 175, 0.1);
    outline: none;
}

.checkbox-group {
    display: flex;
    align-items: center;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0;
    cursor: pointer;
}

.form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}

.cancel-btn {
    background: none;
    border: 1px solid #e0e0e0;
    color: #555;
    border-radius: 8px;
    padding: 0.7rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.cancel-btn:hover {
    background-color: #f5f5f5;
}

.save-btn {
    background-color: #0052af;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.save-btn:hover {
    background-color: #003c8f;
}

.save-btn:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
}

/* Semanas */
.semanas-header,
.recursos-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.semanas-header h4,
.recursos-header h4 {
    color: #333;
    margin: 0;
    font-size: 1.2rem;
}

.semanas-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.semana-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    transition: all 0.3s;
}

.semana-item:hover {
    background-color: #f0f4f8;
}

.semana-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.semana-order {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: #0052af;
    color: white;
    border-radius: 50%;
    font-weight: 600;
}

.semana-details h4 {
    margin: 0 0 0.3rem;
    color: #333;
    font-size: 1.1rem;
}

.semana-details p {
    margin: 0;
    color: #757575;
    font-size: 0.9rem;
}

.semana-actions {
    display: flex;
    gap: 0.5rem;
}

/* Recursos */
.recursos-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.recurso-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    transition: all 0.3s;
}

.recurso-item:hover {
    background-color: #f0f4f8;
}

.recurso-tipo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
}

.recurso-tipo.guia {
    background-color: #2196f3;
}

.recurso-tipo.clase {
    background-color: #f44336;
}

.recurso-tipo.tarea {
    background-color: #4caf50;
}

.recurso-info {
    flex: 1;
}

.recurso-info h4 {
    margin: 0 0 0.3rem;
    color: #333;
    font-size: 1.1rem;
}

.recurso-info p {
    margin: 0;
    color: #757575;
    font-size: 0.9rem;
}

.recurso-actions {
    display: flex;
    gap: 0.5rem;
}

/* Formulario de solucionario */
.solucionario-info {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #e8f5e9;
    border-radius: 8px;
    border-left: 4px solid #4caf50;
}

.respuestas-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.respuesta-item {
    margin-bottom: 1rem;
}

/* Nested modal */
.nested-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}

.nested-modal-content {
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .admin-content {
        padding: 0 1rem;
        margin: 1.5rem auto;
    }

    .modal-container {
        width: 95%;
    }

    .curso-item,
    .semana-item,
    .recurso-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .curso-actions,
    .semana-actions,
    .recurso-actions {
        margin-top: 1rem;
        align-self: flex-end;
    }

    .respuestas-list {
        grid-template-columns: 1fr;
    }
}
</style>