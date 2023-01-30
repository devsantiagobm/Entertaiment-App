import { MOVIE_API_URL } from "../../../constants"
import seriesAdapter from "../../../adapters/series.adapter"

export default async function (req, res) {
    const API_KEY = process.env.API_KEY
    const url = MOVIE_API_URL + "discover/tv?api_key=" + API_KEY + "&sort_by=vote_count.desc"

    try {
        const data = await (await fetch(url)).json()
        const adaptedMovies = seriesAdapter(data.results)
        res.status(200).json({popularTv: adaptedMovies, success: true})
    } catch (error) {
        res.status(500).json({success: false})
    }
}