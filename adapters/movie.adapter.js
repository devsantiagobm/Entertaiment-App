import { MOVIE_IMAGES_URL, IMDB_URL } from "../constants"
import peopleAdapter from "./people.adapter"
import ratingAdapter from "./rating.adapter"
import filmDurationAdapter from "./filmDuration.adapter"

export default function movieAdapter(movie, movieCast) {
    const {
        genres,
        homepage,
        id,
        title,
        name,
        overview,
        poster_path,
        vote_average,
        spoken_languages,
        tagline,
        runtime,
        release_date,
        imdb_id,
        revenue: numberRevenue } = movie

    const { cast: inAdaptedCast, crew: inAdaptedCrew } = movieCast

    const poster = Boolean(poster_path) ? MOVIE_IMAGES_URL + "/w780" + poster_path : "/title-placeholder.png"
    const cast = peopleAdapter(new Set(inAdaptedCast))
    const crew = peopleAdapter(new Set(inAdaptedCrew))
    const voteAverage = ratingAdapter(vote_average)
    const language = spoken_languages[0].name
    const imdbWebsite = IMDB_URL + imdb_id
    const length = filmDurationAdapter(runtime)
    const year = release_date.split("-")[0]
    const revenue = "$" + Number(numberRevenue).toLocaleString("en")

    return {
        genres,
        poster,
        cast,
        crew,
        voteAverage,
        language,
        website: homepage,
        id,
        title,
        description: overview,
        tagline,
        imdbWebsite,
        length,
        year,
        revenue, 
        category: "movies"
    }

}