<template>
  <div 
    v-for = "comment in comments"
    :key = "comment.id">
    <b>{{ comment.user.username }}</b> | <p class = "pTag">{{ comment.content }}</p>
    <button @click = "deleteComment(comment.id)">삭제</button>
  </div>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue'
import { useArticleStore } from '@/stores/articles';

const articleStore = useArticleStore()

const comments = computed(() => {
  return articleStore.allComments.filter((comment) => articleStore.article.id === comment.article)
})

const deleteComment = function(commentId) {
  articleStore.deleteComment(commentId)
}

onMounted(() => {
  articleStore.getArticleComment()
})

</script>

<style scoped>
.pTag {
  display: inline;
}
</style>