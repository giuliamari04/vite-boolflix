<template>
    <header>
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand">Boolflix</a>
        <form class="d-flex" @submit.prevent="submitSearch">
          <input class="form-control me-2" type="search" placeholder="Cerca film o serie TV" aria-label="Search" v-model="search">
          <button class="btn btn-danger " type="submit">Cerca</button>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
    export default {
        name:'HeaderComponent',
        data(){
            return{
                search:'',
            }
        },
        methods: {
    submitSearch() {
        this.$emit('search-submitted', this.search);
        console.log(this.$emit);
    },
  },
    }
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

nav{
  background-color: $blackBg;
  height: 70px;
  z-index: 8000;
  .navbar-brand{
    color:$redTitle !important;
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 600;
  }
}
.btn-danger{
  background-color: $redTitle !important;
}
</style>