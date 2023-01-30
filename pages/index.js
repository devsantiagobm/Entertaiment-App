import Carrousel from "components/Carrousel"
import propsAdapter from "adapters/props.adapter";
import useFetches from "hooks/useFetches";
import Layout from "components/Layout";
import Error from "components/Error";

export default function Home({ trending, popularMovies, popularTv, favoriteMovies, favoriteTv, success }) {
   if (!success) return <Error />
   
   return (
      <Layout title="Home">
         <div className="home">
            <Carrousel list={trending} title="Trending" />
            <Carrousel list={popularMovies} title="Popular Movies" />
            <Carrousel list={popularTv} title="Popular Tv Series" />
            <Carrousel list={favoriteMovies} title="top rated movies" />
            <Carrousel list={favoriteTv} title="top rated series" />
         </div>
      </Layout>
   )
}

export async function getStaticProps(a) {
   try {
      const urls = ["trending", "movies/popular", "tv/popular", "movies/favorite", "tv/favorite"]
      const response = await Promise.all(useFetches(urls, true))
      const data = propsAdapter(response)

      const SECONDS_IN_DAY = 86400
      return {
         props: {
            ...data,
            success: true
         }, revalidate: SECONDS_IN_DAY
      }
   } catch (error) {
      return {
         props:{ success: false }
      }
   }
}