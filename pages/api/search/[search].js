import { MOVIE_API_URL } from "../../../constants"
import useFetches from "hooks/useFetches"
import moviesAdapter from "adapters/movies.adapter"
import seriesAdapter from "adapters/series.adapter"

export default async function (req, res) {
    const search = req.query.search
    const movieUrl = MOVIE_API_URL + "search/movie?api_key=" + process.env.API_KEY + "&query=" + search + "&sort_by=vote_count.desc"
    const tvUrl = MOVIE_API_URL + "search/tv?api_key=" + process.env.API_KEY + "&query=" + search + "&sort_by=vote_count.desc"
    const urls = [movieUrl, tvUrl] // We have to do to different request cause the api dont have multi search

    try {
        const [movies, series] = await Promise.all(useFetches(urls))
        const moviesAdapted = moviesAdapter(movies.results)
        const seriesAdapted = seriesAdapter(series.results)
        res.status(200).json({ movies: moviesAdapted, series: seriesAdapted })
    } catch (error) {
        res.status(500).json({ success: false })
    }
}