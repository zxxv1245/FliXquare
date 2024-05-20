<template>
  <div class="container">
    <div
    class="row row-cols-lg-5 row-cols-md-4 row-cols-2 g-3">
    <!-- v-for 부분을 수정해야한다. -->
      <MovieCard
      class="col"
      v-for="movie in moviestore.latest"
      :key="movie.id"
      :movie="movie"
      />
    </div>
    <nav class="justify-content-center" aria-label="LatestView Page navigation">
      <ul class="pagination">
        <!-- <li class="page-item disabled"
        v-show="!page === 1">
          <button class="page-link">Previous</button>
        </li> -->
        <!-- 현재 페이지를 기준으로 앞 뒤로 -->
        <!-- v-for를 이용해서 value를 바꾼다? -->
        <li class="page-item"
        v-for="page in pages">
          <button
          @click="c(page)"
          class="page-link">
          {{ page }}
          </button>
        </li>

        <!-- <li class="page-item">
          <button class="page-link">1</button>
        </li>
        <li class="page-item">
          <button class="page-link">2</button>
        </li>
        <li class="page-item">
          <button class="page-link">3</button>
        </li>         -->
        <!-- <li class="page-item">
          <button class="page-link">Next</button>
        </li> -->
      </ul>

    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import MovieCard from '@/components/MovieCard.vue';
import { useMoviestore } from '@/stores/movies'
const moviestore = useMoviestore()
const pageNumber = ref(1)
// 최대값 계산
moviestore.numberPage = Math.ceil(moviestore.latest.length/12)

const pages = ref([pageNumber.value-2, pageNumber.value-1, pageNumber.value, pageNumber.value+1, pageNumber.value+2])
pages.value = pages.value.filter((page) => page > 0 && page <= moviestore.numberPage)

const c = function (p) {
  pageNumber.value = p
}

watch(pageNumber, (nextPage) => {
  pages.value = [nextPage-2, nextPage-1, nextPage, nextPage+1, nextPage+2]
  pages.value = pages.value.filter((page) => page > 0 && page <= moviestore.numberPage)
})

// [0:12]
// [12:24]
// [24:36]


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