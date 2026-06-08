<script setup lang="ts">
import '~/assets/css/login.css';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref<string | null>(null);

// fake global user state (replace later with real auth)
const user = useState('user', () => null);

const onSubmit = async () => {
  errorMessage.value = null;
  loading.value = true;

  try {
    // TODO: replace with real API call:
    // const { error } = await useFetch('/api/login', {
    //   method: 'POST',
    //   body: { email: email.value, password: password.value },
    // });
    // if (error.value) throw error.value;

    // temporary fake success
    await new Promise((r) => setTimeout(r, 600));
    user.value = { email: email.value };

    await navigateTo('/dashboard');
  } catch (err: any) {
    errorMessage.value =
      err?.statusMessage || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <header class="auth-header">
        <p class="auth-eyebrow">Access</p>
        <h1>Sign in to your dashboard</h1>
        <p class="auth-subtitle">
          Enter your credentials to continue.
        </p>
      </header>

      <form @submit.prevent="onSubmit" class="auth-form">
        <div class="auth-field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
          />
        </div>

        <div class="auth-field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <button type="submit" class="auth-button">
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>