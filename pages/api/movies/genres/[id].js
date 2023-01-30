import { MOVIE_API_URL } from "../../../../constants";
import moviesAdapter from "adapters/movies.adapter";

export default async function (req, res) {
    try {
        const { id } = req.query
        const url = MOVIE_API_URL + "discover/movie?api_key=" + process.env.API_KEY + "&with_genres=" + id  + "&sort_by=vote_count.desc"
        const data = await (await fetch(url)).json()
        const movies = moviesAdapter(data.results)
        res.status(200).json({ movies, success: true });

    } catch (error) {
        res.status(500).json({ success: false });
    }

}