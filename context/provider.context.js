import { createContext, useState } from "react"
import useUser from "hooks/useUser"



export const AuthContext = createContext(null)
export const AppContext = createContext(null)

export function AppContextProvider({ children }) {
    const [profileWindow, setProfileWindow] = useState(false)

    return (
        <AppContext.Provider value={{ profileWindow, setProfileWindow}}>
            {children}
        </AppContext.Provider>
    )

}


export function AuthContextProvider({children}){
    const user = useUser()

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}