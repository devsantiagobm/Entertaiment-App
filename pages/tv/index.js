import { TV_GENRES } from "../../constants"
import GenresList from "components/GenresList"
import Grid from "components/Grid"
import GridItem from "components/GridItem"
import Layout from "components/Layout"
import Error from "components/Error"

export default function Series({ tv, success }) {

    if (!success) return <Error></Error>

    return (
        <Layout title={"Series"}>

            <div className="movies">
                <span className="movies__title">Series</span>
                <GenresList list={TV_GENRES} category="tv"/>
                <Grid>
                    {
                        tv.map(serie => {
                            return (
                                <GridItem key={serie.id} element={serie} category="tv"></GridItem>
                            )
                        })
                    }
                </Grid>
            </div>
        </Layout>
    )
}


export async function getStaticProps() {
    try {
        const API_URL = process.env.API_URL
        const url = API_URL + "tv/discover"
        const data = await (await fetch(url)).json()
        const tv = data.discoveredTv

        return {
            props: {
                tv,
                success: true
            },
            revalidate: 86400
        }

    } catch (error) {
        return {
            props: {
                success: false
            }
        }
    }
}