<template>
  <div class = "aaa">
    <ProfileMainInfo
    class = "mar"/>
    <!-- user가 쓴 글 보기 -->
    <!-- user가 작성한 영화 댓글 -->
  </div>
</template>

<script setup>
import ProfileMainInfo from '@/components/ProfileMainInfo.vue'
</script>

<style scoped>
.aaa {
  min-height: 600px;
  height: 950px;
  background-image: url('@/assets/pro.jpg');
  background-size: cover;
}


.mar {
  margin-top: 100px;
}
</style>