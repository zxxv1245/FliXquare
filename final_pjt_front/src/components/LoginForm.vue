<template>
  <div class = "child">
    <form @submit.prevent="logIn">
      <h2 class = "h2Tag mt-4">로그인</h2>
      <div class = "inputdiv mt-4 mb-3">
        <label for="id"></label>
        <input type="text" id = "id" placeholder="아이디" v-model.trim="username" class="inputClass rounded">
      </div>
      <div class = "inputdiv my-4">
        <label for="password"></label>
        <input type="password" id = "password" placeholder="비밀번호" v-model.trim="password" class = "inputClass rounded">
      </div>
      <div class = "inputdiv mt-5">
        <input type="submit" value="로그인" class = "submitClass btn">
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const username = ref(null)
const password = ref(null)
const store = useCounterStore()

const logIn = function () {
  const payload = {
    username: username.value,
    password: password.value
  }
  store.logIn(payload)
}

</script>

<style scoped>
.child {
  background-color: rgba(0, 0, 0, 0.8);
  display: inline-block; /* inline-block으로 설정 */
  padding: 20px;
  border-radius: 10%;
  width: 28vw;
  height: 400px;
}

.inputdiv {
  text-align: center;  
}

.h2Tag {
  text-align: center;
  color: white;
}

.inputClass {
  width: 25vw;
  height: 40px;
  border: 0px;
  background-color: rgb(40, 40, 40, 0.5);
  color: white;
  padding-left: 8px;
}

.submitClass {
  width: 25vw;
  height: 40px;
  background-color: rgb(255, 40, 40);
  color: white;
  font-weight: bolder;
  font-size: 15px;
  border: 0px;
}


</style>