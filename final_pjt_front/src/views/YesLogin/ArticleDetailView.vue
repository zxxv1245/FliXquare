<template>
  <div class="container div-container" v-if="article">
    <RouterLink :to="{name : 'ArticlesView'}" class="h5">
    <button type="btn" class="btn text-white ps-0">
      <
    </button>
  </RouterLink>
    <h2>{{ article.title }}</h2>
    <div class="d-flex justify-content-between pb-3 pt-0">
      <div>분류 : {{ article.category.name }}</div>
      <div>작성자 : {{ article.user.username }}</div>
      <div>작성일자 : {{ article.created_at?.substring(0, 10) }} {{ article.created_at?.substring(11, 19) }}</div>
    </div>
    <hr class = "mt-0">
    <p>{{ article.content }}</p>
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ArticleDetailLikeButton
          :key = "article.id"
          :article-id = "article.id"
          :article = "article"
          class="btn p-0"
          />
        <p class="ps-2 mb-0">{{ article.likes_user.length }}명이 좋아합니다.</p>
      </div>
      <button @click="updateArticle" class="btn btn-danger ms-3" v-if = "article.user.id === counterStore.userId">수정</button>
    </div>
    <hr>
    <h4>댓글</h4>
    <hr>
    <ArticleDetailComment />
    <ArticleDetailCommentCreateForm class="mt-3"/>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import ArticleDetailLikeButton from '@/components/ArticleDetailLikeButton.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import ArticleDetailComment from '@/components/ArticleDetailComment.vue'
import ArticleDetailCommentCreateForm from '@/components/ArticleDetailCommentCreateForm.vue'
import { useArticleStore } from '@/stores/articles'
import { useCounterStore } from '@/stores/counter'
const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const counterStore = useCounterStore()
// onMounted에서 데이터 로드
onMounted(() => {
  // console.log('onMounted 호출 확인')
  articleStore.getArticleDetail(route.params.articleId)
})

const article = computed(() => articleStore.article)

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
.btn {
  border-radius: 5px;
}
.container {
  min-height: 80vh;
}

.div-container {
  width: 80%; /* 폼의 너비를 조정합니다. */
  max-width: 800px; /* 최대 너비를 설정하여 너무 커지지 않도록 합니다. */
  padding: 30px; /* 내부 여백을 더 넓게 설정합니다. */
  border-radius: 10px;
  background-color: rgba(40, 40, 40, 0.8);
}
.pTag {
  display: inline;
}
</style>