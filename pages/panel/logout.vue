<template>
  <div></div>
</template>

<script setup lang="ts">
  // Import store
  import { userStore } from '../../stores/user'
  
  // Define store variable
  const user = userStore();

  // Logout user
  user.logout();

  // Redirect to homepage
  navigateTo('/');
</script>