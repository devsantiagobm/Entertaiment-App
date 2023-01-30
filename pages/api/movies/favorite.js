import { MOVIE_API_URL } from "../../../constants"
import moviesAdapter from "../../../adapters/movies.adapter"

export default async function (req, res) {
    const API_KEY = process.env.API_KEY
    const url = MOVIE_API_URL + "discover/movie?api_key=" + API_KEY + "&sort_by=vote_average.desc&vote_count.gte=8000"

    try {
        const data = await (await fetch(url)).json()
        const adaptedMovies = moviesAdapter(data.results)
        res.status(200).json({favoriteMovies: adaptedMovies, success: true})
    } catch (error) {
        res.status(500).json({success: false})
    }
}