<template>
  <div class = "profileMainInfoTopDiv d-flex flex-column align-items-center">
    <img src="@/assets/profileimg.jpg" alt="" class = "profileimgClass my-3">
    <h2>{{ counterStore.userName }}</h2>
    <div class="my-3">
      <button class = "childbtn" @click = "goGenreUpdate">
        <p class = "profileMainInfopTag">{{ counterStore.userGenre[0].name }}</p>
        <p class = "profileMainInfopTag">{{ counterStore.userGenre[1].name }}</p>
        <p class = "profileMainInfopTag">{{ counterStore.userGenre[2].name }}</p>
      </button>
      <button class = "childbtn" @click = "goStore">
        <p class = "profileMainInfopTag">내 찜 목록</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
const router = useRouter()

const goGenreUpdate = function() {
  router.push({name : 'GenreUpdateView'})
}

const goStore = function() {
  router.push({name : 'StoreView'})
}
</script>

<style scoped>
.profileimgClass {
  width: 300px;
  border-radius: 50%;
}

.profileMainInfoTopDiv {
  color: white;
}

.childbtn {
  background-color: rgb(249, 94, 94);
  border: 0px;
  width: 300px;
  height: 50px;
}

.profileMainInfopTag {
  display: inline;
  color: white;
  font-weight: bolder;
  font-size: 15px;
  margin-left: 13px;
  margin-right: 13px;
}
</style>