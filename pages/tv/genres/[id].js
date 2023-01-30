import Error from "components/Error"
import Grid from "components/Grid"
import GridItem from "components/GridItem"
import Layout from "components/Layout"
import GenresList from "components/GenresList"
import { TV_GENRES } from "constants"

export default function Movies({ tv, success, id }) {
    if (!success) return <Error></Error>

    const { name: genreName } = TV_GENRES.find(genre => genre.id === Number(id))

    return (
        <Layout title={genreName + " Series"}>
            <div className="movies">
                <span className="movies__title">{genreName} series</span>
                <GenresList list={TV_GENRES} category="tv" />

                <div className="animation">

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
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    try {
        const { id } = context.query
        const url = process.env.API_URL + "tv/genres/" + id
        const { tv, success } = await (await fetch(url)).json()

        return {
            props: {
                tv,
                success,
                id
            }
        }
    } catch (error) {
        return {
            props: {
                success: false
            }
        }
    }

}