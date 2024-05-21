<template>
  <div class = "container border border-white">
    <h2>게시글 상세정보</h2>
    <p>작성자 : {{ articleStore.article.user.username }}</p>
    <p>분류 : {{ articleStore.article.category.name }}</p>
    <h2>제목 : {{ articleStore.article.title }}</h2>
    <p>내용 : {{ articleStore.article.content }}</p>
    <p>작성일자 : {{ articleStore.article.created_at.substring(0,10) }} {{ articleStore.article.created_at.substring(11,19) }}</p>
    
    <button @click = "updateArticle">수정</button> | 
    <button @click = "deleteArticle">삭제</button>
    <hr>
    <ArticleDetailComment/>
    <ArticleDetailCommentCreateForm/>
  </div>
</template>

<script setup>
import ArticleDetailComment from '@/components/ArticleDetailComment.vue'
import ArticleDetailCommentCreateForm from '@/components/ArticleDetailCommentCreateForm.vue'
import { RouterLink,RouterView } from 'vue-router'
import { ref,onMounted } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useRoute,useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

onMounted(()=> {
  articleStore.getArticleDetail(route.params.articleId)
})


const deleteArticle = function() {
  articleStore.deleteArticle(route.params.articleId)
}

const updateArticle = function() {
  router.push({name : 'ArticleUpdateView', params : {'articleId' : articleStore.article.id}})
}
</script>

<style scoped>
div {
  color: white;
}
</style>