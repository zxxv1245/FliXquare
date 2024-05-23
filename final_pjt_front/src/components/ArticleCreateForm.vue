<template>
  <div class="container d-flex justify-content-center align-items-center">
    <form @submit.prevent="createArticle" class="form-container">
  <RouterLink :to="{name : 'ArticlesView'}" class="h5">
    <button type="btn" class="btn text-white ps-0">
      <
    </button>
  </RouterLink>
      <h1 class="mt-4">게시글 작성</h1> <!-- 폼 위에 제목을 표시합니다. -->
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model.trim ="title" class="form-control">
      </div>
      <div class="form-group">
        <label for="category">분류</label>
        <select id="category" v-model="category" class="form-control">
          <option disabled value="">다음 중 하나를 선택하세요</option>
          <option v-for="cat in articleStore.category" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model.trim="content" class="form-control" rows="10"></textarea>
      </div>
      <button type="submit" class="btn btn-danger">등록</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { RouterLink } from 'vue-router'

const articleStore = useArticleStore()
const title = ref('')
const content = ref('')
const category = ref('')

const createArticle = function() {
  const payload = {
    title: title.value,
    content: content.value,
    category: category.value
  }
  articleStore.createArticle(payload)
}
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
