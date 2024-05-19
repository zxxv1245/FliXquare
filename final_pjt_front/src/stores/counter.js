import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const router = useRouter()
  const token = ref(null)
  const userGenre = ref([
  ])
  const genres = ref([])

  const getGenre = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v1/genres/`
    })
      .then(res => {
        const dummyGenres = ref([])
        res.data.forEach((genre) => {
          if (!userGenre.value.includes(genre.name) ) {
            dummyGenres.value.push(genre.name)
          }
        })
        genres.value = dummyGenres.value
      })
      .catch(e => {
        console.log('실패',e)
      })
    }

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
      console.log('회원가입 성공!')
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
        console.log('로그인 성공!')
        token.value = response.data.key
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

  const logOut = function() {
    token.value = null
    userGenre.value = []
  }
  
  return {
    API_URL,
    token,
    userGenre,
    isLogin,
    genres,
    signUp,
    logIn,
    getGenre,
    logOut
  }
}, { persist: true })
