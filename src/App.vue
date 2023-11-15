<template>
  <HeaderComponent />
  <main>
    <section id="movie" class="container">
      <h2>film</h2>
      <div class="row">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="(movie, index) in store.movieList"
          :key="movie.id"
        >
          <CardComponent
            :img="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
            :title="movie.title"
            :original_title="movie.original_title"
            :original_language="movie.original_language"
            :vote_average="movie.vote_average"
          />
        </div>
      </div>
    </section>

    <section id="serie" class="container">
      <h2>serie</h2>
      <div class="row">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="(series, index) in store.serieList"
          :key="series.id"
        >
          <CardComponent
            :img="'https://image.tmdb.org/t/p/w300' + series.poster_path"
            :title="series.name"
            :original_title="series.original_name"
            :original_language="series.original_language"
            :vote_average="series.vote_average"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import { store } from "./components/data/store.js";
import CardComponent from "./components/CardComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    CardComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getMoviesAndSeries() {
      // prende i film
      const movieurl = store.apriUrl + this.store.endPoint.movie;
      axios.get(movieurl, { params: this.store.params }).then((res) => {
        console.log(res.data.results);
        this.store.movieList = res.data.results;
      });
      // prende le serie
      const serieurl = store.apriUrl + this.store.endPoint.series;
      axios.get(serieurl, { params: this.store.params }).then((res) => {
        console.log(res.data.results);
        this.store.serieList = res.data.results;
      });
    },
  },
  created() {
    this.getMoviesAndSeries();
  },
};
</script>

<style lang="scss" scoped></style>
