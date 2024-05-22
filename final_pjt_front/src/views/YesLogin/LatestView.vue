<template>
  <div class="container">
    <div
    class="row row-cols-lg-4 row-cols-md-3 row-cols-2 g-3">
      <MovieCard
      class="col"
      v-for="movie in pageMovieList"
      :key="movie.id"
      :movie="movie"
      />
    </div>
    <div class="d-flex justify-content-center pt-3" aria-label="LatestView Page navigation">
      <ul class="pagination">
        <li class="page-item"
        v-for="page in pages">
          <button
          @click="c(page)"
          class="page-link">
          {{ page }}
          </button>
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue';
import { ref, watch } from 'vue'
import { useMoviestore } from '@/stores/movies'
const movieStore = useMoviestore()

// 현재 페이지
const pageNumber = ref(1)
const pageMovieList = ref(movieStore.latest.slice(0, 12))

// 최대값 계산
movieStore.numberPage = Math.ceil(movieStore.latest.length/12)

// 초기 페이지 설정
const pages = ref([pageNumber.value-2, pageNumber.value-1, pageNumber.value, pageNumber.value+1, pageNumber.value+2])
pages.value = pages.value.filter((page) => page > 0 && page <= movieStore.numberPage)

// 클릭시 반응
const c = function (p) {
  pageNumber.value = p
}

// 클릭 : 반응형 페이지 변경 
watch(pageNumber, (nextPage) => {
  pages.value = [nextPage-2, nextPage-1, nextPage, nextPage+1, nextPage+2]
  pages.value = pages.value.filter((page) => page > 0 && page <= movieStore.numberPage)
  pageMovieList.value = movieStore.latest.slice(12*(nextPage-1), 12*nextPage)
})

</script>

<style scoped>
div {
  color: white;
}

button {
  background-color: red;
  color: white;
}


</style>