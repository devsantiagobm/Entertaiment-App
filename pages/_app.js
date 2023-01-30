import 'styles/globals.css'
import Nav from 'components/layout/Nav'
import SearchBar from "components/layout/SearchBar"
import Head from 'next/head'
import Attribution from 'components/Attribution'
import { AuthContextProvider, AppContextProvider } from 'context/provider.context'
import Profile from 'components/Profile'

export default function App({ Component, pageProps }) {

   return (
      <>
         <AuthContextProvider>
            <AppContextProvider>

               <Head>
                  <title>Entertaiment App</title>
               </Head>

               <main className='content'>
                  <Nav />
                  <main className='main'>
                     <SearchBar />
                     <Component {...pageProps} />
                     <Attribution />
                  </main>
               </main>

               <Profile></Profile>
            </AppContextProvider>
         </AuthContextProvider>
      </>
   )
}