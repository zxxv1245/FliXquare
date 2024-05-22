<template>
  <h2>당신에게 추천되는 영화 목록</h2>
  <div class="d-flex">
    <button
    type="button"
    class="btn btn-outline-dark"
    @click="decrease"><span><</span>
    </button>

    <MovieCard
    v-for="movie in recommend"
    :key="movie.id"
    :movie="movie"
    />

    <button
    type="button"
    class="btn btn-outline-dark"
    @click="increase"><span>></span>
    </button>
  </div>
  <div class="d-flex justify-content-center pt-2" aria-label="LatestView Page navigation">
    <button
    class="page-link"
    id="nav-link">
      <button
      @click="c(page)"
      class="border bg-white py-1"
      type="button">
      </button>
    </button>
  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { ref, onMounted, watch } from 'vue'
import { useMoviestore } from '@/stores/movies'
const movieStore = useMoviestore()

// 초기 출력
const recommend = ref(movieStore.recommend.slice(0,4))
const length = ref(4)
// 현재 페이지 값
const pageNumber = ref(1)
// 최대 페이지 값

const c = function (p) {
  pageNumber.value = p
}

watch(pageNumber, (nextPage) => {
  // pageNumber.value = nextPage
  recommend.value = movieStore.recommend.slice(length.value*(nextPage-1), length.value*nextPage)
})

// 디바이스 반응형 사이즈 바꿔주기
const Resize = function () {
  // laptop 중간 이상 사이즈일때
  if (window.innerWidth > 1220) {
    length.value = 6
    recommend.value = movieStore.recommend.slice(0, length.value)
  }
  // tablet 사이즈일때
  if ((window.innerWidth >= 768) && (window.innerWidth < 1024)) {
    length.value = 3
    recommend.value = movieStore.recommend.slice(0, length.value)
  }
  // moblie 사이즈일때
  if (window.innerWidth < 768) {
    length.value = 2
    recommend.value = movieStore.recommend.slice(0, length.value)
  }
}

onMounted(() => {
  Resize()
})

</script>

<style scoped>
span {
  color: lightgray;
}

#nav-link {
  margin-left: 2px;
  margin-right: 2px;
}
</style>