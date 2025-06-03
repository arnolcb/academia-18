// firebase/vipService.js
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './index';

export const vipService = {
  
  // GESTIÓN DE USUARIOS VIP
  
  /**
   * Otorgar acceso VIP a un usuario
   * @param {string} userId - ID del usuario
   * @param {Object} vipData - Datos del acceso VIP
   */
  async otorgarAccesoVip(userId, vipData) {
    try {
      const vipDoc = doc(db, 'usuariosVip', userId);
      await setDoc(vipDoc, {
        ...vipData,
        fechaCreacion: serverTimestamp(),
        estado: 'activo'
      });
      
      console.log('Acceso VIP otorgado exitosamente');
      return true;
    } catch (error) {
      console.error('Error al otorgar acceso VIP:', error);
      throw error;
    }
  },

  /**
   * Verificar si un usuario tiene acceso VIP
   * @param {string} userId - ID del usuario
   */
  async verificarAccesoVip(userId) {
    try {
      const vipDoc = doc(db, 'usuariosVip', userId);
      const vipSnapshot = await getDoc(vipDoc);
      
      if (!vipSnapshot.exists()) {
        return { esVip: false };
      }
      
      const vipData = vipSnapshot.data();
      const ahora = new Date();
      const fechaVencimiento = vipData.fechaVencimiento ? new Date(vipData.fechaVencimiento) : null;
      
      const esVip = vipData.estado === 'activo' && 
                    (!fechaVencimiento || fechaVencimiento > ahora);
      
      return {
        esVip,
        nivelAcceso: vipData.nivelAcceso || 'premium',
        fechaVencimiento: vipData.fechaVencimiento,
        ...vipData
      };
    } catch (error) {
      console.error('Error al verificar acceso VIP:', error);
      return { esVip: false };
    }
  },

  /**
   * Revocar acceso VIP
   * @param {string} userId - ID del usuario
   */
  async revocarAccesoVip(userId) {
    try {
      const vipDoc = doc(db, 'usuariosVip', userId);
      await updateDoc(vipDoc, {
        estado: 'revocado',
        fechaRevocacion: serverTimestamp()
      });
      
      console.log('Acceso VIP revocado exitosamente');
      return true;
    } catch (error) {
      console.error('Error al revocar acceso VIP:', error);
      throw error;
    }
  },

  /**
   * Listar todos los usuarios VIP
   */
  async listarUsuariosVip() {
    try {
      const vipQuery = query(
        collection(db, 'usuariosVip'),
        where('estado', '==', 'activo')
      );
      const querySnapshot = await getDocs(vipQuery);
      
      const usuariosVip = [];
      querySnapshot.forEach((doc) => {
        usuariosVip.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return usuariosVip;
    } catch (error) {
      console.error('Error al listar usuarios VIP:', error);
      throw error;
    }
  },

  // GESTIÓN DE CURSOS VIP
  
  /**
   * Crear un nuevo curso VIP
   * @param {Object} cursoData - Datos del curso VIP
   */
  async crearCursoVip(cursoData) {
    try {
      const cursosVipRef = collection(db, 'cursosVip');
      const docRef = await addDoc(cursosVipRef, {
        ...cursoData,
        fechaCreacion: serverTimestamp(),
        estado: 'activo'
      });
      
      console.log('Curso VIP creado con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear curso VIP:', error);
      throw error;
    }
  },

  /**
   * Obtener todos los cursos VIP activos
   */
  async obtenerCursosVip() {
    try {
      const cursosQuery = query(
        collection(db, 'cursosVip'),
        where('estado', '==', 'activo')
      );
      const querySnapshot = await getDocs(cursosQuery);
      
      const cursosVip = [];
      querySnapshot.forEach((doc) => {
        cursosVip.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return cursosVip;
    } catch (error) {
      console.error('Error al obtener cursos VIP:', error);
      throw error;
    }
  },

  // GESTIÓN DE MATERIALES VIP
  
  /**
   * Subir material VIP
   * @param {Object} materialData - Datos del material
   */
  async subirMaterialVip(materialData) {
    try {
      const materialesVipRef = collection(db, 'materialesVip');
      const docRef = await addDoc(materialesVipRef, {
        ...materialData,
        fechaCreacion: serverTimestamp(),
        descargas: 0,
        calificacion: 0
      });
      
      console.log('Material VIP subido con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al subir material VIP:', error);
      throw error;
    }
  },

  /**
   * Obtener materiales VIP por categoría
   * @param {string} categoria - Categoría del material (opcional)
   */
  async obtenerMaterialesVip(categoria = null) {
    try {
      let materialesQuery;
      
      if (categoria) {
        materialesQuery = query(
          collection(db, 'materialesVip'),
          where('categoria', '==', categoria)
        );
      } else {
        materialesQuery = collection(db, 'materialesVip');
      }
      
      const querySnapshot = await getDocs(materialesQuery);
      
      const materialesVip = [];
      querySnapshot.forEach((doc) => {
        materialesVip.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return materialesVip;
    } catch (error) {
      console.error('Error al obtener materiales VIP:', error);
      throw error;
    }
  },

  /**
   * Registrar descarga de material VIP
   * @param {string} materialId - ID del material
   * @param {string} userId - ID del usuario
   */
  async registrarDescargaMaterial(materialId, userId) {
    try {
      // Incrementar contador de descargas
      const materialDoc = doc(db, 'materialesVip', materialId);
      const materialSnapshot = await getDoc(materialDoc);
      
      if (materialSnapshot.exists()) {
        const currentDownloads = materialSnapshot.data().descargas || 0;
        await updateDoc(materialDoc, {
          descargas: currentDownloads + 1
        });
      }
      
      // Registrar la descarga individual (opcional, para analytics)
      const descargasRef = collection(db, 'descargasVip');
      await addDoc(descargasRef, {
        materialId,
        userId,
        fechaDescarga: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error al registrar descarga:', error);
      throw error;
    }
  },

  // GESTIÓN DE EVENTOS VIP
  
  /**
   * Crear evento VIP
   * @param {Object} eventoData - Datos del evento
   */
  async crearEventoVip(eventoData) {
    try {
      const eventosVipRef = collection(db, 'eventosVip');
      const docRef = await addDoc(eventosVipRef, {
        ...eventoData,
        fechaCreacion: serverTimestamp(),
        registrados: 0,
        estado: 'programado'
      });
      
      console.log('Evento VIP creado con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear evento VIP:', error);
      throw error;
    }
  },

  /**
   * Obtener eventos VIP programados
   */
  async obtenerEventosVip() {
    try {
      const eventosQuery = query(
        collection(db, 'eventosVip'),
        where('estado', 'in', ['programado', 'en_vivo'])
      );
      const querySnapshot = await getDocs(eventosQuery);
      
      const eventosVip = [];
      querySnapshot.forEach((doc) => {
        eventosVip.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Ordenar por fecha de evento
      return eventosVip.sort((a, b) => 
        new Date(a.fechaEvento) - new Date(b.fechaEvento)
      );
    } catch (error) {
      console.error('Error al obtener eventos VIP:', error);
      throw error;
    }
  },

  /**
   * Registrar usuario en evento VIP
   * @param {string} eventoId - ID del evento
   * @param {string} userId - ID del usuario
   */
  async registrarseEnEvento(eventoId, userId) {
    try {
      // Verificar si ya está registrado
      const registroQuery = query(
        collection(db, 'registrosEventosVip'),
        where('eventoId', '==', eventoId),
        where('userId', '==', userId)
      );
      const registroExistente = await getDocs(registroQuery);
      
      if (!registroExistente.empty) {
        throw new Error('Ya estás registrado en este evento');
      }
      
      // Verificar capacidad del evento
      const eventoDoc = doc(db, 'eventosVip', eventoId);
      const eventoSnapshot = await getDoc(eventoDoc);
      
      if (!eventoSnapshot.exists()) {
        throw new Error('Evento no encontrado');
      }
      
      const eventoData = eventoSnapshot.data();
      if (eventoData.registrados >= eventoData.maxParticipantes) {
        throw new Error('Evento lleno');
      }
      
      // Registrar usuario
      const registrosRef = collection(db, 'registrosEventosVip');
      await addDoc(registrosRef, {
        eventoId,
        userId,
        fechaRegistro: serverTimestamp(),
        estado: 'confirmado'
      });
      
      // Incrementar contador de registrados
      await updateDoc(eventoDoc, {
        registrados: eventoData.registrados + 1
      });
      
      console.log('Usuario registrado en evento exitosamente');
      return true;
    } catch (error) {
      console.error('Error al registrarse en evento:', error);
      throw error;
    }
  },

  // GESTIÓN DE NOTIFICACIONES VIP
  
  /**
   * Crear notificación VIP
   * @param {Object} notificacionData - Datos de la notificación
   */
  async crearNotificacionVip(notificacionData) {
    try {
      const notificacionesRef = collection(db, 'notificacionesVip');
      const docRef = await addDoc(notificacionesRef, {
        ...notificacionData,
        fechaCreacion: serverTimestamp(),
        fechaEnvio: serverTimestamp(),
        leida: false
      });
      
      console.log('Notificación VIP creada con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear notificación VIP:', error);
      throw error;
    }
  },

  /**
   * Obtener notificaciones VIP para un usuario
   * @param {string} userId - ID del usuario
   */
  async obtenerNotificacionesVip(userId) {
    try {
      // Obtener notificaciones dirigidas a todos los VIP
      const notificacionesGenerales = query(
        collection(db, 'notificacionesVip'),
        where('usuariosDestino', '==', 'todos')
      );
      
      // Obtener notificaciones específicas para el usuario
      const notificacionesEspecificas = query(
        collection(db, 'notificacionesVip'),
        where('usuariosDestino', 'array-contains', userId)
      );
      
      const [generalesSnapshot, especificasSnapshot] = await Promise.all([
        getDocs(notificacionesGenerales),
        getDocs(notificacionesEspecificas)
      ]);
      
      const notificaciones = [];
      
      generalesSnapshot.forEach((doc) => {
        notificaciones.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      especificasSnapshot.forEach((doc) => {
        notificaciones.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Ordenar por fecha de creación (más recientes primero)
      return notificaciones.sort((a, b) => 
        new Date(b.fechaCreacion?.toDate?.() || b.fechaCreacion) - 
        new Date(a.fechaCreacion?.toDate?.() || a.fechaCreacion)
      );
    } catch (error) {
      console.error('Error al obtener notificaciones VIP:', error);
      throw error;
    }
  },

  /**
   * Marcar notificación como leída
   * @param {string} notificacionId - ID de la notificación
   */
  async marcarNotificacionLeida(notificacionId) {
    try {
      const notificacionDoc = doc(db, 'notificacionesVip', notificacionId);
      await updateDoc(notificacionDoc, {
        leida: true,
        fechaLectura: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      throw error;
    }
  },

  // ANÁLITICAS VIP
  
  /**
   * Obtener estadísticas del sistema VIP
   */
  async obtenerEstadisticasVip() {
    try {
      const [usuariosVip, cursosVip, eventosVip, materialesVip] = await Promise.all([
        this.listarUsuariosVip(),
        this.obtenerCursosVip(),
        this.obtenerEventosVip(),
        this.obtenerMaterialesVip()
      ]);
      
      return {
        totalUsuariosVip: usuariosVip.length,
        totalCursosVip: cursosVip.length,
        totalEventosVip: eventosVip.length,
        totalMaterialesVip: materialesVip.length,
        usuariosActivos: usuariosVip.filter(u => u.estado === 'activo').length
      };
    } catch (error) {
      console.error('Error al obtener estadísticas VIP:', error);
      throw error;
    }
  }
};

// Ejemplo de uso en tu componente Vue:
/*
import { vipService } from '@/firebase/vipService';

// En tu script setup
const verificarAccesoVip = async (userId) => {
  const resultado = await vipService.verificarAccesoVip(userId);
  esUsuarioVip.value = resultado.esVip;
  if (resultado.esVip) {
    await cargarContenidoVip();
  }
};

const cargarContenidoVip = async () => {
  try {
    const [cursos, eventos, materiales] = await Promise.all([
      vipService.obtenerCursosVip(),
      vipService.obtenerEventosVip(),
      vipService.obtenerMaterialesVip()
    ]);
    
    cursosVip.value = cursos;
    eventosVip.value = eventos;
    materialesVip.value = materiales;
  } catch (error) {
    console.error('Error al cargar contenido VIP:', error);
  }
};
*/