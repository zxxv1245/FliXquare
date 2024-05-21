<template>
  <div class = "container border border-white">
    <form @submit.prevent = "updateArticle">
      <div>
        <label for="title">제목</label>
        <input type="text" name="" id="title" v-model = "title">
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
import { ref,onMounted,watch,onBeforeMount } from 'vue'
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

</style>