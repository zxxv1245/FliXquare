<template>
  <div class="container">
    <div class="row row-cols-lg-4 row-cols-md-3 row-cols-2 g-3">
      <MovieCard
      v-for="movie in pageMovieList"
      :key="movie.id"
      :movie="movie"
      />
    </div>

    <div class="d-flex justify-content-center pt-3" aria-label="StoreView Page navigation">
      <ul class="pagination">
        <li class="page-item"
        v-if="maxNumber"
        v-for="page in maxNumber">
          <button
          @click="c(page)"
          class="page-link">
          {{ page }}
          </button>
        </li>
        <div v-else class="d-flex flex-column align-items-center">
          <img src="@/assets/Janitor.png" alt="Jaintor in Xquare" class="my-5">
          <h3 class="my-5">아직 추가된 찜 목록이 없습니다!</h3>
        </div>
      </ul>

    </div>
  </div>


</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { useMoviestore } from '@/stores/movies'
import { useCounterStore } from '@/stores/counter'
import { ref, onMounted, computed, watch } from 'vue'

const movieStore = useMoviestore()

const counterStore = useCounterStore()
const myMovies = ref([])
const pageNumber = ref(1)
const maxNumber = ref(1)
const pageMovieList = ref([])
const pages = ref([])




onMounted(() => {
  // console.log(counterStore.userId)
  myMovies.value = movieStore.movies.filter((movie) => {
    // console.log(movie.store_user)
    return movie.store_user.includes(counterStore.userId)
  });
  // console.log(myMovies.value);
  // 현재 페이지
  pageMovieList.value = myMovies.value.slice(0, 12)
  // 최대값 계산
  maxNumber.value = Math.ceil(myMovies.value.length/12)
  
  // 초기 페이지 설정
  pages.value = [-1, 0, 1, 2, 3]
  pages.value = pages.value.filter((page) => page > 0 && page <= maxNumber.value)  
});

// 클릭시 반응
const c = function (p) {
  pageNumber.value = p
}

// 클릭 : 반응형 페이지 변경 
watch(pageNumber, (nextPage) => {
  pages.value = [nextPage-2, nextPage-1, nextPage, nextPage+1, nextPage+2]
  pages.value = pages.value.filter((page) => page > 0 && page <= movieStore.numberPage)
  pageMovieList.value = myMovies.value.slice(12*(nextPage-1), 12*nextPage)
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

img {
  border: 1px solid black;
  border-radius: 90%;
  background-color: white;
}

</style>