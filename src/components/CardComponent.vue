<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="card bg-transparent text-light border-0">
          <img :src="img" class="card-img-top" alt="img" />
        </div>
      </div>
      <div class="flip-card-back p-3">
        <p class="card-text">Titolo: {{ title }}</p>
        <p>Titolo originale:{{ original_title }}</p>
        <!-- <p>{{ original_language }}</p> -->
        <img :src="original_language_img" alt="img" />
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
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: String,
    img: String,
    original_title: String,
    original_language: String,
    vote_average: Number,
    original_language_img: String,
    vote_star: Number,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
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
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: transparent;
}

.flip-card-back {
  background-color: rgba(0, 0, 0, 0.486);
  box-shadow: 0px 0px 8px 0px black;
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
</style>
