import Error from "components/Error"
import Grid from "components/Grid"
import GridItem from "components/GridItem"
import Layout from "components/Layout"
import { MOVIES_GENRES } from "constants"
import GenresList from "components/GenresList"

export default function Movies({ movies, success, id }) {

    if (!success) return <Error></Error>


    const {name: genreName} =  MOVIES_GENRES.find(genres => genres.id === Number(id))

    return (
        <Layout title={genreName + " Movies"}>

            <div className="movies">
                <span className="movies__title">{genreName} movies</span>
                <GenresList list={MOVIES_GENRES} category="movies"/>
                <Grid>
                    {
                        movies.map(serie => {
                            return (
                                <GridItem key={serie.id} element={serie} category="movie"></GridItem>
                            )
                        })
                    }
                </Grid>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    try {
        const { id } = context.query
        const url = process.env.API_URL + "movies/genres/" + id      
        const {movies, success} = await (await fetch(url)).json()

        return {
            props: {
                movies,
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