<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute(); // Para capturar o ID da URL

// Dados do Formulário
const novoTitulo = ref('');
const novaDescricao = ref('');
const novasPalavras = ref('');
const alunosSelecionados = ref([]);
const aGravar = ref(false);
const loading = ref(true);

// Autocomplete
const termoPesquisa = ref('');
const sugestoesAlunos = ref([]);

// --- CARREGAMENTO DOS DADOS AO INICIAR ---
onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const idProposta = route.params.id; 

  
    const res = await axios.get(`http://localhost:5001/api/propostas/${idProposta}`, {
        headers: { 'x-auth-token': token }
    });

    const prop = res.data;

    novoTitulo.value = prop.titulo;
    novaDescricao.value = prop.descricao;
    
    // Converte Array ['Vue', 'Web'] em String "Vue, Web"
    novasPalavras.value = prop.palavrasChave.join(', '); 
    
    alunosSelecionados.value = prop.alunos;

  } catch (err) {
    alert("Erro ao carregar proposta ou proposta não existe.");
    router.push('/propostas'); 
  } finally {
    loading.value = false;
  }
});

// --- LÓGICA DE ALUNOS  ---
const pesquisarAlunos = async () => {
  if (termoPesquisa.value.length < 2) { sugestoesAlunos.value = []; return; }
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5001/api/alunos/pesquisa?q=${termoPesquisa.value}`, { 
        headers: { 'x-auth-token': token } 
    });
    // Filtra os que já estão selecionados
    sugestoesAlunos.value = res.data.filter(a => !alunosSelecionados.value.some(sel => sel._id === a._id));
  } catch (err) { console.error(err); }
};

const adicionarAluno = (aluno) => {
  alunosSelecionados.value.push(aluno);
  termoPesquisa.value = ''; sugestoesAlunos.value = [];
};

const removerAluno = (index) => {
  alunosSelecionados.value.splice(index, 1);
};

// --- ATUALIZAR (PUT) ---
const atualizarProposta = async () => {
  if (!novoTitulo.value || !novaDescricao.value) { alert("Preencha título e descrição!"); return; }
  aGravar.value = true;

  try {
    const token = localStorage.getItem('token');
    
    // Extrair apenas os números dos alunos para enviar
    const listaNumeros = alunosSelecionados.value.map(a => a.numero_aluno);

    await axios.put(`http://localhost:5001/api/propostas/${route.params.id}`, {
      titulo: novoTitulo.value,
      descricao: novaDescricao.value,
      palavrasChave: novasPalavras.value,
      numerosAlunos: listaNumeros
    }, { headers: { 'x-auth-token': token } });

    router.push('/propostas');

  } catch (err) {
    alert("Erro ao atualizar proposta.");
  } finally {
    aGravar.value = false;
  }
};
</script>

<template>
  <div class="page-container">
    <div class="header-section">
      <h1>Editar Proposta</h1>
    </div>

    <div v-if="loading" class="loading-state"><p>A carregar dados...</p></div>

    <div v-else class="form-panel">
      
      <div class="form-group">
        <label>Título</label>
        <input v-model="novoTitulo" type="text" class="input-field">
      </div>

      <div class="form-group">
        <label>Descrição</label>
        <textarea v-model="novaDescricao" class="input-field" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label>Palavras-Chave</label>
        <input v-model="novasPalavras" type="text" class="input-field">
      </div>

      <div class="form-group">
        <label>Alunos</label>
        
        <div class="autocomplete-wrapper">
          <input 
            v-model="termoPesquisa" 
            @input="pesquisarAlunos" 
            type="text" 
            class="input-field" 
            placeholder="Pesquisar e adicionar aluno..."
          >
          <ul v-if="sugestoesAlunos.length > 0" class="suggestions-list">
            <li v-for="aluno in sugestoesAlunos" :key="aluno._id" @click="adicionarAluno(aluno)">
              <span>{{ aluno.nome }}</span> <small>({{ aluno.numero_aluno }})</small>
            </li>
          </ul>
        </div>

        <div class="selected-list" v-if="alunosSelecionados.length > 0">
          <div v-for="(aluno, index) in alunosSelecionados" :key="aluno._id" class="selected-student-tag">
            <span><strong>{{ aluno.nome }}</strong> <small>({{ aluno.numero_aluno }})</small></span>
            <button class="remove-btn" @click="removerAluno(index)">✕</button>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-primary" @click="atualizarProposta" :disabled="aGravar">
          {{ aGravar ? 'A Gravar...' : 'Atualizar Proposta' }}
        </button>
        <button class="btn-secondary" @click="router.push('/propostas')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
.loading-state { text-align: center; padding: 2rem; color: #64748b; }
</style>