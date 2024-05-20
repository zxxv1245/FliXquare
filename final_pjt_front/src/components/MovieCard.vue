<template>
  <div>
    <!-- <MovieCardDetailModal/> -->
    <div>
      <div>
        <button type="button" data-bs-toggle="modal" :data-bs-target="'#DetailModal-'+movie.id" class="btn p-0">
          <img :src="imgURL(movie.poster_path)" alt="{{movie.title}}_poster_path_img">
        </button>
      </div>
      
      <MovieCardDetailModal
      :movie="movie"
      >
      </MovieCardDetailModal>
    </div>

  </div>
</template>

<script setup>
import MovieCardDetailModal from '@/components/MovieCardDetailModal.vue';

defineProps({
  movie: Object
})

const imgURL = (path, size = 200) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`
}



</script>

<style scoped>
/* media별 img 크기 변경 해야함 */
img {
  width: 200px;
  height: 300px;
}

</style>