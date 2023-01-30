import { onAuthStateChanged } from "firebase/auth"
import { auth } from "firebase-admin/config"
import { useState } from "react"

export default function useUser() {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, information => {
        if (information) {
            setUser(information)
            return
        }
        setUser(null)
    })

    return user
}