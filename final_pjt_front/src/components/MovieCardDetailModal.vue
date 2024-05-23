<template>
  <div>
    <div class="modal fade" :id="'DetailModal-'+movie.id" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom-0" data-bs-theme="dark">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body bg-gray-700 d-flex row">
            <div class="col-6">
              <!-- <iframe width="430px" height="300px" src="https://www.youtube.com/embed/4Y05XXdOwbo" frameborder="0"></iframe> -->
              <div class="d-flex justify-content-center p-3">
                <img :src="imgURL(movie.poster_path)" alt="poster" class="w-75">
              </div>
              <div class="d-flex justify-content-between">
                <h2 class="me-1">{{movie.title}}</h2>
                <div class="d-flex">
                  <MovieCardDetailModalStoreButton
                    :key = "movie.id"
                    :movie-id = "movie.id"
                    :movie="movie"
                    class="btn btn-dark"
                    id="btn"
                    />
                  <MovieCardDetailModalLikeButton
                    :key = "movie.id"
                    :movie-id = "movie.id"
                    :movie = "movie"
                    id="btn"
                    class="btn btn-dark ms-2"
                    />
                </div>
              </div>
              <p>{{movie.overview}}</p>
              <h4>장르</h4>
              <span v-for="id in movieStore.fillDetailGenre(movie.genre_ids)">{{ id }}</span>
            </div>
            <div class="col-6 border-start border-white position-relative">
              <h3 class="text-center">영화 댓글</h3>
              <div
                v-for = "comment in comments"
                :key = "comment.id"
                class = "d-flex justify-content-between">
                <div class = "Tag">
                  <b>{{ comment.user.username }}</b> | <p class = "Tag">{{ comment.content }}</p>
                </div>
                <div class = "Tag d-flex">
                  <MovieCardDetailModalCommentUpdateForm
                    :key = "comment.id"
                    :comment-id = "comment.id"
                    :comment = "comment"
                    class = "Tag"/>
                  <div class = "Tag text-center ms-2">
                    <MovieCardDetailModalCommentLikeButton
                      :key = "comment.id"
                      :comment-id = "comment.id"
                      :comment = "comment"
                      />
                    <p class = "fts">{{ comment.likes_user.length }}</p>
                  </div>
                </div>
              </div>
              <MovieCardDetailModalCommentCreateForm
                class="position-absolute bottom-0 w-100"
                :movie = "movie"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCardDetailModalCommentUpdateForm from '@/components/MovieCardDetailModalCommentUpdateForm.vue'
import MovieCardDetailModalCommentLikeButton from './MovieCardDetailModalCommentLikeButton.vue'
import MovieCardDetailModalStoreButton from './MovieCardDetailModalStoreButton.vue'
import MovieCardDetailModalLikeButton from '@/components/MovieCardDetailModalLikeButton.vue'
import MovieCardDetailModalCommentCreateForm from '@/components/MovieCardDetailModalCommentCreateFom.vue'
import { useMoviestore } from '@/stores/movies'
import { onMounted,computed } from 'vue'


const movieStore = useMoviestore()
// const genreList = movieStore.genres

const props = defineProps({
  movie: Object
})

const imgURL = (path, size = 400) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`
}

const comments = computed(() => {
  return movieStore.allMovieComments.filter((comment) => props.movie.id === comment.movie)
})



onMounted(() => {
  movieStore.getMovieComment()
})

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

.Tag {
  display: inline;
}
.fts {
  font-size: 12px;
}

#btn {
  height: 40px;
}

</style>