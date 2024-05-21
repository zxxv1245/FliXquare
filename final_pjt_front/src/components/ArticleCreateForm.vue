<template>
  <div class = "container border border-white">
    <form @submit.prevent = "createArticle">
      <div>
        <label for="title">제목</label>
        <input type="text" name="" id="title" v-model = "title">
      </div>
      <div>
        <label for="">분류</label>
        <select name="Categoty" v-model = "category">
          <option disabled value="">다음 중 하나를 선택하세요</option>
          <option value="자유">자유</option>
          <option value="영화">영화</option>
        </select>
      </div>
      <div>
        <label for="content">내용</label>
        <textarea name="" id="content" cols="30" rows="10" v-model = "content"></textarea>
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '@/stores/articles';

const articleStore = useArticleStore()
const title = ref(null)
const content = ref(null)
const category = ref(null)

const createArticle = function() {
  const payload = {
    title : title.value,
    content : content.value,
    category : category.value
  }
  articleStore.createArticle(payload)
}
</script>

<style scoped>
div {
  color: white;
}
</style>