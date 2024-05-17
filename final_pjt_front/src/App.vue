<template>
  <body>
    <nav>
      <RouterLink :to = "{name : 'HomeView'}">Home</RouterLink> |
      <RouterLink :to = "{name : 'SignupView'}">Signup</RouterLink> |
      <RouterLink :to = "{name : 'LoginView'}">Login</RouterLink> | 
      <RouterLink :to = "{name : 'ArticlesView'}">Articles</RouterLink> | 
      <RouterLink :to = "{name : 'LatestView'}">Latest</RouterLink> |  
      <RouterLink :to = "{name : 'MovieView'}">Movie</RouterLink> | 
      <RouterLink :to = "{name : 'PopularView'}">Popular</RouterLink> | 
      <RouterLink :to = "{name : 'ProfileView'}">Profile</RouterLink> | 
      <RouterLink :to = "{name : 'StoreView'}">Store</RouterLink>
    </nav>
    <RouterView/>
  </body>
</template>

  <script setup>
  import { RouterLink, RouterView } from 'vue-router'
  
  </script>

<style scoped>

</style>

<style>
@font-face {
    font-family: 'ONE-Mobile-Title';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-Title.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

body {
  font-family: ONE-Mobile-Title;
}
</style>
