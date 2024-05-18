<template>
  <body>
    <nav>
      <div>
        <RouterLink :to = "{name : 'HomeView'}"><img src="@/assets/FliXquareLogo.png" alt="" class = "logoClass"></RouterLink>
        <RouterLink :to = "{name : 'MovieView'}">Movie</RouterLink> 
        <RouterLink :to = "{name : 'LatestView'}">Latest</RouterLink> 
        <RouterLink :to = "{name : 'PopularView'}">Popular</RouterLink>
        <RouterLink :to = "{name : 'StoreView'}">Store</RouterLink>
      </div>
      <div>
        <RouterLink :to = "{name : 'ArticlesView'}">Articles</RouterLink> 
        <RouterLink :to = "{name : 'ProfileView'}">Profile</RouterLink> 
        <button @click = "signup" class = "btnClass">회원가입</button>
        <button @click = "login" class = "btnClass">로그인</button>
      </div>
    </nav>
    <RouterView/>
  </body>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const router = useRouter()


const signup = function() {
  router.push({name : 'SignupView'})
}
const login = function() {
  router.push({name : 'LoginView'})
}

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

nav {
  display: flex;
  position: absolute;
  justify-content: space-between;
  background: linear-gradient(to top, rgba(57, 57, 57, 0), rgba(0, 0, 0, 1));
  font-size: 20px;
  padding: 20px;
  width: 95%;
}

nav a {
  text-decoration: none;
  color: white;
  padding: 5px;
  margin-left : 5px;
  margin-right: 5px;
}

.logoClass {
  display: inline;
  width: 100px;
}

.btnClass {
  font-weight: bolder;
  background-color: rgb(255, 40, 40);
  color: white;
  padding: 10px;
  border-radius: 15%;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
