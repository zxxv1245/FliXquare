<template>
  <div class = "profileMainInfoTopDiv">
    <div>
      <img src="@/assets/profileimg.jpg" alt="" class = "profileimgClass">
      <div>
        <h2>유저 이름</h2>
        <button class = "childbtn" @click = "goGenreUpdate">
          <p class = "profileMainInfopTag">{{ counterStore.userGenre[0] }}</p>
          <p class = "profileMainInfopTag">{{ counterStore.userGenre[1] }}</p>
          <p class = "profileMainInfopTag">{{ counterStore.userGenre[2] }}</p>
        </button>
        <button class = "childbtn" @click = "goStore">
          <p class = "profileMainInfopTag">내 찜 목록</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
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