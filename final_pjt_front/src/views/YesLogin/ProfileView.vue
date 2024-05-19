<template>
  <div>
    <ProfileMainInfo/>
    <RouterLink :to = "{name : 'ProfileUpdateView'}">ProfileUpdateView</RouterLink>
    
  </div>
  <RouterView/>
</template>

<script setup>
  import { RouterLink,RouterView } from 'vue-router'
  import ProfileMainInfo from '@/components/ProfileMainInfo.vue';
</script>

<style scoped>

</style>