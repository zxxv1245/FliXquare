<template>
  <div class = "thisisimg parent">
    <h3 class = "h3Tag">당신의 영화 여정을 함께할 커뮤니티</h3>
    <p class = "pTag">최신 영화 소식, 리뷰, 토론 그리고 더 많은 것들을 즐기세요.</p>
  </div>

</template>

<script setup>

</script>

<style scoped>

.parent {
  display: flex;
  flex-direction: column;
  align-items: center;    
  justify-content: center;
  font-size: 30px;
}
.thisisimg {
  height: 600px;
  background-image: url('@/assets/backgroundimg.jpg');
  background-size: cover;
  color: white;
}

.h3Tag {
  text-align: center;
}
.pTag {
  text-align: center;
}
</style> 