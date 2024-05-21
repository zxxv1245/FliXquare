<template>
  <div>
    <h3>{{ genre.name }}와 관련된 영화가 보고 싶은 순간!</h3>

    <div class="d-flex">
      <button
      type="button"
      class="btn btn-outline-dark"
      @click="decrease"><span><</span>
      </button>

      <MovieCard
      v-for="movie in currentMovies"
      :movie="movie"
      />

      <button
      type="button"
      class="btn btn-outline-dark"
      @click="increase"><span>></span>
      </button>
    </div>
    <div class="d-flex justify-content-center pt-2" aria-label="GenreView Page navigation">
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
import { useCounterStore } from '@/stores/counter'
import { ref, onMounted, watch} from 'vue'

const movieStore = useMoviestore()

const props = defineProps({
  genre:Object
})
// 장르별 영화 리스트 만들기
const genreMovieList = ref(movieStore.movies.filter((movie) => movie.genre_ids.includes(props.genre.id)))
// 초기 출력
const currentMovies = ref(genreMovieList.value.slice(0,4))
const length = ref(4)

// 현재 페이지 값
const pageNumber = ref(1)
// 최대 페이지 값
const maxNumberPage = ref(0)
if (genreMovieList.value.length > 18) {
  maxNumberPage.value = 18
} else {
  maxNumberPage.value = genreMovieList.value.length
}
const numberPage = ref(Math.ceil(maxNumberPage.value/4))

const c = function (p) {
  pageNumber.value = p
}

// 디바이스 반응형 사이즈 바꿔주기
const Resize = function () {
  // laptop 중간 이상 사이즈일때
  if (window.innerWidth > 1220) {
    length.value = 6
    currentMovies.value = genreMovieList.value.slice(0, length.value)
    if (genreMovieList.value.length > 18) {
      maxNumberPage.value = 18
    } else {
      maxNumberPage.value = genreMovieList.value.length
    }
    numberPage.value = Math.ceil(maxNumberPage.value/length.value)
  }
  // tablet 사이즈일때
  if ((window.innerWidth >= 768) && (window.innerWidth < 1024)) {
    length.value = 3
    currentMovies.value = genreMovieList.value.slice(0, length.value)
    if (genreMovieList.value.length > 18) {
      maxNumberPage.value = 18
    } else {
      maxNumberPage.value = genreMovieList.value.length
    }
    numberPage.value = Math.ceil(maxNumberPage.value/length.value)
  }
  // moblie 사이즈일때
  if (window.innerWidth < 768) {
    length.value = 2
    currentMovies.value = genreMovieList.value.slice(0, length.value)
    if (genreMovieList.value.length > 18) {
      maxNumberPage.value = 18
    } else {
      maxNumberPage.value = genreMovieList.value.length
    }
    numberPage.value = Math.ceil(maxNumberPage.value/length.value)
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
  currentMovies.value = genreMovieList.value.slice(length.value*(nextPage-1), length.value*nextPage)
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