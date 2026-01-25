<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const docentes = ref([]);
const novoDocente = ref({ nome: '', email: '', password: '', area_cientifica: '' });

// Carregar Lista de Docentes
const carregarDocentes = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5001/api/docentes', {
      headers: { 'x-auth-token': token }
    });
    docentes.value = res.data;
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 403) {
      alert("Sessão expirada ou sem permissão.");
      router.push('/login');
    }
  }
};

// Criar Novo Docente
const criarDocente = async () => {
  if (!novoDocente.value.nome || !novoDocente.value.email || !novoDocente.value.password) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5001/api/docentes', novoDocente.value, {
      headers: { 'x-auth-token': token }
    });
    
    alert("Docente criado com sucesso!");
    novoDocente.value = { nome: '', email: '', password: '', area_cientifica: '' }; 
    carregarDocentes(); 
  } catch (err) {
    alert("Erro: " + (err.response?.data?.msg || "Erro ao criar"));
  }
};

// Apagar Docente
const apagarDocente = async (id) => {
  if (!confirm("Tem a certeza que quer remover este docente? Todas as propostas dele serão afetadas.")) return;
  
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5001/api/docentes/${id}`, {
      headers: { 'x-auth-token': token }
    });
    carregarDocentes();
  } catch (err) {
    alert("Erro ao apagar.");
  }
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

onMounted(carregarDocentes);
</script>

<template>
  <div class="page-container">
    <div class="header-flex">
      <h1>Painel de Administração</h1>
    </div>
    
    <p>Gestão de Contas de Docentes</p>

    <div class="admin-panel">
      <h3>Adicionar Novo Docente</h3>
      <div class="form-grid">
        <input v-model="novoDocente.nome" placeholder="Nome Completo" class="input-field">
        <input v-model="novoDocente.email" placeholder="Email (Login)" class="input-field">
        <input v-model="novoDocente.password" type="password" placeholder="Password" class="input-field">
        <input v-model="novoDocente.area_cientifica" placeholder="Área Científica" class="input-field">
        <button @click="criarDocente" class="btn-primary">Criar Conta</button>
      </div>
    </div>

    <div class="list-container">
      <h3>Docentes Registados ({{ docentes.length }})</h3>
      
      <table class="docentes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Área</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in docentes" :key="d._id">
            <td>{{ d.nome }}</td>
            <td>{{ d.email }}</td>
            <td>{{ d.area_cientifica || '-' }}</td>
            <td>
              <button class="btn-delete" @click="apagarDocente(d._id)" title="Remover conta">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped src="@/assets/admin.css"></style>