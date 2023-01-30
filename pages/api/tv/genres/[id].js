import { MOVIE_API_URL } from "../../../../constants";
import seriesAdapter from "adapters/series.adapter";

export default async function (req, res) {
    try {
        const { id } = req.query
        const url = MOVIE_API_URL + "discover/tv?api_key=" + process.env.API_KEY + "&with_genres=" + id  + "&sort_by=vote_count.desc"
        const data = await (await fetch(url)).json()
        const tv = seriesAdapter(data.results)
        res.status(200).json({ tv, success: true });

    } catch (error) {
        res.status(500).json({ success: false });
    }

}