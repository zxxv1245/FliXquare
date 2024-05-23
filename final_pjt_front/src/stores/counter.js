import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useMoviestore } from '@/stores/movies'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const router = useRouter()
  const token = ref(null)
  const userGenre = ref([])
  const genres = ref([])
  const userId = ref(null)
  const userName = ref(null)
  const movieStore = useMoviestore()


  const isSameGenre = function(genre1, genre2) {
    return genre1.id === genre2.id && genre1.name === genre2.name;
  }
  // 로컬에서 userGenre 고르기
  const getGenre = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v1/genres/`
    })
      .then(res => {
        const dummyGenres = ref([])
        res.data.forEach((genre) => {
          const genreExists = userGenre.value.some(userGenreItem => isSameGenre(userGenreItem, genre));
          if (!genreExists) {
            dummyGenres.value.push(genre);
          }
        })
        genres.value = dummyGenres.value
      })
      .catch(e => {
        // console.log('실패',e)
      })
    }


  const getuserGenre = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v1/getusergenre/${userId.value}/`,
    })
      .then(res => {
        userGenre.value = res.data
      })
  }
  // 로그인 유무 파악
  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

  // 회원가입
  const signUp = function (payload) {
    const { username, password1, password2 } = payload
    const token = ref(null)
    // 2. axios로 django에 요청을 보냄
    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username, password1, password2
      }
    })
      .then((response) => {
      // console.log('회원가입 성공!')
      const password = password1
      logIn({ username, password })
      })
      .catch((error) => {
      window.alert('회원가입 실패ㅠ')
      })
  }

  // 로그인
  const logIn = function (payload) {
    // 1. 사용자 입력 데이터를 받아
    const { username, password } = payload
    // 2. axios로 django에 요청을 보냄
    axios({
      method: 'post',
      url: `${API_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
      .then((response) => {
        //3. 로그인 성공 후 응답 받은 토큰을 저장
        // console.log('로그인 성공!')
        token.value = response.data.key
        getUser()
        movieStore.getGenre()
        if (userGenre.value.length === 0) {
          router.push({ name : 'GenreUpdateView' })
        } else {
          router.push({ name : 'MovieView' })
        }
      })
      .catch((error) => {
        window.alert('로그인 실패ㅠ')
      })
    }
    
    // 로그아웃
    const logOut = function() {
      token.value = null
      userId.value = null
      userName.value = null
      userGenre.value = []
      movieStore.recommend = []
    }
    
    // DB에 저장
    const getUser = function() {
      axios({
        method : "get",
        url : `${API_URL}/accounts/user/`,
        headers : {
          Authorization : `Token ${token.value}`
        }
      })
      .then(res => {
        userId.value = res.data.pk
        userName.value = res.data.username
        getuserGenre()
      })
      .catch(e => {
        // console.log('getUser 실패ㅜ',e)
      })
  }

  const addGenre = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v1/addgenre/${userId.value}/`,
      params : {
        genre : userGenre.value
      }
    })
      .then(res => {
        // console.log('add')
      })
  }
  const removeGenre = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v1/removegenre/${userId.value}/`,
      params : {
        genre : userGenre.value
      }
    })
      .then(res => {
        // console.log('remove')
      })
  }
  return {
    API_URL,
    token,
    userGenre,
    isLogin,
    genres,
    userId,
    userName,
    signUp,
    logIn,
    getGenre,
    logOut,
    getUser,
    addGenre,
    removeGenre,
    isSameGenre,
    getuserGenre
  }
}, { persist: true })
