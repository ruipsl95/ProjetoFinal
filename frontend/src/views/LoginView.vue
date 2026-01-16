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
    // Tenta fazer login na API
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    })

    // Se correr bem: guarda o token e vai para o dashboard
    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
    
  } catch (err) {
    // Se der erro (ex: password errada)
    erro.value = 'Credenciais inválidas. Tente novamente.'
  }
}
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

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  min-height: 80vh;
}

.login-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: #333;
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box; /* Garante que o padding não aumenta a largura */
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-login {
  width: 100%;
  background-color: #3b82f6; /* Azul igual ao da Home */
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.btn-login:hover {
  background-color: #2563eb;
}

.error-msg {
  color: #dc2626;
  font-size: 0.85rem;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 15px;
}
</style>