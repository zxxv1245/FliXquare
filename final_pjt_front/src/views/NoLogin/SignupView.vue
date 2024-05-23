<template>
  <div class = "parent thisisimg">
    <SignupForm/>
  </div>
</template>

<script setup>
import SignupForm from '@/components/SignupForm.vue';

</script>

<style scoped>
.parent {
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center;    /* 세로 가운데 정렬 */
}
.thisisimg {
  height: 950px;
  background-image: url('@/assets/backgroundimg.jpg');
  background-size: cover;
  color: white;
}
</style>