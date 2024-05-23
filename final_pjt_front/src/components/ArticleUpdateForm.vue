<template>
  <div class="container d-flex justify-content-center align-items-center">
    <form @submit.prevent = "updateArticle" class="form-container">
    <RouterLink :to="{name : 'ArticlesView'}" class="h5">
      <button type="btn" class="btn text-white ps-0">
        <
      </button>
    </RouterLink>
      <h1 class="mt-4">게시글 수정</h1> <!-- 폼 위에 제목을 표시합니다. -->
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" name="" id="title" v-model.trim = "title" class="form-control">
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model.trim = "content" class="form-control" rows="10"></textarea>
      </div>
      <button type="submit" class="btn btn-danger me-3">완료</button>
      <button @click="deleteArticle" class="btn btn-danger">삭제</button>
    </form>
  </div>
</template>

<script setup>
import { ref,onMounted,watch } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useRoute } from 'vue-router';



const route = useRoute()
const articleStore = useArticleStore()

const title = ref(null)
const content = ref(null)

const loadArticle = async () => {
  const articleId = route.params.articleId;
  await articleStore.getArticleDetail(articleId);
  title.value = articleStore.article.title;
  content.value = articleStore.article.content;
};

const updateArticle = async () => {
  const articleId = route.params.articleId;
  await articleStore.updateArticle(articleId, { title: title.value, content: content.value });
};

// 컴포넌트가 마운트될 때 기사를 로드합니다.
onMounted(loadArticle);
const deleteArticle = () => {
  articleStore.deleteArticle(route.params.articleId)
}
// articleStore의 상태가 변경될 때 로컬 상태를 업데이트합니다.
watch(
  () => articleStore.article,
  (newArticle) => {
    title.value = newArticle.title;
    content.value = newArticle.content;
  },
  { deep: true } // 깊은 감시를 설정하여 중첩된 객체의 변경도 감지합니다.
);
</script>

<style scoped>
.container {
  min-height: 80vh;
}

.form-container {
  width: 80%; /* 폼의 너비를 조정합니다. */
  max-width: 800px; /* 최대 너비를 설정하여 너무 커지지 않도록 합니다. */
  padding: 30px; /* 내부 여백을 더 넓게 설정합니다. */
  border-radius: 10px;
  background-color: rgba(40, 40, 40, 0.8);
}

.form-group {
  margin-bottom: 20px;
}

.input {
  border-radius: 5px;
}

.btn {
  border-radius: 5px;
}
</style>