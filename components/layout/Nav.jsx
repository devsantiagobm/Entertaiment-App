import { MdMovieCreation as MovieIcon } from "react-icons/md"
import { HiSquares2X2 as SquaresIcon } from "react-icons/hi2"
import { MdLocalMovies as CinemaIcon } from "react-icons/md"
import { BiTv as TvIcon } from "react-icons/bi"
import Link from "next/link"
import { useRouter } from "next/router"
import { BiLogInCircle as LogInIcon } from "react-icons/bi"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import useGetContext from "hooks/useGetContext"
import { auth as authConfig } from "firebase-admin/config"



export default function Nav() {
    const { route } = useRouter()
    const [userNav, setUserNav] = useState(false)
    const { auth, app } = useGetContext()
    const { user } = auth
    const { profileWindow, setProfileWindow } = app

    return (
        <div className="nav">
            <div className="nav__box">

                <div className="nav__icon-main">
                    <MovieIcon />
                </div>

                <nav className="nav__links">
                    {
                        links.map(({ Element, link, id }) => (
                            <Link
                                href={link}
                                key={id}
                                className={`nav__link ${route === link && "nav__link--active"}`}>
                                <Element />
                            </Link>
                        ))
                    }
                </nav>

                <button className="nav__log-in" onClick={() => setUserNav(!userNav)}>

                    {
                        Boolean(user)
                            ? <div className="nav__profile">
                                <img src={user.photoURL} className="nav__user-image" />
                            </div>
                            : <LogInIcon></LogInIcon>

                    }


                </button>

                <AnimatePresence>

                    {
                        userNav && (
                            <motion.div
                                className="nav__user-options"
                                variants={userNavVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: .2 }}>
                                <ul className="nav__user-list">

                                    {

                                        (
                                            Boolean(user) ? (
                                                <>
                                                    <motion.li>
                                                        <button className="nav__user-link" onClick={() => setProfileWindow(true)}>profile</button>
                                                    </motion.li>
                                                    <li>
                                                        <button className="nav__user-link" onClick={() => authConfig.signOut()}>log out</button>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>
                                                        <Link href={"/signIn"} className="nav__user-link">login</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={"/signUp"} className="nav__user-link">sign up</Link>
                                                    </li>
                                                </>
                                            ))
                                    }
                                </ul>
                            </motion.div>
                        )
                    }

                </AnimatePresence>


            </div>

        </div>
    )
}


const links = [
    {
        Element: SquaresIcon,
        link: "/",
        id: 1
    },
    {
        Element: CinemaIcon,
        link: "/movies",
        id: 2
    },
    {
        Element: TvIcon,
        link: "/tv",
        id: 3
    }
]

const userNavVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}
