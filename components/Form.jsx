import Link from "next/link"
import useForm from "hooks/useForm"
import { useState } from "react"
import { motion } from "framer-motion"
import Loader from "./Loader"
import useGetContext from "hooks/useGetContext"
import { useRouter } from "next/router"

export default function Form({ title, inputs, message, linkText, submitText, link, inComplete, advice, setAdvice }) {
    const [formSent, setFormSent] = useState(false)
    const router = useRouter()
    const { auth } = useGetContext()
    const {user} = auth

    if(Boolean(user)) {
        router.push("/movies")
        return
    }


    async function handleSubmit(e) {
        e.preventDefault()
        
        setAdvice("")
        const { formComplete, data } = useForm(e.currentTarget)
        if (!formComplete) return   
        setFormSent(true);

        formComplete && await inComplete(data)
        setFormSent(false)
    }

    return (
        <div className="form">
            <form className="form__box" autoComplete="off" onSubmit={handleSubmit}>
                <div className="form__title">{title}</div>

                {
                    formSent
                        ? <Loader></Loader>
                        : (
                            <motion.div
                                variants={fadeInVariants}
                                initial="initial"
                                animate="animate"
                                className="form__inputs">
                                {
                                    inputs.map(input => {
                                        const { id, placeholder, type } = input
                                        return (
                                            <label htmlFor={id} className="form__label" key={id}>
                                                <input
                                                    type={type}
                                                    className="form__input"
                                                    placeholder={placeholder}
                                                    id={id}
                                                    name={id} />
                                                <div className="form__underline"></div>
                                            </label>
                                        )
                                    })}
                            </motion.div>
                        )
                }

                <button className="form__submit">{submitText}</button>

                <span className="form__message">
                    {message}
                    <Link href={link} className="form__link">{linkText}</Link>
                </span>

                {
                    advice !== "" && (
                        <motion.span 
                        variants={fadeInVariants}
                        initial="initial"
                                animate="animate"
                        className="form__advice">{advice}</motion.span>
                    )}
            </form>
        </div>
    )
}

const fadeInVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
}
