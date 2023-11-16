<template>
  <!-- pagina splash iniziale-->
  <div v-if="showSplash" class="splash overflow-hidden ">
    <img src="/image/netflix_newlogoanimation.gif" alt="gif">
  </div>
  <!-- header con navbar -->
  <HeaderComponent @search-submitted="submitSearch" />


  <main>
    <!-- div iniziale apertura sito -->
    <div class="my-vh front" :class="{ 'd-none': search !== '', 'd-block': search === '' }">
      <h2>Cerca un film o una serie Tv nella barra di ricerca</h2>
    </div>

    <!-- loader caricamenti Film e Serie -->
    <LoaderComponent v-if="loading" />

    <!-- div lista serie e movie -->
    <div v-if="!loading" :class="{ 'd-none': search === '', 'd-block': search !== '' }">

      <!-- SECTION 1 || MOVIE -->
      <section id="movie" class="container">
        <h2>Movie</h2>
        <!-- button slider card precedente -->
        <button
          class="btn prev-btn"
          @click="scrollMovies(-1)"
          :disabled="currentPageMovie === 0"
        >
          <i class="fa-solid fa-chevron-right fa-rotate-180"></i>
        </button>

        <!-- div row lista movie -->
        <div class="row overflow-hidden flex-nowrap">
          <div class="movie-list" :style="{ transform: `translateX(${translateXMovie}px)` }">

            <!-- ciclo for che stampa singole card -->
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
               
              />
              
            </div>
          </div>
        </div>
        <!-- button slider card successiva -->
        <button
          class="btn next-btn"
          @click="scrollMovies(1)"
          :disabled="currentPageMovie === maxPages"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </section>
      <!-- SECTION 2 || SERIES -->
      <section id="serie" class="container">
        <h2>Series</h2>

        <!-- button slider card precedente -->
        <button
          class="btn prev-btn"
          @click="scrollSeries(-1)"
          :disabled="currentPageSeries === 0"
        >
          <i class="fa-solid fa-chevron-right fa-rotate-180"></i>
        </button>

        <!-- div row lista serie -->
        <div class="row overflow-hidden flex-nowrap">
          <div class="movie-list" :style="{ transform: `translateX(${translateXSeries}px)` }">
           <!-- ciclo for che stampa singole card -->
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
             
            </div>
          </div>
        </div>
          <!-- button slider card successiva -->
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
      currentPageMovie: 0,
      currentPageSeries: 0,
      elementsPerPage: 6,
      loading: true,
      showSplash: true,
    };
  },
  computed: {
    //porzione di un elenco di film in base alla pagina corrente e al numero di elementi da visualizzare per pagina
    visibleMovies() {
      const start = this.currentPage * this.elementsPerPage;
      const end = start + this.elementsPerPage;
      return this.filterMovies().slice(start, end);
    },
    //porzione di un elenco di serie in base alla pagina corrente e al numero di elementi da visualizzare per pagina
    visibleseries() {
      const start = this.currentPage * this.elementsPerPage;
      const end = start + this.elementsPerPage;
      return this.filterSeries().slice(start, end);
    },

    //traslazioni Card
    translateXMovie() {
      return -this.currentPageMovie * this.getElementWidth();
    },
    translateXSeries() {
      return -this.currentPageSeries * this.getElementWidth();
    },

    //massimo scorrimento
    maxPages() {
      return this.filterMovies().length - 5;
    },
    maxPagesSeries() {
      return this.filterSeries().length - 5;
    },
  },
  methods: {
    //prende le serie e i film dall' API e interrompe il loading
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
    //trasforma la query in cosa c'è scritto nel search
    submitSearch(newSearch) {
      this.search = newSearch;
      store.params.query = this.search;
      this.getMoviesAndSeries();
    },

    //scorre film 
    scrollMovies(direction) {
      const totalMovies = this.filterMovies().length;
      const maxPages = totalMovies;
      this.currentPageMovie = Math.max(
        0,
        Math.min(this.currentPageMovie + direction, maxPages)
      );
    },
    //scorre serie
    scrollSeries(direction) {
      const totalSeries = this.filterSeries().length;
      const maxPagesSeries = totalSeries;
      this.currentPageSeries = Math.max(
        0,
        Math.min(this.currentPageSeries + direction, maxPagesSeries)
      );
    },

    //cerca film con filtro search
    filterMovies() {
      const searchMandS = this.search.toLowerCase();
      return this.store.movieList.filter((movie) => {
        return movie.title.toLowerCase().includes(searchMandS);
      });
    },

    //cerca serie con filtro search
    filterSeries() {
      const searchMandS = this.search.toLowerCase();
      return this.store.serieList.filter((serie) => {
        return serie.name.toLowerCase().includes(searchMandS);
      });
    },

    //definisce più o meno di quanto si deve spostare la translate in base a quanto è grande l'elemento
    getElementWidth() {
      return 200;
    },
   
    //nasconde la pagina splash dopo 4 secondi
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

</style>
