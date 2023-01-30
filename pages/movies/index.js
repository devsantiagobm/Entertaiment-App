import { MOVIES_GENRES } from "../../constants"
import GenresList from "components/GenresList"
import Grid from "components/Grid"
import GridItem from "components/GridItem"
import Layout from "components/Layout"
import Error from "components/Error";

export default function Movies({ movies, success }) {
    if (!success) return <Error />



    return (
        <Layout title={"Movies"}>
            <div className="movies">
                <span className="movies__title">Movies</span>
                <GenresList list={MOVIES_GENRES} category="movies" />
                <Grid>
                    {
                        movies?.map(movie => {
                            return (
                                <GridItem key={movie.id} element={movie} category="movie"></GridItem>
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
        const url = API_URL + "movies/discover"
        const data = await (await fetch(url)).json()
        const movies = data.discoveredMovies

        return {
            props: {
                movies,
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