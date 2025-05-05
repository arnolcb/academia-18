// src/firebase/index.js - Versión optimizada
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { 
  getFirestore, 
  connectFirestoreEmulator
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tu configuración de Firebase
/*
const firebaseConfig = {
  apiKey: "AIzaSyDEfs5v0cM0M9Gs8hI1sXOK_HJP4QM7N_w",
  authDomain: "academia18-aulavirtual.firebaseapp.com",
  projectId: "academia18-aulavirtual",
  storageBucket: "academia18-aulavirtual.appspot.com", // Corregido el dominio del storage
  //storageBucket: "academia18-aulavirtual.firebasestorage.app",
  messagingSenderId: "409830871969",
  appId: "1:409830871969:web:8f5720f6ae2cb4d849b1e0",
};
*/

const firebaseConfig = {
    apiKey: "AIzaSyDaJGphulPRfaruzmTiYiK0nU9qRuM2bcU",
  authDomain: "academia18-ba199.firebaseapp.com",
  projectId: "academia18-ba199",
  storageBucket: "academia18-ba199.firebasestorage.app",
  messagingSenderId: "131705200838",
  appId: "1:131705200838:web:ed4482fc353949d0f337c7"
};

// Inicializar Firebase con configuración explícita
const app = initializeApp(firebaseConfig);

// Inicializar Auth primero
const auth = getAuth(app);

// Inicializar Firestore con configuración simple (sin opciones avanzadas por ahora)
const db = getFirestore(app);

// Storage
const storage = getStorage(app);

// Servicio de autenticación
export const authService = {
  // Iniciar sesión
  async login(email, password, rememberMe = false) {
    try {
      // Establecer persistencia según la opción de recordar
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      throw error;
    }
  },

  // Función para verificar si un correo existe
  async verificarCorreoExistente(email) {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      console.error('Error al verificar correo:', error);
      return false;
    }
  },

  // Registrar nuevo usuario - ahora incluye verificación de correo existente
  async register(email, password, userData) {
    try {
      // Verificar si el correo ya existe
      const emailMethods = await fetchSignInMethodsForEmail(auth, email);
      if (emailMethods.length > 0) {
        throw new Error('Este correo electrónico ya está registrado');
      }
      
      // Crear el usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential.user;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  },

  // Obtener usuario actual
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  },
};

// Exportamos las variables y servicios
export { auth, db, storage };
export default app;