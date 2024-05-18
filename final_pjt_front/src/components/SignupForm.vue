<template>
  <div class = "child">
    <form @submit.prevent="signUp">
      <h2 class = "h2Tag">회원가입</h2>
      <div class = "inputdiv">
        <label for="id"></label>
        <input type="text" id = "id" placeholder="아이디" v-model.trim="username" class = "inputClass">
      </div>
      <div class = "inputdiv">
        <label for="password1"></label>
        <input type="password" id = "password1" placeholder="비밀번호" v-model.trim="password1" class = "inputClass">
      </div>
      <div class = "inputdiv">
        <label for="password2"></label>
        <input type="password" id = "password2" placeholder="비밀번호 확인" v-model.trim="password2" class = "inputClass">
      </div>
      <div class = "inputdiv">
        <input type="submit" value="회원가입" class = "submitClass">
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const username = ref(null) 
const password1 = ref(null)
const password2 = ref(null)
const store = useCounterStore()

const signUp = function () {
  const payload = {
    username: username.value,
    password1: password1.value,
    password2: password2.value
  }
  store.signUp(payload)
}

</script>

<style scoped>
.child {
  background-color: rgba(0, 0, 0, 0.8);
  display: inline-block; /* inline-block으로 설정 */
  padding: 20px;
  border-radius: 10%;
  width: 300px;
  height: 500px;
}

.inputdiv {
  margin: 20px;
  text-align: center;
}

.h2Tag {
  text-align: center;
  color: white;
}

.inputClass {
  width: 250px;
  height: 40px;
  border: 0px;
  background-color: rgb(40, 40, 40,0.5);
  color: white;
}

.submitClass {
  width: 250px;
  height: 40px;
  background-color: rgb(255, 40, 40);
  color: white;
  font-weight: bolder;
  font-size: 15px;
  border: 0px;
}
</style>