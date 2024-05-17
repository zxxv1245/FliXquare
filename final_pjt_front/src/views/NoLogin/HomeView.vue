<template>
  <div>
    <HomeMainInfo/>
    <hr class = "HomeViewhr">
    <HomeSubOneInfo/>
    <hr class = "HomeViewhr">
    <HomeSubTwoInfo/>
    <hr class = "HomeViewhr">
    <HomeSubThreeInfo/>
  </div>
</template>

<script setup>
import HomeMainInfo from '@/components/HomeMainInfo.vue';
import HomeSubOneInfo from '@/components/HomeSubOneInfo.vue';
import HomeSubTwoInfo from '@/components/HomeSubTwoInfo.vue';
import HomeSubThreeInfo from '@/components/HomeSubThreeInfo.vue';
</script>

<style scoped>
.HomeViewhr {
  padding: 5px;
  background-color: rgb(195, 195, 195);
}

</style>