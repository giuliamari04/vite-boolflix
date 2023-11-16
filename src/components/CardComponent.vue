<template>
 <div class="flip-card" @click="toggleOverview">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="card bg-transparent text-light border-0">
          <img :src="getImage" class="card-img-top" alt="img" />
        </div>
      </div>
      <div class="flip-card-back p-3">
        <p class="card-text">Titolo: {{ title }}</p>
        <p>Titolo originale:{{ original_title }}</p>
        <p>{{ original_language }}</p>
        <img :src="getFlag" alt="img" />
        <p>voto: {{ vote_average }}</p>
        <div class="d-flex flex-row">
          <div v-for="i in 5" :key="i">
            <i
              :class="[
                { 'fa-regular': i > vote_star, 'fa-solid': i <= vote_star },
                'fa fa-star',
              ]"
              class="fa-star"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showOverview" class="overview-overlay">
    <div class="overview-box d-flex justify-content-end flex-column ">
      <button class="btn text-light border-0   d-flex justify-content-end" @click="toggleOverview"><i class="fa-solid fa-xmark"></i></button>
      <h5>Overview:</h5>
      <p class="overview-text">{{ overview }}</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: String,
    imgPath:String,
    img: String,
    original_title: String,
    original_language: String,
    vote_average: Number,
    original_language_img: String,
    vote_star: Number,
    overview: String,
  },
  data() {
    return {
      showOverview: false,
    };
  },
  methods: {
    toggleOverview() {
      this.showOverview = !this.showOverview;
    },
  },
  computed:{
    getImage(){
      return this.img ? this.imgPath + this.img :'/public/image/default-placeholder.png';
    },
    getFlag(){
      return this.original_language_img ? this.original_language_img :'/public/flags/en.png';
    },
    
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;
.card {
  cursor: pointer;
  transition: 1s;
  
  .card-img-top {
    height: 40vh;
  }
}

.flip-card {
  background-color: transparent;
  height: 43vh;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
  
  
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 93%;
  margin-top: 5px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

 
}

.flip-card-front {
  background-color: transparent;
 
}

.flip-card-back {
  background-color: rgba(0, 0, 0, 0.486);
  box-shadow: 0px 0px 5px 0px white;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-align: left;
 font-size: small;

 
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
