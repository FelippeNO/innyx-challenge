<template>
  <div class="login-container">
    <h2>Login de Administrador</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input placeholder="emailteste@gmail.com" type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input placeholder="123" type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <div v-if="error" class="mt-3 alert alert-danger">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/AuthStore';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const authStore = useAuthStore();

const login = () => {
  if (email.value === 'emailteste@gmail.com' && password.value === '123') {
    authStore.login();
    router.push('/admin-home');
  } else {
    error.value = 'Email ou senha incorretos.';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
</style>