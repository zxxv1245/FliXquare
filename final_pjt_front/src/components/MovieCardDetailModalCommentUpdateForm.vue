<template>
  <div>
    <button @click = "Updated" :class = "{isnone : !isUpdated}">수정</button>
    <form @submit.prevent = "updateMovieComment" :class = "{isnone : isUpdated}">
      <input name="" id="content" v-model = "content">
      <input type="submit" value="완료">
    </form>
  </div>
</template>

<script setup>
import { ref,onMounted,watch } from 'vue'
import { useMoviestore } from '@/stores/movies';
import { useRoute } from 'vue-router';
const props = defineProps({
  commentId : Number,
  comment : Object
})


const isUpdated = ref(true)
const route = useRoute()
const movieStore = useMoviestore()

const content = ref(null)

const loadMovieComment = async () => {
  const commentId = props.commentId;
  await movieStore.getMovieCommentDetail(commentId);
  content.value = movieStore.movieComment.content;
};

const updateMovieComment = function() {
  const commentId = props.commentId;
  movieStore.updateMovieComment(commentId, { content: content.value });
  isUpdated.value = !isUpdated.value
};

// 컴포넌트가 마운트될 때 기사를 로드합니다.
onMounted(loadMovieComment);

// articleStore의 상태가 변경될 때 로컬 상태를 업데이트합니다.
watch(
  () => movieStore.movieComment,
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
</style>