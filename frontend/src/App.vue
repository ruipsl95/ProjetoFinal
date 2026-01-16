<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const isLogged = ref(!!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  isLogged.value = false
  router.push('/')
}

router.afterEach(() => {
  isLogged.value = !!localStorage.getItem('token')
})
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
          <div v-if="!isLogged" class="nav-links">
            <RouterLink to="/" class="nav-link">Início</RouterLink>
            <RouterLink to="/docentes" class="nav-link">Docentes</RouterLink>
            <RouterLink to="/login" class="nav-link btn-primary" style="padding: 0.5rem 1rem;">Login</RouterLink>
          </div>

          <div v-else class="nav-links">
            <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
            <RouterLink to="/propostas" class="nav-link">Propostas</RouterLink>
            <a @click="logout" class="nav-link" style="color: red; cursor: pointer;">Sair</a>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>