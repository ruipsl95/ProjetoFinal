<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const docentes = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5001/api/docentes');
    docentes.value = res.data;
  } catch (err) {
    error.value = "Não foi possível carregar a lista. Verifique a ligação.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page-container">
    <div class="header-section">
      <h1>Listagem de Docentes</h1>
      <p>Conheça os professores e as suas áreas de especialização.</p>
    </div>

    <div v-if="loading" class="loading-state">
      <p>A carregar docentes...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="docentes.length === 0" class="empty-state">
      <p>Ainda não existem docentes registados.</p>
    </div>

    <div v-else class="docentes-grid">
      <div v-for="docente in docentes" :key="docente._id" class="docente-card">
        
        <div class="avatar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>

        <h3>{{ docente.nome }}</h3>
        <span class="badge">{{ docente.area_cientifica || 'Geral' }}</span>
        <p class="email">{{ docente.email }}</p>
      
      </div>
    </div>
  </div>
</template>