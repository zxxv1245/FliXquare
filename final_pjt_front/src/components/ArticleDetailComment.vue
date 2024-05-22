<template>
  <div 
    v-for = "comment in comments"
    :key = "comment.id">
    {{ comment }}
    <b>{{ comment.user.username }}</b> | <p class = "pTag">{{ comment.content }}</p>
    <button @click = "deleteComment(comment.id)">삭제</button>
    <ArticleDetailCommentLikeButton
      :key = "comment.id"
      :comment-id = "comment.id"/>
  </div>
</template>

<script setup>
import ArticleDetailCommentLikeButton from '@/components/ArticleDetailCommentLikeButton.vue'
import { onMounted,computed } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useCounterStore } from '@/stores/counter';

const articleStore = useArticleStore()
const counterStore = useCounterStore()

const deleteComment = function(commentId) {
  articleStore.deleteComment(commentId)
}

const comments = computed(() => {
  return articleStore.allComments.filter((comment) => articleStore.article.id === comment.article)
})


onMounted(() => {
  articleStore.getArticleComment()
})







</script>

<style scoped>
.pTag {
  display: inline;
}
.red {
  color: red;
}
</style>