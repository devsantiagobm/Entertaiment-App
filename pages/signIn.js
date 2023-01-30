import Layout from "components/Layout"
import Form from "components/Form"
import firebase from "firebase-admin/firebase"
import { useState } from "react"

export default function SignIn() {
    const [signInError, setSignInError] = useState("")


    async function handleSignIn(data) {
        const { error, success } = await firebase.login(data)

        if (!success) {
            setSignInError(error)
            return
        }

    }

    return (
        <Layout title={"Login"}>
            <Form
                title="Login"
                inputs={inputs}
                submitText="Log in to your account"
                message="Don't have an account?"
                linkText="Sign up"
                link="/signUp"
                inComplete={data => handleSignIn(data)}
                advice={signInError}
                setAdvice={setSignInError} />
        </Layout>
    )
}


const inputs = [
    {
        placeholder: "Email address",
        id: "email",
        type: "text"
    },
    {
        placeholder: "Password",
        id: "password",
        type: "password"
    },
]