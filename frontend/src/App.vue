<script setup>
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Variáveis simples para controlar o menu
const estaLogado = ref(false);
const ehAdmin = ref(false);

// Função que vai ao localStorage ver se existimos
const verificarLogin = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  estaLogado.value = !!token; // Se tem token, é true
  ehAdmin.value = role === 'admin';
};
watch(route, () => {
  verificarLogin();
});

const logout = () => {
  localStorage.clear();
  verificarLogin(); // Atualiza logo o botão
  router.push('/login');
};
</script>

<template>
  <div class="app-layout">
    <header>
      <nav class="navbar">
        <div class="logo-container">
          <div class="logo-icon">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" /></svg>
          </div>
          <span class="logo-text">GestãoProjetos</span>
        </div>

        <div class="menu-items">
          <div class="nav-links">
            <RouterLink v-if="!estaLogado" to="/" class="nav-link">Início</RouterLink>
            <RouterLink v-if="!estaLogado" to="/docentes" class="nav-link">Docentes</RouterLink>
            <RouterLink v-if="!estaLogado" to="/login" class="nav-link btn-primary" style="padding: 0.5rem 1rem;">Login</RouterLink>
           <RouterLink v-if="ehAdmin" to="/admin/docentes" style="color:red">Gestão Docentes</RouterLink>
            <RouterLink v-if="estaLogado && !ehAdmin" to="/dashboard" class="nav-link">Dashboard</RouterLink>
            <RouterLink v-if="estaLogado && !ehAdmin" to="/propostas" class="nav-link">Propostas</RouterLink>
            <button v-if="estaLogado" @click="logout" class="btn-logout">Sair</button>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>
<style scoped>
/* Estilos da Navbar */
.main-navbar {
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.8rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text { font-weight: 800; font-size: 1.2rem; color: #2563eb; }

nav { display: flex; align-items: center; gap: 20px; }

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover { color: #2563eb; }
.router-link-active { color: #2563eb; font-weight: 700; }

/* Destaque para o link de Admin */
.admin-link { color: #b91c1c !important; } 
.admin-link:hover { color: #991b1b !important; }

.auth-buttons { margin-left: 10px; border-left: 1px solid #e2e8f0; padding-left: 20px; }

.btn-login {
  background-color: #2563eb; color: white; padding: 8px 16px; 
  border-radius: 6px; text-decoration: none; font-size: 0.9rem;
}
.btn-logout {
  background-color: #ef4444; color: white; padding: 8px 16px;
  border-radius: 6px; border: none; cursor: pointer; font-size: 0.9rem;
}
</style>