<template>
  <div>
    <div class="modal fade" :id="'DetailModal-'+movie.id" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body bg-gray-700 d-flex row">
            <div class="col-7">
              <!-- <iframe width="430px" height="300px" src="https://www.youtube.com/embed/4Y05XXdOwbo" frameborder="0"></iframe> -->
              <div class="d-flex justify-content-between">
                <h2>{{movie.title}}</h2>
                <button class="btn">
                  <div class="pe-3 h3 text-danger text-center">
                    ♥
                  </div>
                </button>
              </div>
              <p>{{movie.overview}}</p>
              <h4>장르</h4>
              <!-- <p>{{movie.genre_ids}}</p> -->
            </div>
            <div class="col-5">
              <h3 class="text-center">영화 댓글</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing di, non tenetur aliquam animi sed iste, alias, sint assumenda? Id unde molestias sapiente dolores repudiandae?</p>
              <p>Mollitia amet ullam laborum officia minima commodi</p>
              <p>non tenetur aliquam animi sed iste, alias, sint assumenda? Id unde molestias sapiente dolores repudiandae?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMoviestore } from '@/stores/movies'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'


const movieStore = useMoviestore()
const router = useRouter()
const genreList = movieStore.genres

defineProps({
  movie: Object
})

console.log()


// const genres = movieStore.fillDetailGenre()






</script>

<style scoped>
div {
  color: black;
}


</style>