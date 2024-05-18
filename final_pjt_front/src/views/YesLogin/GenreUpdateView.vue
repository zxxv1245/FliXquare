<template>
  <div class = "thisisimg parent">
    <h1>선호 장르 선택</h1>
    <div class = "middleparent">
      <div class = "child">
        <div class = "childchild">선호 장르</div>
        <div class = "childchild">전체 장르</div>
      </div>
      <button class = "GenrebtnClass" @click = "goMovie">다음으로</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute,useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const goMovie = function() {
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
  width: 400px;
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
</style>