<template>
  <main class="w-full min-h-screen bg-base-200 flex flex-col items-center justify-center">
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body" @submit.prevent="login">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input v-model="email" type="email" placeholder="Email" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input v-model="password" type="password" placeholder="Password" class="input input-bordered" required />
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
  // Import store and components
  import { userStore } from '../stores/user'

  // Heading and set body attributes
  useHead({
    title: 'WEB NAME',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: 'WEB NAME' },
      { name: 'keywords', content: 'panel' },
      { name: 'author', content: 'Erfran Darmawan' },

      { name: 'og:title', content: 'WEB NAME' },
      { name: 'og:site_name', content: 'WEB NAME' },
      { name: 'og:description', content: 'WEB NAME' },
      { name: 'og:url', content: 'https://url.com/' },
      { name: 'og:type', content: 'website' },
      { name: 'og:locale', content: 'en_US' },
    ],
  })

  // Variables
  const user = userStore();
  const email = ref('');
  const password = ref('');

  // Redirect for logged in user
  if (user.userData.accessToken){
    navigateTo('/panel');
  }

  // Call login store
  function login(){
    // user.login(email.value, password.value);

    navigateTo('/panel');
  }
</script>