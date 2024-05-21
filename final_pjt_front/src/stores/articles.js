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
        console.log(articles.value)
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
        // 조회 변수
        article.value = res.data
      })
      .catch(e => {
        console.log(e)
      })
  }

  // 게시글 생성 
  const createArticle = function(payload) {
    const {title,content,category} = payload
    axios({
      method : 'post',
      url : `${API_URL}/api/v2/articles/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      },
      data : {title,content,category}
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

  
  const updateArticle = function(articleId,article) {
    axios({
      method : 'put',
      url : `${API_URL}/api/v2/articles/${articleId}/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      },
      data : {
        title : article.title,
        content : article.content,
        
      }
    })
      .then(res => {
        console.log('update성공')
        router.push({name : 'ArticleDetailView', params : {'articleId' : articleId}})
      })
      .catch(e => {
        // console.log(e)
      })
  }
  
  const category = ref(null)
  const getCategory = function() {
    axios({
      method : 'get',
      url : `${API_URL}/api/v2/category/`,
      headers : {
        Authorization : `Token ${counterStore.token}`
      }
    })
      .then(res => {
        category.value = res.data
      })
  }


  return{
    article,
    articles,
    API_URL,
    category,
    getArticles,
    getArticleDetail,
    createArticle,
    deleteArticle,
    updateArticle,
    getCategory
  }
}, { persist: true })