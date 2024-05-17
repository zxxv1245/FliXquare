<template>
  <div class = "child">
    <form>
      <h2 class = "h2Tag">회원가입</h2>
      <div class = "inputdiv">
        <label for="id"></label>
        <input type="text" id = "id" placeholder="아이디">
      </div>
      <div class = "inputdiv">
        <label for="password1"></label>
        <input type="password1" id = "password1" placeholder="비밀번호">
      </div>
      <div class = "inputdiv">
        <label for="password2"></label>
        <input type="password2" id = "password2" placeholder="비밀번호 확인">
      </div>
      <div class = "inputdiv">
        <input type="submit" value="회원가입">
      </div>
    </form>
  </div>
</template>

<script setup>

</script>

<style scoped>
.child {
  background-color: rgba(81, 81, 81, 0.7);
  display: inline-block; /* inline-block으로 설정 */
  padding: 20px;
  border-radius: 10%;
  height: 300px;
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