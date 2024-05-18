<template>
  <div class = "child">
    <form @submit.prevent="logIn">
      <h2 class = "h2Tag">로그인</h2>
      <div class = "inputdiv">
        <label for="id"></label>
        <input type="text" id = "id" placeholder="아이디" v-model.trim="username">
      </div>
      <div class = "inputdiv">
        <label for="password"></label>
        <input type="password" id = "password" placeholder="비밀번호" v-model.trim="password">
      </div>
      <div class = "inputdiv">
        <input type="submit" value="로그인">
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
  background-color: rgba(81, 81, 81, 0.7);
  display: inline-block; /* inline-block으로 설정 */
  padding: 20px;
  border-radius: 10%;
  width: 300px;
  height: 400px;
}

.inputdiv {
  margin: 20px;
  text-align: center;
}

.h2Tag {
  text-align: center;
  color: white;
}
</style>