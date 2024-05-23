<template>
  <div>
    <button @click = "Updated" :class = "{isnone : !isUpdated}" class="btn btn-danger ms-3 p-1">수정</button>
    <form @submit.prevent = "updateArticleComment" :class = "{isnone : isUpdated}">
      <input name="" id="content" v-model.trim = "content" class = "input">
      <button type = "submit" class="btn btn-danger ms-3 p-1">완료</button>
      <button @click = "deleteComment(comment.id)" class="btn btn-danger ms-1 p-1">삭제</button>
    </form>
  </div>
</template>

<script setup>
import { ref,onMounted,watch } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useRoute } from 'vue-router';
const props = defineProps({
  commentId : Number,
  comment : Object
})


const isUpdated = ref(true)
const route = useRoute()
const articleStore = useArticleStore()

const content = ref(null)

const deleteComment = function(commentId) {
  articleStore.deleteComment(commentId)
}

const loadArticleComment = async () => {
  const commentId = props.commentId;
  await articleStore.getArticleCommentDetail(commentId);
  content.value = articleStore.articleComment.content;
};

const updateArticleComment = function() {
  const commentId = props.commentId;
  articleStore.updateArticleComment(commentId, { content: content.value });
  isUpdated.value = !isUpdated.value
};

// 컴포넌트가 마운트될 때 기사를 로드합니다.
onMounted(loadArticleComment);

// articleStore의 상태가 변경될 때 로컬 상태를 업데이트합니다.
watch(
  () => articleStore.articleComment,
  (newComment) => {
    content.value = newComment.content;
  },
  { deep: true } // 깊은 감시를 설정하여 중첩된 객체의 변경도 감지합니다.
);

const Updated = function() {
  isUpdated.value = !isUpdated.value
  content.value = props.comment.content
}

</script>

<style scoped>
.isnone {
  display: none;
}
.input {
  border-radius: 5px;
}
.btn {
  border-radius: 5px;
}
</style>