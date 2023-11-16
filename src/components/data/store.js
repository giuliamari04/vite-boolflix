import {reactive} from "vue";

export const store = reactive({
   apriUrl:"https://api.themoviedb.org/3/",
   imgUrl:"https://image.tmdb.org/t/p/w342/", //collega poster_path
   endPoint:{
    movie:"search/movie",
    series:"search/tv",
   },
   params:{
    api_key:"d170466bdf6c45702dc63dcd9b94ee73",
    query:"",
   },

   error:"",
   loading:true,
   movieList:[],
   serieList:[],
});
