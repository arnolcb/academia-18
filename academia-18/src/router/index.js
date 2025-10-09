import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView.vue";
import MatriculaView from "@/views/MatriculaView.vue";
import AulavirtualView from "@/views/AulavirtualView.vue";
import CursosView from "@/views/CursosView.vue";
import DashboardView from "../views/DashboardView.vue";
import CursoView from "../views/CursoView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SimulacroView from "../views/SimulacroView.vue";
import SimulacroRanking from "../views/SimulacroRanking.vue";
import SobreNosotros from "../views/AboutView.vue";
import MatriculaVip from "@/views/MatriculaVip.vue";
import SimulacroVipView from "@/views/SimulacroVipView.vue";
import RankingVipView from "@/views/RankingVipView.vue";
import SimulacroGratuitoView from "../views/SimulacroGratuitoView.vue";
import RankingGratuitoView from "@/views/RankingGratuitoView.vue";

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
      // Si el usuario está autenticado, redirigir a dashboard VIP
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
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/matriculate",
      name: "matriculate",
      component: () => import("../views/MatriculaView.vue"),
    },
    {
      path: "/matricula-vip",
      name: "matricula-vip",
      component: () => import("../views/MatriculaVip.vue"),
    },
    // NUEVA RUTA: Clases Gratuitas (sin autenticación)
    {
      path: "/clases-gratuitas",
      name: "clases-gratuitas",
      component: () => import("../views/ClasesGratuitasView.vue"),
    },
    // NUEVA RUTA: Curso individual gratuito (sin autenticación)
    {
      path: "/clase-gratuita/:id",
      name: "clase-gratuita",
      component: () => import("../views/CursoGratuitoView.vue"),
    },
    // Aula Virtual - ahora con login y registro en la misma vista
    {
      path: "/aula-virtual",
      name: "aula-virtual",
      component: () => import("../views/AulavirtualView.vue"),
      beforeEnter: redirectIfAuthenticated,
    },
    {
      path: "/cursos",
      name: "cursos",
      component: () => import("../views/CursosView.vue"),
    },
    // Ruta de registro (mantenida para compatibilidad, pero redirige a aula-virtual)
    {
      path: "/registro-aula-virtual",
      redirect: "/aula-virtual",
    },
    // Dashboard - Solo VIP
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      beforeEnter: requireAuth,
    },
    // Ruta para cursos VIP
    {
      path: "/vip/grupo/:grupo/curso/:id",
      name: "CursoVip",
      component: () => import("@/views/CursoView.vue"),
      beforeEnter: requireAuth,
    },
    // Ruta para cursos regulares (mantenida para compatibilidad, pero no se usa)
    {
      path: "/curso/:id",
      name: "curso",
      component: () => import("../views/CursoView.vue"),
      beforeEnter: requireAuth,
    },
    // Simulacros regulares
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
    /*
    {
      path: "/simulacro-vip/:id",
      name: "SimulacroVip",
      component: SimulacroVipView,
      beforeEnter: requireAuth,
      meta: {
        requiresVip: true, // Opcional: para verificación VIP adicional
      },
    },
    */
    {
      path: "/simulacro-vip/:id/ranking",
      name: "RankingVip",
      component: RankingVipView,
      beforeEnter: requireAuth,
      meta: {
        requiresVip: true, // Opcional: para verificación VIP adicional
      },
    },

    // Pagina 404 para rutas no encontradas
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
    // Ruta para el simulacro gratuito
    /*
    {
      path: "/simulacro-gratuito/:id",
      name: "SimulacroGratuito",
      component: () => import("../views/SimulacroGratuitoView.vue"),
    },
    */
    // Ruta para el ranking del simulacro gratuito
    {
      path: "/simulacro-gratuito/:id/ranking",
      name: "RankingGratuito",
      component: RankingGratuitoView,
    },
    {
      path: "/vip/reto-diario",
      name: "RetoDiario",
      component: () => import("../views/RetoDiarioView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
