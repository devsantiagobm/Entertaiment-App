import Grid from "components/Grid"
import GridItem from "components/GridItem"
import Layout from "components/Layout"
import Error from "components/Error"

export default function Movies({ movies, series, success, search }) {

    if (!success) return <Error></Error>

    return (
        <Layout title={search + " Search"}>
            <div className="movies">
                {
                    movies.length > 0 && (<>
                        <div className="movies__title">movies</div>
                        <Grid>
                            {
                                movies.map(serie => {
                                    return (
                                        <GridItem key={serie.id} element={serie} category="movie"></GridItem>
                                    )
                                })
                            }
                        </Grid>
                    </>)
                }
                {
                    series.length > 0 && (<>
                        <span className="movies__title">series</span>
                        <Grid>
                            {
                                series.length > 0 && series.map(serie => {
                                    return (
                                        <GridItem key={serie.id} element={serie} category="tv"></GridItem>
                                    )
                                })
                            }
                        </Grid>
                    </>)
                }
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const { query: { search } } = context


    try {
        const url = process.env.API_URL + "search/" + search
        const { movies, series } = await (await fetch(url)).json()

        return {
            props: {
                movies,
                series,
                success: true,
                search
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