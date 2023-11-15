<template>
   
          <div class="card border-0 " >
            <img :src="img" class="card-img-top" alt="img">
            <div class="card-body">
              <p class="card-text">{{ title }}</p> 
              <p>{{ original_title }}</p>
              <p>{{ original_language }}</p>
              <p>{{ vote_average }}</p>
            </div>
          </div> 
         
</template>

<script>
    export default {
        name:'CardComponent',
        props:{
            title:String,
            img:String,
            original_title:String,
            original_language:String,
            vote_average:Number,
           
        },
        data(){
            return{

            }
        }
        
    }
</script>

<style lang="scss" scoped>
</style>