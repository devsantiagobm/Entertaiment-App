import { MOVIE_API_URL } from "../../../constants"
import tvAdapter from "adapters/tv.adapter"
import useFetches from "hooks/useFetches"

export default async function (req, res) {
    const id = req.query.id
    const API_KEY = process.env.API_KEY
    const urlSerie = MOVIE_API_URL + `tv/${id}?api_key=` + API_KEY
    const urlCast = MOVIE_API_URL + `tv/${id}/credits?api_key=` + API_KEY
    const urlFetches = [urlSerie, urlCast]

    try {
        const data = await Promise.all(useFetches(urlFetches))
        const [serieData, serieCast] = data;
        const adaptedSerie = tvAdapter(serieData, serieCast)
        res.status(200).json({ serie: adaptedSerie, success: true })
    } catch (error) {
        res.status(500).json({ success: false})
    }
}
