import useGetContext from "hooks/useGetContext"
import { motion, AnimatePresence } from "framer-motion"
import { FiEdit2 as EditIcon } from "react-icons/fi"
import firebase from "firebase-admin/firebase"
import { useState } from "react"
import Loader from "./Loader"
import Image from "next/image"

export default function Profile() {
    const [loading, setLoading] = useState(false)

    const { auth, app } = useGetContext()
    const { user } = auth
    const { profileWindow, setProfileWindow } = app

    if (!Boolean(user)) return;

    async function handleChange(e) {
        setLoading(true)
        const file = e.currentTarget.files[0]
        await firebase.changeUserAvatar(file)
        setProfileWindow(false)
        setLoading(false)
    }


    return (
        <div className="profile">

            <AnimatePresence>

                {
                    profileWindow && (
                        <motion.div
                            className="profile__main"
                            variants={profileVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ type: "just" }}>
                            <div className="profile__box">

                                {
                                    loading
                                        ? <Loader></Loader>
                                        : (
                                            <>
                                                <input type="file" hidden id="file" accept="image/*" onChange={handleChange} />
                                                <label className="profile__picture" htmlFor="file">
                                                    <Image src={user.photoURL} alt={user + " avatar"} className="profile__image" width={200} height={200} />
                                                    <div className="profile__edit-icon">
                                                        <EditIcon></EditIcon>
                                                    </div>
                                                </label></>
                                        )
                                }

                                <span className="profile__email">
                                    {user.email}
                                </span>
                            </div>

                            <div className="profile__bg" onClick={() => setProfileWindow(false)}></div>
                        </motion.div>
                    )
                }


            </AnimatePresence>
        </div>
    )
}

const profileVariants = {
    initial: {
        opacity: 0,
        y: 10
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: 10
    }
}