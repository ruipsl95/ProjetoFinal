
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import MinhasPropostas from '../views/MinhasPropostas.vue'
import DocentesView from '../views/DocentesView.vue'
import CriarPropostaView from '../views/CriarPropostaView.vue'
import EditarPropostaView from '../views/EditarPropostaView.vue'
import AdminDocentesView from '../views/AdminDocentesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
   {
      path: '/login',
      name: 'login',
      component: LoginView,
      
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          const role = localStorage.getItem('role');
          if (role === 'admin') next('/admin/docentes');
          else next('/dashboard');
        } else {
          next();
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/propostas',
      name: 'propostas',
      component: MinhasPropostas,
      meta: { requiresAuth: true }, 
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          const role = localStorage.getItem('role');
          if (role === 'admin') next('/admin/docentes');
          else next();
        } 
      }
    }, 
    {
      path: '/propostas/criar',
      name: 'criar-proposta',
      component: CriarPropostaView
    },
    {
  path: '/propostas/editar/:id',
  name: 'editar-proposta',
  component: EditarPropostaView
},
    {
  path: '/docentes',
  name: 'docentes',
  component: DocentesView
}, 
{
  path: '/admin/docentes',
  name: 'admin-docentes',
  component: AdminDocentesView,
  beforeEnter: (to, from, next) => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      next();
    } else {
      alert("Acesso restrito a Administradores.");
      next('/login'); 
    }
  }
}
  ]
})


// Proteção das rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router