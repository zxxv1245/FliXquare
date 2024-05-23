<template>
  <div>
    <h2>커뮤니티가 추천하는 영화 10위</h2>
  </div>

  <div>
    <div class="d-flex">
      <button
      type="button"
      class="btn btn-outline-dark"
      @click="decrease"><span><</span>
      </button>

      <MovieCard
      v-for="movie in popular"
      :movie="movie"
      />

      <button
      type="button"
      class="btn btn-outline-dark"
      @click="increase"><span>></span>
      </button>

    </div>
    <div class="d-flex justify-content-center pt-2" aria-label="Topten Page navigation">
      <button
      class="page-link"
      id="nav-link"
      v-for="page in numberPage">
        <button
        @click="c(page)"
        class="border bg-white mb-3"
        type="button">
        </button>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMoviestore } from '@/stores/movies';
import MovieCard from './MovieCard.vue'

const movieStore = useMoviestore()

// 초기 출력
const popular = ref(movieStore.popularList.slice(0,4))
const length = ref(4)
// 현재 페이지 값
const pageNumber = ref(1)
// 최대 페이지 값
const numberPage = ref(Math.ceil(10/4))

const c = function (p) {
  pageNumber.value = p
}

// 디바이스 반응형 사이즈 바꿔주기
const Resize = function () {
  // laptop 중간 이상 사이즈일때
  if (window.innerWidth > 1220) {
    length.value = 6
    popular.value = movieStore.popularList.slice(0, length.value)
    numberPage.value = Math.ceil(10/length.value)
  }
  // tablet 사이즈일때
  if ((window.innerWidth >= 768) && (window.innerWidth < 1024)) {
    length.value = 3
    popular.value = movieStore.popularList.slice(0, length.value)
    numberPage.value = Math.ceil(10/length.value)
  }
  // moblie 사이즈일때
  if (window.innerWidth < 768) {
    length.value = 2
    popular.value = movieStore.popularList.slice(0, length.value)
    numberPage.value = Math.ceil(10/length.value)
  }
}

const increase = function () {
  if (pageNumber.value < numberPage.value) {
    pageNumber.value += 1
  }
}

const decrease = function () {
  if (pageNumber.value > 1) {
    pageNumber.value -= 1
  }
}

watch(pageNumber, (nextPage) => {
  // pageNumber.value = nextPage
  popular.value = movieStore.popularList.slice(length.value*(nextPage-1), length.value*nextPage)
})

// 우선, 즉각 반응형 아님 (디바이스 크기를 갑자기 줄이고 늘릴 일은 없기 때문에)
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