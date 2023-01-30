import { MOVIE_API_URL } from "../../constants"
import listAdapter from "../../adapters/list.adapter"

export default async function (req, res) {
    const API_KEY = process.env.API_KEY
    const url = MOVIE_API_URL + "trending/all/day?api_key=" + API_KEY

    try {
        const data = await (await fetch(url)).json()
        const adaptedMovies = listAdapter(data.results)
        res.status(200).json({trending: adaptedMovies, success: true})
    } catch (error) {
        res.status(500).json({success: false})
    }
}