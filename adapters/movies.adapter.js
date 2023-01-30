import { MOVIE_IMAGES_URL } from "../constants";
import ratingAdapter from "./rating.adapter";

export default function moviesAdapter(list) {
    return list.map(element => {
        const { title, name, backdrop_path, release_date, vote_average, first_air_date, id, poster_path } = element
        const year = release_date?.split("-")[0] || first_air_date?.split("-")[0];
        const image = Boolean(backdrop_path || poster_path) ?   MOVIE_IMAGES_URL + "/w500" + (backdrop_path || poster_path) : "/title-placeholder.png"
        const rating = ratingAdapter(vote_average)

        return {
            title: title || name,
            image,
            year,
            rating,
            category: "movie",
            id
        }
    })
}