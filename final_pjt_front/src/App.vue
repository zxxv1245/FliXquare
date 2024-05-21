<template>
  <main>
    <div class="d-flex flex-column align-items-center w-100">
      <nav v-if = "route.name !== 'GenreUpdateView'" class="d-flex justify-content-between w-100">
        <div>
          <RouterLink :to = "{name : 'HomeView'}" v-if = "!store.isLogin"><img src="@/assets/FliXquareLogo.png" alt="" class = "logoClass"></RouterLink>
          <RouterLink :to = "{name : 'MovieView'}" v-if = "store.isLogin"><img src="@/assets/FliXquareLogo.png" alt="" class = "logoClass"></RouterLink> 
          <RouterLink :to = "{name : 'LatestView'}" v-if = "store.isLogin" class="h5 text-white">최신 영화 목록</RouterLink> 
          <RouterLink :to = "{name : 'PopularView'}" v-if = "store.isLogin" class="h5 text-white">인기 영화</RouterLink>
          <RouterLink :to = "{name : 'ArticlesView'}" v-if = "store.isLogin" class="h5 text-white">커뮤니티</RouterLink> 
        </div>
        <div>
          <RouterLink :to = "{name : 'StoreView'}" v-if = "store.isLogin" class="h5 text-white">내 찜 목록</RouterLink>
          <RouterLink :to = "{name : 'ProfileView'}" v-if = "store.isLogin" class="h5 text-white">프로필</RouterLink> 
          <button @click = "signup" class = "btnClass" v-if = "!store.isLogin">회원가입</button>
          <button @click = "login" class = "btnClass" v-if = "!store.isLogin">로그인</button>
          <button @click = "logout" class = "btnClass" v-if = "store.isLogin && route.name === 'ProfileView'">로그아웃</button>
        </div>
      </nav>
      <RouterView class="w-100"/>
    </div>
  </main>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useMoviestore } from './stores/movies';
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from './stores/counter';

const moviestore = useMoviestore()
const store = useCounterStore()
const router = useRouter()
const route = useRoute()

const signup = function() {
  router.push({name : 'SignupView'})
}
const login = function() {
  router.push({name : 'LoginView'})
}

const logout = function() {
  router.push({name : 'HomeView'})
  store.logOut()
}

onMounted(() => {
  moviestore.fillMovies();
  moviestore.fillLatest();
})

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
  font-family: ONE-Mobile-Title !important;
  background-color: rgba(15, 15, 15, 1) !important;
  margin: 0px !important;
}

nav {
  display: flex !important;
  justify-content: space-between !important;
  background: linear-gradient(to top, rgba(57, 57, 57, 0), rgba(0, 0, 0, 1)) !important;
  padding: 1rem !important;
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
  width: 120px;
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