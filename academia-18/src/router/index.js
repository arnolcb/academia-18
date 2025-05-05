import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView.vue";
import MatriculaView from "@/views/MatriculaView.vue";
import RendirTestView from "@/views/RendirTestView.vue";
import AulavirtualView from "@/views/AulavirtualView.vue";
import CursosView from "@/views/CursosView.vue";
import Matricula2View from "@/views/Matricula2View.vue";
import DashboardView from "../views/DashboardView.vue";
import CursoView from "../views/CursoView.vue";
import NotFoundView from "../views/NotFoundView.vue";

// Verificación de autenticación solo para dashboard y curso view
const requireAuth = (to, from, next) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario autenticado, permitir acceso
      next();
    } else {
      // No autenticado, redirigir al login
      next("/aula-virtual");
    }
  });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/matriculate",
      name: "matriculate",
      component: () => import("../views/MatriculaView.vue"),
    },
    {
      path: "/rendir-test",
      name: "rendir-test",
      component: () => import("../views/RendirTestView.vue"),
    },
    {
      path: "/aula-virtual",
      name: "aula-virtual",
      component: () => import("../views/AulavirtualView.vue"),
    },
    {
      path: "/cursos",
      name: "cursos",
      component: () => import("../views/CursosView.vue"),
    },
    {
      /*Esta es el form de matricula conectado a firebase*/
      path: "/registro-aula-virtual",
      name: "registro-aula-virtual",
      component: () => import("../views/Matricula2View.vue"),
    },
    // Nuevas rutas agregadas
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      beforeEnter: requireAuth, // Solo esta ruta requiere autenticación
    },
    {
      path: "/curso/:id",
      name: "curso",
      component: () => import("../views/CursoView.vue"),
      beforeEnter: requireAuth, // Solo esta ruta requiere autenticación
    },
    {
      // Pagina 404 para rutas no encontradas
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
    //Agregar vistas demos de dashboard y cursos funcionales sin autenticación
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
    }
  ],
});

export default router;
