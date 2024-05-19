import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useMoviestore = defineStore('movies', () => {

  const movies = ref([

  ])

  const API_URL = 'http://127.0.0.1:8000'

  const fillMovies = function () {
    axios({
      method: 'GET',
      url: `${API_URL}/api/v1/movies/`
    })
    .then((response) => {
      movies.value = response.data
    })
  }



  return {
    movies,
    fillMovies
  }
}, { persist: true })
