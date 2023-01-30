
import { useContext } from "react"
import { AuthContext, AppContext } from "context/provider.context"

export default function useGetContext() {

    const auth = useContext(AuthContext)
    const app = useContext(AppContext)

    return {
        auth,
        app
    }
}