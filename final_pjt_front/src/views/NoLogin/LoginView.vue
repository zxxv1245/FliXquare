<template>
  <div class = "parent thisisimg">
    <LoginForm/>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue';
</script>

<style scoped>
.parent {
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center;    /* 세로 가운데 정렬 */
  height: 100vh;          /* 부모 요소의 높이를 100% 뷰포트 높이로 설정 */
}

.thisisimg {
  height: 700px;
  background-image: url('@/assets/backgroundimg.jpg');
  background-size: cover;
  color: white;
}
</style>