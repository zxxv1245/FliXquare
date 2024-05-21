<template>
  <div>
    <form @submit.prevent = 'createMovieComment'>
      <input type="text" name="" id="" v-model = "content" >
      <input type="submit" value = "작성">
    </form>
  </div>
</template>

<script setup>
import { useMoviestore } from '@/stores/movies';
import { ref } from 'vue'
const props = defineProps({
  movie : Object
})
const content = ref(null)
const movieStore = useMoviestore()

const createMovieComment = function() {
  // console.log(props.movie.id)
  // console.log(content.value)
  const payload = {
    movieId : props.movie.id,
    content : content.value
  }
  movieStore.createMovieComment(payload)
  content.value = ''
}

</script>

<style scoped>

</style>