<template>
  <div class="thisisimg parent">
    <h1>선호 장르 선택</h1>
    <h3>선호 장르 3개를 선택해주세요</h3>
    <div class="middleparent">
      <div class="child left-column">
        <h2>선택한 장르</h2>
        <draggable
          v-model="counterStore.userGenre"
          :itemKey="mygenre => mygenre.id"
          group="genres"
          tag="div"
          class="childchild"
          animation="300">
          <template #item="{ element: mygenre }">
            <div class='draggablediv'>{{ mygenre.name }}</div>
          </template>
        </draggable>
      </div>
      <div class="child right-column">
        <h2>전체 장르</h2>
        <draggable
          v-model="counterStore.genres"
          :itemKey="genre => genre.id"
          group="genres"
          tag="div"
          class="childchild"
          animation="300">
          <template #item="{ element: genre }">
            <div class='draggablediv'>{{ genre.name }}</div>
          </template>
        </draggable>
      </div>
    </div>
    <button class="GenrebtnClass" :disabled="counterStore.userGenre.length !== 3" @click="goMovie">저장</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter'
import { useMoviestore } from '@/stores/movies'
import draggable from 'vuedraggable'

const counterStore = useCounterStore()
const movieStore = useMoviestore()
const router = useRouter()

onMounted(() => {
  counterStore.getGenre()
})

const goMovie = function () {
  counterStore.removeGenre()
  setTimeout(() => {
    movieStore.getUserGenre()
    counterStore.addGenre()
    movieStore.getGenre()
    movieStore.ChatGpt(movieStore.apiMessages)
    // 시현할 때, 풀면 됨
  }, 100)

  setTimeout(() => {
    router.push({ name: "MovieView" })
  }, 2400)
}
</script>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.middleparent {
  display: flex;
  width: 100%;
  max-width: 900px;
}

.child {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  width: 50%;
  height: 500px;
}

.childchild {
  background-color: rgba(65, 65, 65, 0.8);
  padding: 10px;
  margin: 5px;
  width: 100%;
  height: 400px;
  overflow-y: auto;
}

.thisisimg {
  height: 950px;
  background-image: url('@/assets/backgroundimg.jpg');
  background-size: cover;
  color: white;
  text-align: center;
}

.GenrebtnClass {
  height: 60px;
  width: 100px;
  font-weight: bolder;
  background-color: rgb(255, 40, 40);
  color: white;
  padding: 10px;
  margin: 20px;
  border: 0px;
  border-radius: 15%;
  cursor: pointer;
}

.GenrebtnClass:disabled {
  background-color: #999999;
  cursor: not-allowed;
}
.draggablediv { 
  background-color: rgb(99, 99, 99, 0.8);
  margin: 5px;
  display: inline-block;
  width: 120px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}
</style>
