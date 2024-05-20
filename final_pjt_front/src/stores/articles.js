import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useCounterStore } from './counter'
import axios from 'axios'

export const useArticleStore = defineStore('article', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const router = useRouter()
  const counterStore = useCounterStore()
  const articles = ref([])
  const article = ref({})
  
  // 전체 게시글 조회
  const getArticles = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v2/articles/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      }
    })
      .then(res => {
        articles.value = res.data
      })
      .catch(e => {
        console.log(e)
      })
  }

  // 단일 게시글 조회
  const getArticleDetail = function(articleId) {
    axios({
      method : 'get',
      url : `${API_URL}/api/v2/articles/${articleId}/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      }
    })
      .then(res => {
        article.value = res.data
      })
      .catch(e => {
        console.log(e)
      })
  }

  // 게시글 생성 
  const createArticle = function(payload) {
    const {title,content} = payload
    axios({
      method : 'post',
      url : `${API_URL}/api/v2/articles/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      },
      data : {title,content}
    })
      .then(res =>{
        router.push({name : 'ArticlesView'})
        // console.log('create성공')
      })
      .catch(e => {
        // console.log('create실패')
      })
  }

  // 게시글 삭제
  const deleteArticle = function(articleId) {
    axios({
      method : 'delete',
      url : `${API_URL}/api/v2/articles/${articleId}/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      }
    })
      .then(res => {
        // console.log('delete성공')
        router.push({name : 'ArticlesView'})
      })
      .catch(e => {
        // console.log(e)
      })
  }

  const updateTitle = ref(null)
  const updateContent = ref(null)
  const updateArticle = function(articleId) {
    axios({
      method : 'put',
      url : `${API_URL}/api/v2/articles/${articleId}/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      }
    })
      .then(res => {
        // console.log('delete성공')
        updateTitle.value = res.data.title
        updateContent.value = res.data.content
      })
      .catch(e => {
        // console.log(e)
      })
  }

  return{
    article,
    articles,
    API_URL,
    updateTitle,
    updateContent,
    getArticles,
    getArticleDetail,
    createArticle,
    deleteArticle,
    updateArticle
  }
}, { persist: true })