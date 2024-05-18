<template>
  <body>
    <nav v-if = "route.name !== 'GenreUpdateView'">
      <div>
        <RouterLink :to = "{name : 'HomeView'}" v-if = "!store.isLogin"><img src="@/assets/FliXquareLogo.png" alt="" class = "logoClass"></RouterLink>
        <RouterLink :to = "{name : 'MovieView'}" v-if = "store.isLogin"><img src="@/assets/FliXquareLogo.png" alt="" class = "logoClass"></RouterLink> 
        <RouterLink :to = "{name : 'LatestView'}" v-if = "store.isLogin">Latest</RouterLink> 
        <RouterLink :to = "{name : 'PopularView'}" v-if = "store.isLogin">Popular</RouterLink>
        <RouterLink :to = "{name : 'StoreView'}" v-if = "store.isLogin">Store</RouterLink>
      </div>
      <div>
        <RouterLink :to = "{name : 'ArticlesView'}" v-if = "store.isLogin">Articles</RouterLink> 
        <RouterLink :to = "{name : 'ProfileView'}" v-if = "store.isLogin">Profile</RouterLink> 
        <button @click = "signup" class = "btnClass" v-if = "!store.isLogin">회원가입</button>
        <button @click = "login" class = "btnClass" v-if = "!store.isLogin">로그인</button>
      </div>
    </nav>
    <RouterView/>
  </body>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute,useRouter } from 'vue-router';
import { useCounterStore } from './stores/counter';

const store = useCounterStore()
const router = useRouter()
const route = useRoute()

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
  border: 0px;
}
</style>
