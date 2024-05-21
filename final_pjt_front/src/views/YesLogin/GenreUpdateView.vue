<template>
  <div class = "thisisimg parent">
    <h1>선호 장르 선택</h1>
    <h3>선호 장르 3개를 선택해주세요</h3>
    <div class = "middleparent">
      <div class = "child">
        <draggable
          v-model = "counterStore.userGenre"
          :itemKey="mygenre => mygenre.id"
          group = "genres"
          tag = "div"
          class="childchild"
          animation="300">
          <template #item = "{ element : mygenre}">
            <div class = 'draggablediv'>{{ mygenre.name }}</div>
          </template>
        </draggable>
        <draggable
          v-model = "counterStore.genres"
          :itemKey="genre => genre.id"
          group = "genres"
          tag = "div"
          class="childchild"
          animation="300">
          <template #item = "{ element : genre}">
            <div class = 'draggablediv'>{{ genre.name }}</div>
          </template>
        </draggable>
      </div>
      <button class = "GenrebtnClass" @click = "goMovie" v-if = "counterStore.userGenre.length === 3">저장</button>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter'
import draggable from 'vuedraggable'

const counterStore = useCounterStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  counterStore.getGenre()
})

const goMovie = function() {
  counterStore.removeGenre()
  setTimeout(() => {
    counterStore.addGenre()
  },100)
  router.push({name : "MovieView"})
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
}

.child {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  width: 900px;
  height: 500px;
}

.childchild {
  background-color: rgba(65, 65, 65, 0.8);
  padding: 10px;
  margin: 5px;
  width: 450px;
  height: 400px;
}
.thisisimg {
  height: 700px;
  background-image: url('@/assets/backgroundimg.jpg');
  background-size: cover;
  color: white;
}

.GenrebtnClass {
  height: 60px;
  width: 100px;
  font-weight: bolder;
  background-color: rgb(255, 40, 40);
  color: white;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border: 0px;
  margin-top: auto;
  margin-bottom: 0px;
}

.draggablediv { 
  background-color: rgb(99, 99, 99,0.8);
  margin: 5px;
  display: inline-block;
  width: 120px;
  height: 30px;
  text-align: center;
  /* padding-top: 10px; */
}
</style>