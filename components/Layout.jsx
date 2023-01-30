import Head from "next/head"

export default function Layout({ children, title }) {
    return (
        <div className="layout">
            <Head>
                <title>
                    {
                        Boolean(title)
                            ? title + " | Entertaiment App"
                            : "Entertaiment App"
                    }
                </title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>

            {children}
        </div>
    )
}