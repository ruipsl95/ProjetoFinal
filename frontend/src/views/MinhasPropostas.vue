<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter(); 
const propostas = ref([]);
const loading = ref(true);

// CARREGAMENTO DAS PROPOSTAS
const carregarPropostas = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const res = await axios.get('http://localhost:5001/api/propostas/me', {
      headers: { 'x-auth-token': token }
    });
    propostas.value = res.data;
  } catch (err) {
    console.error("Erro ao carregar:", err);
  } finally {
    loading.value = false;
  }
};

// APAGAR PROPOSTA
const apagarProposta = async (id) => {
  if (!confirm("Tem a certeza que deseja eliminar esta proposta?")) return;

  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5001/api/propostas/${id}`, {
      headers: { 'x-auth-token': token }
    });

    propostas.value = propostas.value.filter(p => p._id !== id);
  } catch (err) {
    alert("Erro ao eliminar. Tente novamente.");
    console.error(err);
  }
};

onMounted(() => {
  carregarPropostas();
});
</script>

<template>
  <div class="page-container">
    <div class="header-section">
      <h1>Minhas Propostas</h1>
      <p>Faça a gestão dos temas de propostas.</p>
    </div>

    <div class="action-bar">
      <button class="btn-primary" @click="router.push('/propostas/criar')">
        + Criar Nova Proposta
      </button>
    </div>

    <div v-if="loading" class="loading-state"><p>A carregar...</p></div>
    
    <div v-else-if="propostas.length === 0" class="empty-state">
      <p>Ainda não tem propostas criadas.</p>
    </div>

    <div v-else class="propostas-list">
      <div v-for="prop in propostas" :key="prop._id" class="proposta-item">
        
        <div class="proposta-content">
          <div class="titulo-row">
            <h3>{{ prop.titulo }}</h3>
            <span class="status-badge" :class="prop.status === 'Disponível' ? 'status-disponivel' : 'status-atribuida'">
              {{ prop.status }}
            </span>
          </div>

          <p class="desc">{{ prop.descricao }}</p>
          
          <div class="tags-container" v-if="prop.palavrasChave && prop.palavrasChave.length > 0">
            <span v-for="tag in prop.palavrasChave" :key="tag" class="tag-badge">#{{ tag }}</span>
          </div>

          <div v-if="prop.alunos && prop.alunos.length > 0" class="alunos-assigned">
             <strong>🎓 Grupo:</strong>
             <span v-for="(a, index) in prop.alunos" :key="a._id" class="aluno-nome">
               {{ a.nome }}<span v-if="index < prop.alunos.length - 1">, </span>
             </span>
          </div>
        </div>

        <div class="proposta-actions">
          <button class="btn-icon btn-edit" @click="router.push(`/propostas/editar/${prop._id}`)" title="Editar">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
          </button>
          <button class="btn-icon btn-delete" @click="apagarProposta(prop._id)" title="Eliminar">
           <svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos Específicos desta página */

.titulo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.titulo-row h3 { margin: 0; font-size: 1.2rem; }

.desc { color: #64748b; margin-bottom: 1rem; }

.proposta-item {
  display: flex;
  justify-content: space-between;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.proposta-content { flex: 1; padding-right: 1rem; }

.proposta-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-icon {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-edit { background-color: #eff6ff; }
.btn-edit:hover { background-color: #dbeafe; }

.btn-delete { background-color: #fef2f2; }
.btn-delete:hover { background-color: #fee2e2; }

.aluno-nome { font-size: 0.9rem; color: #475569; }
.alunos-assigned { margin-top: 10px; }
</style>