import Layout from "components/Layout"
import Error from "components/Error"
import Title from "components/Title"

export default function tvId({ serie, success }) {

    if (!success) return <Error></Error>

    const { cast, crew, creators, status, firstAir, lastAir, language, title } = serie

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
        },
        {
            list: creators,
            title: "creators",
            id: 3
        },
    ]

    const metaData = [
        {
            label: "language",
            data: language
        },
        {
            label: "First air",
            data: firstAir
        },
        {
            label: "Last air",
            data: lastAir
        },
        {
            label: "status",
            data: status
        },
    ]

    return (
        <Layout title={title}>
            <Title
                information={serie}
                metaData={metaData}
                people={people} />

        </Layout>

    )
}


export async function getServerSideProps(context) {
    const { query: { id } } = context

    try {
        const url = process.env.API_URL + `tv/${id}`
        const data = await (await fetch(url)).json()
        const { serie } = data

        return {
            props: {
                serie,
                success: true
            }
        }
    }
    catch (error) {
        return {
            props: {
                success: false
            }
        }
    }
}