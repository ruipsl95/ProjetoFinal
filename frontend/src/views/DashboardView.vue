<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const propostas = ref([]);

// ESTADO / ESTATÍSTICAS SIMPLIFICADAS
const stats = computed(() => {
  if (!propostas.value.length) return { total: 0, alunos: 0 };

  return {
    // Total de propostas criadas
    total: propostas.value.length,
    
    // Total de alunos já aceites (Soma dos arrays de alunos)
    alunos: propostas.value.reduce((acc, p) => acc + (p.alunos ? p.alunos.length : 0), 0)
  };
});

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const res = await axios.get('http://localhost:5001/api/propostas/me', {
      headers: { 'x-auth-token': token }
    });
    
    propostas.value = res.data;

  } catch (err) {
    console.error("Erro ao carregar dashboard", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page-container">
    
    <div class="header-section">
      <h1>Dashboard</h1>
      <p>Bem-vindo à tua área de gestão.</p>
    </div>

    <div v-if="loading" class="loading-state">A carregar informações...</div>

    <div v-else class="dashboard-grid">
      
      <div class="stats-container">
        
        <div class="stat-card blue">
          <div class="info">
            <h3>{{ stats.total }}</h3>
            <p>Total de Propostas</p>
          </div>
        </div>

        <div class="stat-card green">
          <div class="info">
            <h3>{{ stats.alunos }}</h3>
            <p>Alunos Orientados</p>
          </div>
        </div>

      </div>

      <div class="actions-section">
        <h2>Acesso Rápido</h2>
        <div class="buttons-grid">
          
          <button class="action-btn primary" @click="router.push('/propostas/criar')">
            <span class="btn-icon">+</span>
            <div>
              <strong>Criar Nova Proposta</strong>
              <small>Lançar um novo tema</small>
            </div>
          </button>

          <button class="action-btn secondary" @click="router.push('/propostas')">
            <span class="btn-icon">📋</span>
            <div>
              <strong>Gerir Minhas Propostas</strong>
              <small>Ver lista, editar e remover propostas</small>
            </div>
          </button>

          </div>
      </div>

    </div>
  </div>
</template>

<style scoped src="@/assets/dashboard.css"></style>