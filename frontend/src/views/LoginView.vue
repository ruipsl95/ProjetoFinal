<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()
const erro = ref('')

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5001/api/auth', {
      email: email.value,
      password: password.value
    });

    // 1. Guardar Token E Role
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role); // <--- O Backend agora manda isto

    // 2. Redirecionamento Inteligente
    if (res.data.role === 'admin') {
      // Se for Admin, vai para a gestão de docentes
      router.push('/admin/docentes');
    } else {
      // Se for Docente, vai para o dashboard normal
      router.push('/dashboard');
    }

  } catch (err) {
    alert(err.response?.data?.msg || 'Login falhou');
  }
};
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2>Login Docente</h2>

      <div class="form-group">
        <label>Email:</label>
        <input 
          type="email" 
          v-model="email" 
          placeholder="exemplo@uab.pt" 
        />
      </div>

      <div class="form-group">
        <label>Palavra-passe:</label>
        <input 
          type="password" 
          v-model="password"  
          placeholder="********" 
        />
      </div>

      <p v-if="erro" class="error-msg">{{ erro }}</p>

      <button @click="handleLogin" class="btn-login">
        Entrar
      </button>
    </div>
  </div>
</template>


<style scoped src="@/assets/login.css"></style>