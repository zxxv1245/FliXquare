<template>
  <div>
    <form @submit.prevent = 'createComment' class="d-flex">
      <input type="text" v-model.trim = "content" class = "input w-100">
      <button type = "submit" class="btn btn-danger ms-3 p-1">↩</button>
    </form>
  </div>
</template>

<script setup>
import { useArticleStore } from '@/stores/articles';
import { ref } from 'vue'

const content = ref(null)
const articleStore = useArticleStore()

const createComment = function() {
  articleStore.createComment(content.value)
  content.value = ''
}

</script>

<style scoped>
.input {
  border-radius: 5px;
}

.btn {
  border-radius: 5px;
}
</style>