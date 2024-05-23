<template>
  <div class="d-block">
    <div>
      <button type="button" data-bs-toggle="modal" :data-bs-target="'#DetailModal-'+movie.id" class="btn p-0" @click = "getMovieComment">
        <img :src="imgURL(movie.poster_path)" alt="{{movie.title}}_poster_path_img" class="rounded">
      </button>
    </div>
    
    <MovieCardDetailModal
    :movie="movie"
    >
    </MovieCardDetailModal>
  </div>
</template>

<script setup>
import MovieCardDetailModal from '@/components/MovieCardDetailModal.vue';
import { useMoviestore } from '@/stores/movies'

defineProps({
  movie: Object
})

const movieStore = useMoviestore()

const getMovieComment = function() {
  movieStore.getMovieComment()
}

const imgURL = (path, size = 300) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`
}

</script>

<style scoped>
/* media별 img 크기 변경 해야함 */

/* 768px 이하의 화면 크기 */
@media screen and (max-width: 568px) {
  img {
    width: 120px;
    height: 180px;
  }
}

@media screen and (min-width: 569px) and (max-width: 768px) {
  img {
    width: 160px;
    height: 240px;
  }
}

/* 768px 이상, 1024px 이하의 화면 크기 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  img {
    width: 180px;
    height: 270px;
  }
}

/* 1024px 이상의 화면 크기 */
@media screen and (min-width: 1025px) {
  img {
    width: 220px;
    height: 330px;
  }
}

</style>