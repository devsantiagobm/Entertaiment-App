import Layout from "components/Layout"
import Form from "components/Form"
import firebase from "firebase-admin/firebase"
import { useState } from "react"

export default function signUp() {
    const [signUpError, setSignUpError] = useState("")


    async function handleSignUp(data) {
        const { success, error } = await firebase.signUp(data)

        if (!success) {
            setSignUpError(error)
            return;
        }
    }

    return (
        < Layout title="Sign up">
            <Form
                title="Sign Up"
                inputs={inputs}
                submitText="Create an account"
                message="Already have an account?"
                linkText="Login"
                link="/signIn"
                inComplete={data => handleSignUp(data)}
                advice={signUpError}
                setAdvice={setSignUpError} />
        </Layout >
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
    {
        placeholder: "Repeat Password",
        id: "repeatPassword",
        type: "password"
    },
]