import { MOVIE_IMAGES_URL } from "../constants"
import peopleAdapter from "./people.adapter"
import ratingAdapter from "./rating.adapter"

export default function tvAdapter(serie, serieCast) {
    const {
        created_by,
        genres,
        first_air_date,
        last_air_date,
        homepage,
        id,
        name, 
        title,
        overview,
        poster_path,
        vote_average,
        spoken_languages,
        tagline, 
        status } = serie

    const { cast: inAdaptedCast, crew: inAdaptedCrew } = serieCast

    const poster = MOVIE_IMAGES_URL + "/w780" + poster_path
    const cast = peopleAdapter(inAdaptedCast)
    const crew = peopleAdapter(inAdaptedCrew)
    const creators = peopleAdapter(created_by)
    const voteAverage = ratingAdapter(vote_average)
    const firstAir = String(first_air_date)?.split("-")[0]
    const lastAir = String(last_air_date)?.split("-")[0]
    const language = spoken_languages[0]?.name

    return {
        poster,
        creators,
        genres,
        website: homepage,
        id,
        title: name || title, 
        description: overview,
        voteAverage,
        language,
        cast,
        crew,
        tagline,
        firstAir,
        lastAir,
        status,
        category: "tv"
    }

}