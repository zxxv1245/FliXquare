import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import OpenAI from "openai";
import axios from "axios";

export const useMoviestore = defineStore(
  "movies",
  () => {
    const API_URL = "http://127.0.0.1:8000";
    const OPEN_API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "api_key";

    // 전체 영화 목록
    const movies = ref([]);
    // 인기 영화 목록
    const latest = ref([]);

    // 장르 목록
    const genres = ref([]);

    const popularList = ref([]);

    const fillPopular = function () {
      popularList.value = movies.value.slice();
      popularList.value.sort(function (a, b) {
        if (a.likes_user.length > b.likes_user.length) {
          return -1;
        }
        if (a.likes_user.length < b.likes_user.length) {
          return 1;
        }
        return 0;
      });
      popularList.value = popularList.value.slice(0, 10);
    };

    // 전체 최신 영화 채우기
    const fillLatest = function () {
      latest.value = movies.value.filter((movie) => movie.is_latest);
    };

    // 전체 영화 채우기 axios
    const fillMovies = function () {
      axios({
        method: "GET",
        url: `${API_URL}/api/v1/movies/`,
      }).then((response) => {
        movies.value = response.data;
        // popularity 기준으로 정렬함
        movies.value.sort(function (a, b) {
          if (a.popularity > b.popularity) {
            return -1;
          }
          if (a.popularity < b.popularity) {
            return 1;
          }
          return 0;
        });
        fillLatest();
        getMovieTitle();
        fillPopular();
      });
    };
    // 외부 Counter 불러오기
    const counterStore = useCounterStore();

    // userGenre 채우기
    const userGenre = ref([]);
    const getUserGenre = function () {
      userGenre.value = [];
      counterStore.userGenre.forEach((Genre) => {
        userGenre.value.push(Genre.name);
      });
    };
    const movieNames = ref([]);
    const getMovieTitle = function () {
      movieNames.value = [];
      const temp = ref(
        movies.value.filter((movie) => movie.id > 20 && movie.id <= 40)
      );
      temp.value.forEach((movie) => {
        movieNames.value.push(movie.title);
      });
    };

    // 전체 장르 불러오기
    const getGenre = function () {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/genres/`,
      }).then((res) => {
        genres.value = res.data;
      });
    };

    // Detail에서 영화 불러오고, 장르 불러오기
    const fillDetailGenre = function (ids) {
      const movieGenreName = ref([]);
      ids.forEach((id) => {
        const genreName = genres.value.find((genre) => genre.id === id).name;
        movieGenreName.value.push(genreName);
      });
      return movieGenreName.value;
    };

    // API 요청할 message 채우기
    const apiMessages = computed(() => {
      return `나는 [${userGenre.value}] 장르를 좋아해. 내가 가지고 있는 영화 목록은 [${movieNames.value}]가 있어. 이 중에 영화 제목 6개만 출력해줘.`;
    });

    // 추천 영화 목록
    const recommend = ref([]);

    // chatGPT API
    const ChatGpt = function (message) {
      if (recommend.value.length === 0 && movieNames.value.length > 0) {
        console.log("axios 요청에 들어간다.");
        axios({
          method: "post",
          url: OPEN_API_URL,
          headers: {
            Authorization: `Bearer ${API_KEY}`, // 인증 키 설정
            "Content-Type": "application/json", // 요청 데이터의 타입
          },
          data: {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `${message}`,
              },
            ],
          },
        })
          .then((res) => {
            // 응답 데이터 확인 (크롬 개발자 도구 콘솔창)
            // 0. 요청 보내기 전 보낼 메세지를 확인한다.
            // 1. 응답 데이터에서 응답 메세지를 가져온다.
            const message = ref(res.data.choices[0].message.content);
            // console.log(message.value)
            // 2. 문자열을 배열로 변환 (GPT response 가공)
            message.value = message.value
              .split("\n")
              .map((line) => line.replace(/^\d+\.\s*/, "").trim());
            // console.log('가공 데이터 :', message.value)

            // 3. 교집합 찾기
            recommend.value = movies.value.filter((movie) =>
              message.value.some((title) => movie.title === title)
            );
            // console.log(recommend.value)
            fillMovies();
          })
          .catch((err) => {
            recommend.value = movies.value.slice(44, 50);
            fillMovies();
            console.log(err);
          });
      }
    };

    const allMovieComments = ref([]);

    // 전체 댓글 조회
    const getMovieComment = function () {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/comments/`,
        headers: {
          Authorization: `Token ${counterStore.token}`,
        },
      })
        .then((res) => {
          // console.log('성공')
          allMovieComments.value = res.data;
        })
        .catch((e) => {
          // console.log('실패')
        });
    };

    // 영화 댓글 생성
    const createMovieComment = function (payload) {
      const { movieId, content } = payload;
      axios({
        method: "post",
        url: `${API_URL}/api/v1/movies/${movieId}/comments/`,
        headers: {
          Authorization: `Token ${counterStore.token}`,
        },
        data: { content },
      })
        .then((res) => {
          // console.log('moviecommentcreate성공')
          getMovieComment();
        })
        .catch((e) => {
          console.log("실패");
        });
    };

    // 영화 댓글 삭제
    const deleteComment = function (commentId) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${commentId}/`,
        headers: {
          Authorization: `Token ${counterStore.token}`,
        },
      })
        .then((res) => {
          // console.log('성공')
          getMovieComment();
        })
        .catch((e) => {
          console.log("실패");
        });
    };

    const movieComment = ref({});

    const getMovieCommentDetail = function (commentId) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/comments/${commentId}/`,
        headers: {
          Authorization: `Token ${counterStore.token}`,
        },
      })
        .then((res) => {
          // console.log('성공')
          movieComment.value = res.data;
        })
        .catch((e) => {
          console.log("실패");
        });
    };

    // 영화 댓글 수정
    const updateMovieComment = function (commentId, movieComment) {
      axios({
        method: "put",
        url: `${API_URL}/api/v1/comments/${commentId}/`,
        headers: {
          Authorization: `Token ${counterStore.token}`,
        },
        data: { content: movieComment.content },
      })
        .then((res) => {
          // console.log('성공')
          getMovieComment();
        })
        .catch((e) => {
          console.log("실패");
        });
    };
    const myMovies = ref([]);
    const getmyMovies = function () {
      myMovies.value = movies.value.filter((movie) => {
        // console.log(movie.store_user)
        return movie.store_user.includes(counterStore.userId);
      });
    };

    return {
      movies,
      latest,
      genres,
      apiMessages,
      recommend,
      popularList,
      allMovieComments,
      movieComment,
      fillMovies,
      fillLatest,
      getGenre,
      fillDetailGenre,
      getUserGenre,
      getMovieTitle,
      ChatGpt,
      getMovieComment,
      createMovieComment,
      deleteComment,
      updateMovieComment,
      getMovieCommentDetail,
    };
  },
  { persist: true }
);
