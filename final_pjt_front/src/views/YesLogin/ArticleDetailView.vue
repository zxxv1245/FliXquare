<template>
  <div class="container border border-white" v-if="article">
    <h2>게시글 상세정보</h2>
    
    <p>작성자 : {{ article.user?.username }}</p>
    <p>분류 : {{ article.category?.name }}</p>
    <h2>제목 : {{ article.title }}</h2>
    <p>내용 : {{ article.content }}</p>
    <p>작성일자 : {{ article.created_at?.substring(0, 10) }} {{ article.created_at?.substring(11, 19) }}</p>
    {{ article.likes_user }}
    <ArticleDetailLikeButton
      :key = "article.id"
      :article-id = "article.id"
      :article = "article"/>
    <button @click="updateArticle">수정</button> | 
    <button @click="deleteArticle">삭제</button>
    <hr>
    <ArticleDetailComment />
    <ArticleDetailCommentCreateForm />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import ArticleDetailLikeButton from '@/components/ArticleDetailLikeButton.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import ArticleDetailComment from '@/components/ArticleDetailComment.vue'
import ArticleDetailCommentCreateForm from '@/components/ArticleDetailCommentCreateForm.vue'
import { useArticleStore } from '@/stores/articles'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

// onMounted에서 데이터 로드
onMounted(() => {
  // console.log('onMounted 호출 확인')
  articleStore.getArticleDetail(route.params.articleId)
})

const article = computed(() => articleStore.article)

const deleteArticle = () => {
  articleStore.deleteArticle(route.params.articleId)
}

const updateArticle = () => {
  router.push({ name: 'ArticleUpdateView', params: { articleId: articleStore.article.id } })
}

const likeArticle = function() {
  articleStore.likeArticle(route.params.articleId)
}


</script>

<style scoped>
div {
  color: white;
}
.red {
  color: red;
}
</style>