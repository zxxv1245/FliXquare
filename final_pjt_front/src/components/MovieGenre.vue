<template>
  <div>
    <h3>{{ genre.name }}({{ genre.id }})가 보고 싶은 순간!</h3>

    <div
    v-for="movie in movieStore.movies.filter((movie) => movie.genre_ids.includes(genre.id)).slice(0,18)"
    >
    <MovieCard
    :movie="movie"
    />
    </div>
    <div>
    </div>
  </div>
</template>

<script setup>
import { useMoviestore } from '@/stores/movies'
import MovieCard from '@/components/MovieCard.vue'

const movieStore = useMoviestore()

defineProps({
  genre:Object
})

</script>

<style scoped>

</style>