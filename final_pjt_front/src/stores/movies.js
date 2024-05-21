import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import axios from 'axios'

export const useMoviestore = defineStore('movies', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const OPEN_API_URL = 'https://api.openai.com/v1/chat/completions'
  const API_KEY = '***REMOVED***'

  // 전체 영화 목록
  const movies = ref([])
  // 인기 영화 목록
  const latest = ref([])
  
  // 장르 목록
  const genres = ref([])

  // page_number = 현재 페이지; number_page = 각 카테고리의 최대 페이지 수
  // const pageNumber = ref(1)
  const numberPage = ref(null)

  // 전체 최신 영화 채우기
  const fillLatest = function () {
    latest.value = movies.value.filter((movie) => movie.is_latest)
  }

  // 전체 영화 채우기 axios
  const fillMovies = function () {
    axios({
      method: 'GET',
      url: `${API_URL}/api/v1/movies/`
    })
    .then((response) => {
      movies.value = response.data
      // popularity 기준으로 정렬함
      movies.value.sort(function (a, b) {
        if (a.popularity > b.popularity) {
          return -1
        }
        if (a.popularity < b.popularity) {
          return 1
        }
        return 0
      })
      fillLatest()
    })
  }
  // 외부 Counter 불러오기
  const counterStore = useCounterStore()
  
  // userGenre 채우기
  const userGenre = ref([])
  const getUserGenre = function() {
    userGenre.value = []
    counterStore.userGenre.forEach((Genre) => {
      userGenre.value.push(Genre.name)
    })
  }
  const movieNames = ref([])
  const getMovieTitle = function() {
    movieNames.value = []
    const temp = ref(movies.value.filter((movie) => movie.id <= 100))
    temp.value.forEach((movie) => {
      movieNames.value.push(movie.title)
    })
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
    // API 요청할 message 채우기
    const messages = computed(() => {
      return `나는 [${userGenre.value}] 장르를 좋아해. 내가 가지고 있는 영화 목록은 [${movieNames.value}]가 있어. 이 중에 영화 제목만 5개 ['영화 제목1', '영화 제목2', ...]의 형태로 출력해줘. 군더더기 말 없애고 그냥 리스트만 출력해줘.`    
    })
    
  // Detail에서 영화 불러오고, 장르 불러오기
  const fillDetailGenre = function(ids) {
    const movieGenreName = ref([])
    ids.forEach(id => {
      const genreName = genres.value.find(genre => genre.id === id).name
      movieGenreName.value.push(genreName)
      })
      return movieGenreName.value
    }
  
  // chatGPT API
  const ChatGpt = function() {
      axios({
        method: 'post', 
        url: OPEN_API_URL, 
        headers : {
          Authorization: `Bearer ${API_KEY}`, // 인증 키 설정
          'Content-Type': 'application/json' // 요청 데이터의 타입
        },
        data: { 
          model: 'gpt-4.0', 
          messages 
        }
      })
        .then(res => {
        // 응답 데이터 확인 (크롬 개발자 도구 콘솔창)
          console.log(res.data)

          // 1. 응답 데이터에서 응답 메세지를 가져온다.

          // 2. 채팅창에 메세지를 등록한다.
          // addChat("receive", 응답받은메세지)

          // 3. 채팅의 연속성을 위해 이전 메세지를 oldMsg 변수에 저장
          // messages 에서 system 메세지의 content 값으로 설정됨
        })
        
        .catch(err => {
          console.log(err) 
        })
    
  }

  return {
    movies,
    latest,
    genres,
    messages,
    fillMovies,
    fillLatest,
    getGenre,
    fillDetailGenre,
    getUserGenre,
    getMovieTitle,
    ChatGpt
  }
}, { persist: true })
