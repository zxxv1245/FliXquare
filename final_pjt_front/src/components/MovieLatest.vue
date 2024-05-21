<template>
  <div>
    <div class="d-flex">
      <button type="button" class="btn btn-outline-dark"><span><</span></button>
      <MovieCard
      ref="movieCard"
      v-for="movie in latest"
      :movie="movie"
      />
      <button type="button" class="btn btn-outline-dark"><span>></span></button>
    </div>
    <div class="d-flex justify-content-center pt-2" aria-label="LatestView Page navigation">
      <button
      class="page-link"
      id="nav-link"
      v-for="page in numberPage">
        <button
        @click="c(page)"
        class="border bg-white py-1"
        type="button">
        </button>
      </button>
    </div>
  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { useMoviestore } from '@/stores/movies'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
const moviestore = useMoviestore()

defineProps({
  movies: Array
})

// 초기 출력
const latest = ref(moviestore.latest.slice(0,4))
const length = ref(4)
// 현재 페이지 값
const pageNumber = ref(1)
// 최대 페이지 값
const numberPage = ref(Math.ceil(18/4))

// 0:6
// 3(0+3*1):9(6+3*1)

const c = function (p) {
  pageNumber.value = p
}

// 디바이스 반응형 사이즈 바꿔주기
const Resize = function () {
  // laptop 중간 이상 사이즈일때
  if (window.innerWidth > 1220) {
    length.value = 6
    latest.value = moviestore.latest.slice(0, length.value)
    numberPage.value = Math.ceil(18/length.value)
  }
  // tablet 사이즈일때
  if ((window.innerWidth >= 768) && (window.innerWidth < 1024)) {
    length.value = 3
    latest.value = moviestore.latest.slice(0, length.value)
    numberPage.value = Math.ceil(18/length.value)
  }
  // moblie 사이즈일때
  if (window.innerWidth < 768) {
    length.value = 2
    latest.value = moviestore.latest.slice(0, length.value)
    numberPage.value = Math.ceil(18/length.value)
  }
}

watch(pageNumber, (nextPage) => {
  // pageNumber.value = nextPage
  latest.value = moviestore.latest.slice(length.value*(nextPage-1), length.value*nextPage)
})



// 우선, 즉각 반응형 아님 (디바이스 크기를 갑자기 줄이고 늘릴 일은 없기 때문에)
onMounted(() => {
  Resize()
})

onBeforeUnmount(() => {
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