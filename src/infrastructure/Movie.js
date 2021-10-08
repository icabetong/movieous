import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
export const api = axios.create({ baseURL: BASE_URL });
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

export const fetch = async (page) => {
    const response = await api.get("/movie/popular/", { params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        page: page
    }});

    return response.data;
}