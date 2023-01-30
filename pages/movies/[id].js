import Layout from "components/Layout"
import Error from "components/Error"
import Title from "components/Title"

export default function tvId({ movie, success }) {
    if (!success) return <Error />
    const {
        cast,
        crew,
        language,
        title,
        year,
        revenue,
        length } = movie

    const people = [
        {
            list: cast,
            title: "cast",
            id: 1
        },
        {
            list: crew,
            title: "crew",
            id: 2
        }
    ]

    const metaData = [
        {
            label: "length",
            data: length
        },
        {
            label: "language",
            data: language
        },
        {
            label: "year",
            data: year
        },
        {
            label: "revenue",
            data: revenue
        },
    ]

    return (
        <Layout title={title}>
            <Title 
            information={movie}
            people={people}
            metaData={metaData}
            ></Title>
        </Layout>

    )
}


export async function getServerSideProps(context) {

    try {
        const { query: { id } } = context
        const url = process.env.API_URL + `movies/${id}`
        const data = await (await fetch(url)).json()
        const { success, movie } = data

        return {
            props: {
                movie: Boolean(movie) ? movie : {},
                success
            }
        }
    }

    catch (error) {
        return {
            props: {
                success: false,
            }
        }
    }
}