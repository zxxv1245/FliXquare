<template>
  <div>
    <HomeMainInfo/>
    <div class = "HomeViewdiv"></div>
    <HomeSubOneInfo/>
    <div class = "HomeViewdiv"></div>
    <HomeSubTwoInfo/>
    <div class = "HomeViewdiv"></div>
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

.HomeViewdiv {
  padding: 3px;
  background-color: rgba(50, 50, 50, 0.95);
  margin:0px ;
}

</style>