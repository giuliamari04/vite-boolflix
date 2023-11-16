<template>
  <div v-if="showSplash" class="splash overflow-hidden ">
    <img src="/public/image/netflix_newlogoanimation.gif" alt="gif">
  </div>
  <HeaderComponent @search-submitted="submitSearch" />
  <main>
    <div
      class="my-vh front"
      :class="{ 'd-none': search !== '', 'd-block': search === '' }"
    >
      <h2>Cerca un film o una serie Tv nella barra di ricerca</h2>
    </div>
    <LoaderComponent v-if="loading" />
    <div
      v-if="!loading"
      :class="{ 'd-none': search === '', 'd-block': search !== '' }"
    >
      <section id="movie" class="container">
        <h2>Movie</h2>
        <button
          class="btn prev-btn"
          @click="scrollMovies(-1)"
          :disabled="currentPageMovie === 0"
        >
          <i class="fa-solid fa-chevron-right fa-rotate-180"></i>
        </button>
        <div class="row overflow-hidden flex-nowrap">
          <div
            class="movie-list"
            :style="{ transform: `translateX(${translateXMovie}px)` }"
          >
            <div
              class="col-12 col-md-4 col-lg-2 px-1"
              v-for="(movie, index) in filterMovies()"
              :key="movie.id"
            >
              <CardComponent
                :img="movie.poster_path"
                :imgPath="'https://image.tmdb.org/t/p/w300'"
                :title="movie.title"
                :original_title="movie.original_title"
                :original_language="movie.original_language"
                :original_language_img="
                  '/flags/' + movie.original_language + '.png'
                "
                :vote_average="movie.vote_average"
                :vote_star="Math.ceil(movie.vote_average / 2)"
                :overview="movie.overview"
                @toggle-overview="toggleOverview(movie.overview)"
              />
              <div v-if="showOverview" class="overview-overlay" @click="toggleOverview">
      <div class="overview-box">
        <button class="btn btn-link">Chiudi</button>
        <p class="overview-text">{{ movie.overview  }}</p>
      </div>
    </div>
            </div>
          </div>
        </div>
        <button
          class="btn next-btn"
          @click="scrollMovies(1)"
          :disabled="currentPageMovie === maxPages"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </section>

      <section id="serie" class="container">
        <h2>Series</h2>
        <button
          class="btn prev-btn"
          @click="scrollSeries(-1)"
          :disabled="currentPageSeries === 0"
        >
          <i class="fa-solid fa-chevron-right fa-rotate-180"></i>
        </button>
        <div class="row overflow-hidden flex-nowrap">
          <div
            class="movie-list"
            :style="{ transform: `translateX(${translateXSeries}px)` }"
          >
            <div
              class="col-12 col-md-4 col-lg-2 px-1"
              v-for="(series, index) in filterSeries()"
              :key="series.id"
            >
              <CardComponent
                :img="series.poster_path"
                :imgPath="'https://image.tmdb.org/t/p/w300'"
                :title="series.name"
                :original_title="series.original_name"
                :original_language="series.original_language"
                :original_language_img="
                  '/flags/' + series.original_language + '.png'
                "
                :vote_average="series.vote_average"
                :vote_star="Math.ceil(series.vote_average / 2)"
                :overview="series.overview"
              />
              <div v-if="showOverview" class="overview-overlay" @click="toggleOverview">
      <div class="overview-box">
        <button class="btn btn-link">Chiudi</button>
        <p class="overview-text">{{series.overview  }}</p>
      </div>
    </div>
            </div>
          </div>
        </div>
        <button
          class="btn next-btn"
          @click="scrollSeries(1)"
          :disabled="currentPageSeries === maxPagesSeries"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { store } from "./components/data/store.js";
import CardComponent from "./components/CardComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import LoaderComponent from "./components/LoaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    CardComponent,
    LoaderComponent,
  },
  data() {
    return {
      store,
      search: "",
      currentPage: 0,
      currentPageMovie: 0,
      currentPageSeries: 0,
      elementsPerPage: 6,
      loading: true,
      showOverview: false,
      selectedOverview: '',
      showSplash: true,
    };
  },
  computed: {
    visibleMovies() {
      const start = this.currentPage * this.elementsPerPage;
      const end = start + this.elementsPerPage;
      return this.filterMovies().slice(start, end);
    },
    visibleseries() {
      const start = this.currentPage * this.elementsPerPage;
      const end = start + this.elementsPerPage;
      return this.filterSeries().slice(start, end);
    },
    translateXMovie() {
      return -this.currentPageMovie * this.getElementWidth();
    },
    translateXSeries() {
      return -this.currentPageSeries * this.getElementWidth();
    },
    maxPages() {
      return this.filterMovies().length - 5;
    },
    maxPagesSeries() {
      return this.filterSeries().length - 5;
    },
  },
  methods: {
    getMoviesAndSeries() {
      this.loading = true;
      // prende i film
      const movieurl = store.apriUrl + this.store.endPoint.movie;
      const params = {
        api_key: this.store.params.api_key,
        query: this.search,
      };
      axios.get(movieurl, { params }).then((res) => {
        console.log(res.data.results);
        this.store.movieList = res.data.results;
        this.loading = false;
      });
      // prende le serie
      const serieurl = store.apriUrl + this.store.endPoint.series;
      axios.get(serieurl, { params }).then((res) => {
        console.log(res.data.results);
        this.store.serieList = res.data.results;
        this.loading = false;
      });
    },
    submitSearch(newSearch) {
      this.search = newSearch;
      store.params.query = this.search;
      this.getMoviesAndSeries();
    },
    scrollMovies(direction) {
      const totalMovies = this.filterMovies().length;
      const maxPages = totalMovies;
      this.currentPageMovie = Math.max(
        0,
        Math.min(this.currentPageMovie + direction, maxPages)
      );
    },
    scrollSeries(direction) {
      const totalSeries = this.filterSeries().length;
      const maxPagesSeries = totalSeries;
      this.currentPageSeries = Math.max(
        0,
        Math.min(this.currentPageSeries + direction, maxPagesSeries)
      );
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
    getElementWidth() {
      return 200;
    },
    toggleOverview() {
      this.showOverview = !this.showOverview;
    },
    hideSplash() {
      setTimeout(() => {
        this.showSplash = false;
      }, 4000);
    },

    
  },
  created() {
    this.getMoviesAndSeries();
     this.hideSplash();
  },
 };
</script>

<style lang="scss" scoped>
.splash{
position: absolute;
z-index: 10000;
top: 0;
left: 0;
right: 0;
bottom: 0;
img{
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
}
} 
.my-vh {
  height: 90vh;
}
.container {
  position: relative;
}

.scroll-container {
  display: flex;
  align-items: center;
}
.movie-list {
  transition: 0.5s;
}
.prev-btn,
.next-btn {
  width: 50px;
  height: 290px;
  color: white;
  background-color: rgba(0, 0, 0, 0.575);
  cursor: pointer;
  position: absolute;
  z-index: 3000;
  opacity: 0;
}

.prev-btn:hover {
  opacity: 1;
}
.next-btn:hover {
  opacity: 1;
}

.movie-list {
  display: flex;
}

.prev-btn {
  left: -55px;
}
.next-btn {
  right: -55px;
  top: 40px;
}
.overview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.overview-box {
  background-color:black;
  padding: 20px;
  border-radius: 8px;
  width: 70%;
  max-width: 800px;
  overflow-y: auto;
}

.overview-text {
  font-size: small;
}
</style>
