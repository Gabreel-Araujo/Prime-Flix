import axios from "axios";
//base da url :  https://api.themoviedb.org/3/
//url : https://api.themoviedb.org/3/movie/now_playing?api_key=b4a426a8506628285d96224338c63339&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;