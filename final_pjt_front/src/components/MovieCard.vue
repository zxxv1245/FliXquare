<template>
  <div>
    <h2>MovieCard</h2>
    <!-- <MovieCardDetailModal/> -->
    <div>
      <p>{{ movie }}</p>
    </div>

  </div>
</template>

<script setup>
import MovieCardDetailModal from '@/components/MovieCardDetailModal.vue';

defineProps({
  movie: Object
})


</script>

<style scoped>

</style>