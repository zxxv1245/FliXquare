<template>
  <div 
    v-for = "comment in comments"
    :key = "comment.id">
    <div class="d-flex justify-content-between">
      <div>
        <span>
          {{ comment.user.username }} |
        </span>
        <span>
          {{ comment.content }}
        </span>
      </div>
      <div>
        <div class="d-flex">
          <ArticleCommentUpdateForm
            :key = "comment.id"
            :comment-id = "comment.id"
            :comment = "comment"
            @update-status="handleUpdateStatus(comment.id, $event)"
            class = "Tag mx-2"
            v-if = "comment.user.id === counterStore.userId"/>
            <div class="Tag">
                <ArticleDetailCommentLikeButton
                  :key = "comment.id"
                  :comment-id = "comment.id"
                  :comment = "comment"
                  class = "me-2 text-center"/>
                <p class = "ms-1 fts">{{ comment.likes_user.length }}</p>
            </div>
        </div>
      </div>
    </div>
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

.fts {
  font-size: 12px;
}
</style>