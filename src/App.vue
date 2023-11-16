<template>
  <HeaderComponent 
  @search-submitted="submitSearch"
  />
  <main>
    <div class="my-vh" :class="{ 'd-none': search !== '', 'd-block': search === '' }">
      <h2>Cerca un film o una serie Tv nella barra di ricerca </h2>
    </div>
    <div :class="{ 'd-none': search === '', 'd-block': search !== '' }">
     

    <section id="movie" class="container">
      <h2>Movie</h2>
      <div class="row flex-nowrap  overflow-x-scroll overflow-y-hidden">
        <div
          class="col-12 col-md-4 col-lg-2"
          v-for="(movie, index) in filterMovies()"
          :key="movie.id"
        >
          <CardComponent
            :img="movie.poster_path"
            :imgPath="'https://image.tmdb.org/t/p/w300'"
            :title="movie.title"
            :original_title="movie.original_title"
            :original_language="movie.original_language"
            :original_language_img="'/flags/'+ movie.original_language +'.png'"
            :vote_average="movie.vote_average"
            :vote_star="Math.ceil(movie.vote_average / 2)"
          />
        </div>
      </div>
    </section>

    <section id="serie" class="container">
      <h2>Series</h2>
      <div class="row flex-nowrap  overflow-x-scroll overflow-y-hidden ">
        <div
          class="col-12 col-md-4 col-lg-2"
          v-for="(series, index) in filterSeries()"
          :key="series.id"
        >
          <CardComponent
            :img="series.poster_path"
            :imgPath="'https://image.tmdb.org/t/p/w300'"
            :title="series.name"
            :original_title="series.original_name"
            :original_language="series.original_language"
            :original_language_img="'/flags/'+ series.original_language +'.png'"
            :vote_average="series.vote_average"
            :vote_star="Math.ceil(series.vote_average / 2)"
          />
        </div>
      </div>
    </section>
  </div>
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
      search:''
    };
  },
  methods: {
    getMoviesAndSeries() {
      // prende i film
      const movieurl = store.apriUrl + this.store.endPoint.movie;
      const params = {
      api_key: this.store.params.api_key,
      query: this.search,
    };
      axios.get(movieurl, { params }).then((res) => {
        console.log(res.data.results);
        this.store.movieList = res.data.results;
      });
      // prende le serie
      const serieurl = store.apriUrl + this.store.endPoint.series;
      axios.get(serieurl, { params }).then((res) => {
        console.log(res.data.results);
        this.store.serieList = res.data.results;
      });
    },
    submitSearch(newSearch){
      this.search = newSearch;
      store.params.query = this.search;
      this.getMoviesAndSeries();
    },
    filterMovies() {
      const searchMandS = this.search.toLowerCase();
      return this.store.movieList.filter((movie) => {
        return movie.title.toLowerCase().includes(searchMandS);
      });
    },
    filterSeries() {
      const searchMandS = this.search.toLowerCase();
      return this.store.serieList.filter((serie) => {
        return serie.name.toLowerCase().includes(searchMandS);
      });
    },
   
  },
  created() {
    this.getMoviesAndSeries();
  },
  
};
</script>

<style lang="scss" scoped>
.my-vh{
  height: 90vh;
}
</style>
