<template>
  <div 
    v-for = "comment in comments"
    :key = "comment.id">
    <div 
      class = "Tag">
      <b>{{ comment.user.username }}</b> | <p class = "Tag">{{ comment.content }}</p>
    </div>
    <ArticleCommentUpdateForm
      :key = "comment.id"
      :comment-id = "comment.id"
      :comment = "comment"
      @update-status="handleUpdateStatus(comment.id, $event)"
      class = "Tag"/>
    <button @click = "deleteComment(comment.id)">삭제</button>
    <ArticleDetailCommentLikeButton
      :key = "comment.id"
      :comment-id = "comment.id"
      :comment = "comment"/>
  </div>
</template>

<script setup>
import ArticleCommentUpdateForm from '@/components/ArticleCommentUpdateForm.vue'
import ArticleDetailCommentLikeButton from '@/components/ArticleDetailCommentLikeButton.vue'
import { onMounted,computed } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue'
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
.Tag {
  display: inline;
}

</style>