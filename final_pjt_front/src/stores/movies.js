import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useMoviestore = defineStore('movies', () => {
  const API_URL = 'http://127.0.0.1:8000'
  
  // 전체 영화 목록
  const movies = ref([])
  // 인기 영화 목록
  const latest = ref([])
  
  // 장르 목록
  const genres = ref([])

  // page_number = 현재 페이지; number_page = 각 카테고리의 최대 페이지 수
  const pageNumber = ref(1)
  const numberPage = ref(null)

  // 전체 영화 채우기 axios
  const fillMovies = function () {
    axios({
      method: 'GET',
      url: `${API_URL}/api/v1/movies/`
    })
    .then((response) => {
      movies.value = response.data
    })
  }

  // 전체 최신 영화 채우기
  const fillLatest = function () {
    latest.value = movies.value.filter((movie) => movie.is_latest)
  }

  // 페이지화 시키기 (page_number, )
  const pageMovies = function () {
    latest.value.slice()
  }
  
  // 전체 장르 불러오기
  const getGenre = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v1/genres/`
    })
      .then(res => {
        genres.value = res.data
      })
    }





  // Detail에서 영화 불러오고, 장르 불러오기
  const fillDetailGenre = function() {
    return 1
  }



  return {
    movies,
    latest,
    genres,
    pageNumber,
    numberPage,
    // pages,
    fillMovies,
    fillLatest,
    getGenre
  }
}, { persist: true })
