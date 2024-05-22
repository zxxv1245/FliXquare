<template>
  <div>
    <div class="modal fade" :id="'DetailModal-'+movie.id" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom-0" data-bs-theme="dark">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body bg-gray-700 d-flex row">
            <div class="col-7">
              <!-- <iframe width="430px" height="300px" src="https://www.youtube.com/embed/4Y05XXdOwbo" frameborder="0"></iframe> -->
              <div class="d-flex justify-content-between">
                <h2>{{movie.title}}</h2>
                <MovieCardDetailModalStoreButton
                  :key = "movie.id"
                  :movie-id = "movie.id"/>
                <MovieCardDetailModalLikeButton
                  :key = "movie.id"
                  :movie-id = "movie.id"
                  :movie = "movie"/>
              </div>
              <p>{{movie.overview}}</p>
              <h4>장르</h4>
              <!-- <p>{{movie.genre_ids}}</p> -->
              <span v-for="id in movieStore.fillDetailGenre(movie.genre_ids)">{{ id }}</span>
            </div>
            <div class="col-5">
              <h3 class="text-center">영화 댓글</h3>
              <div 
                v-for = "comment in comments"
                :key = "comment.id">
                <b>{{ comment.user.username }}</b> | <p class = "pTag">{{ comment.content }}</p>
                <MovieCardDetailModalCommentLikeButton
                  :key = "comment.id"
                  :comment-id = "comment.id"
                  :comment = "comment"/>
                <button @click = "deleteComment(comment.id)">삭제</button>
              </div>
              <MovieCardDetailModalCommentCreateForm
                :movie = "movie"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCardDetailModalCommentLikeButton from './MovieCardDetailModalCommentLikeButton.vue'
import MovieCardDetailModalStoreButton from './MovieCardDetailModalStoreButton.vue'
import MovieCardDetailModalLikeButton from '@/components/MovieCardDetailModalLikeButton.vue'
import MovieCardDetailModalCommentCreateForm from '@/components/MovieCardDetailModalCommentCreateFom.vue'
import { useMoviestore } from '@/stores/movies'
import { onMounted,computed } from 'vue'


const movieStore = useMoviestore()
const genreList = movieStore.genres

const props = defineProps({
  movie: Object
})

const comments = computed(() => {
  return movieStore.allMovieComments.filter((comment) => props.movie.id === comment.movie)
})

const deleteComment = function(commentId) {
  movieStore.deleteComment(commentId)
}

onMounted(() => {
  movieStore.getMovieComment()
})





// const genres = movieStore.fillDetailGenre()

</script>

<style scoped>
div {
  color: white;
}

.modal-content {
  background-color: rgb(0, 0, 0, 0.85);
}

span {
  padding-right: 24px;
}

.pTag {
  display: inline;
}
</style>