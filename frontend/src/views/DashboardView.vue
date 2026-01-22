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
              <small>Ver lista, editar e aceitar alunos</small>
            </div>
          </button>

          </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* GRID PRINCIPAL */
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* CARDS DE ESTATÍSTICA */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
}

.stat-card:hover { transform: translateY(-3px); }

.stat-card .icon { font-size: 2rem; }
.stat-card h3 { margin: 0; font-size: 2rem; font-weight: 700; color: #1e293b; }
.stat-card p { margin: 0; color: #64748b; font-size: 0.9rem; }

/* Cores dos Cards */
.stat-card.blue { border-left: 5px solid #3b82f6; }
.stat-card.green { border-left: 5px solid #10b981; }

/* BOTÕES DE AÇÃO */
.actions-section h2 { margin-bottom: 1rem; color: #334155; font-size: 1.2rem; }

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.action-btn:hover {
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  border-color: #cbd5e1;
}

.action-btn strong { display: block; font-size: 1.1rem; margin-bottom: 2px; }
.action-btn small { color: #64748b; font-weight: normal; }
.btn-icon { font-size: 1.5rem; }

/* Variações de Botão */
.action-btn.primary { background-color: #eff6ff; border-color: #bfdbfe; color: #1e40af; }
.action-btn.primary:hover { background-color: #dbeafe; }

.action-btn.secondary { background-color: #f0fdf4; border-color: #bbf7d0; color: #166534; }
.action-btn.secondary:hover { background-color: #dcfce7; }
</style>