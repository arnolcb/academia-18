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
import SimulacroView from "../views/SimulacroView.vue";
import SimulacroRanking from "../views/SimulacroRanking.vue";
import SobreNosotros from "../views/AboutView.vue";
import MatriculaVip from "@/views/MatriculaVip.vue";

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

// Verificar si el usuario está autenticado para redireccionar desde login o registro
const redirectIfAuthenticated = (to, from, next) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Si el usuario está autenticado, redirigir a dashboard
      next("/dashboard");
    } else {
      // Si no está autenticado, permitir acceso a la página solicitada
      next();
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
      path: "/sobre-nosotros",
      name: "sobre-nosotros",
      // route level code-splitting
      // this generates a separate chunk (SobreNosotros.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/matriculate",
      name: "matriculate",
      component: () => import("../views/MatriculaView.vue"),
    },
    /*
    {
      path: "/rendir-test",
      name: "rendir-test",
      component: () => import("../views/RendirTestView.vue"),
    },
    */
    {
      path: "/matricula-vip",
      name: "matricula-vip",
      component: () => import("../views/MatriculaVip.vue"),
    },
    {
      path: "/aula-virtual",
      name: "aula-virtual",
      component: () => import("../views/AulavirtualView.vue"),
      beforeEnter: redirectIfAuthenticated, // Usar el nuevo guard de navegación
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
      beforeEnter: redirectIfAuthenticated, // Agregar también aquí
    },
    // Nuevas rutas agregadas
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      beforeEnter: requireAuth, // Solo esta ruta requiere autenticación
    },
    // Ruta para cursos VIP
    {
      path: '/vip/curso/:id',
      name: 'CursoVip',
      component: () => import('@/views/CursoView.vue')
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
    
    {
      path: "/simulacro/:id",
      name: "Simulacro",
      component: () => import("../views/SimulacroView.vue"),
      beforeEnter: requireAuth,
    },
    
    {
      path: "/simulacro/:id/ranking",
      name: "SimulacroRanking",
      component: () => import("../views/SimulacroRanking.vue"),
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
