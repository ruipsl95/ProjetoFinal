    <script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter(); 

// Dados do Formulário
const novoTitulo = ref('');
const novaDescricao = ref('');
const novasPalavras = ref('');
const aGravar = ref(false);

// Lógica de Autocomplete
const termoPesquisa = ref('');
const sugestoesAlunos = ref([]);
const alunosSelecionados = ref([]);


const pesquisarAlunos = async () => {
  if (termoPesquisa.value.length < 2) { sugestoesAlunos.value = []; return; }
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5001/api/alunos/pesquisa?q=${termoPesquisa.value}`, {
      headers: { 'x-auth-token': token }
    });
    // Filtra os já selecionados
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

// GRAVAÇÃO
const criarProposta = async () => {
  if (!novoTitulo.value || !novaDescricao.value) { alert("Preencha título e descrição!"); return; }
  aGravar.value = true;

  try {
    const token = localStorage.getItem('token');
    const listaNumeros = alunosSelecionados.value.map(a => a.numero_aluno);

    await axios.post('http://localhost:5001/api/propostas', {
      titulo: novoTitulo.value,
      descricao: novaDescricao.value,
      palavrasChave: novasPalavras.value,
      numerosAlunos: listaNumeros
    }, { headers: { 'x-auth-token': token } });

    router.push({ name: 'propostas' }); 

  } catch (err) {
    if (err.response && err.response.data.msg) alert(err.response.data.msg);
    else alert("Erro ao criar proposta.");
  } finally { aGravar.value = false; }
};
</script>

<template>
  <div class="page-container">
    <div class="header-section">
      <h1>Nova Proposta</h1>
      <p>Preencha os detalhes do projeto.</p>
    </div>

    <div class="form-panel">
      
      <div class="form-group">
        <label>Título</label>
        <input v-model="novoTitulo" type="text" class="input-field">
      </div>

      <div class="form-group">
        <label>Descrição</label>
        <textarea v-model="novaDescricao" class="input-field" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label>Palavras-Chave</label>
        <input v-model="novasPalavras" type="text" class="input-field" placeholder="Ex: Vue, Node">
      </div>

      <div class="form-group">
        <label>Atribuir a Grupo de Alunos (Opcional)</label>
        <div class="autocomplete-wrapper">
          <input v-model="termoPesquisa" @input="pesquisarAlunos" type="text" class="input-field" placeholder="Insira um número de aluno ex: a2132132">
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
        <button class="btn-primary" @click="criarProposta" :disabled="aGravar">Gravar</button>
        <button class="btn-secondary" @click="router.push({ name: 'propostas' })">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
</style>