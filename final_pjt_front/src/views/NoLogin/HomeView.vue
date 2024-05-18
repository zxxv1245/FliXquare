<template>
  <div>
    <HomeMainInfo/>
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
  background-color: rgb(124, 124, 124);
  margin:0px ;
}

</style>