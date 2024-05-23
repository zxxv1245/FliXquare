<template>
  <div>
    <form @submit.prevent = 'createMovieComment' class="d-flex justify-content-between">
      <input type="text" v-model = "content" class = "input w-75 ms-2" >
      <button type = "submit" class="btn btn-danger me-4 px-3">↩</button>
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
.input {
  border-radius: 5px;
}

.btn {
  border-radius: 5px;
}
</style>