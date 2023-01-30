import useGetContext from "hooks/useGetContext"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import addReview from "hooks/useAddReview"
import Image from "next/image"
import { db } from "firebase-admin/config"
import { doc, onSnapshot } from "firebase/firestore"

export default function Reviews({ category, id }) {
    const { auth } = useGetContext()
    const { user } = auth
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef(null)
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        const docRef = doc(db, category, String(id))
        onSnapshot(docRef, doc => {
            if (!doc.exists()) return
            const reviews = (doc.data()).reviews
            setReviews(reviews)
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        if (inputValue.trim() === "" || !Boolean(user)) return

        addReview({
            user,
            review: inputValue,
            category,
            id
        })

        inputRef.current.textContent = ""

    }


    function handleChange(e) {
        const text = e.currentTarget.textContent
        setInputValue(text)
    }

    return (
        <div className="reviews">

            <div className="reviews__list">
                <div className="revies__list">
                    Reviews
                </div>
                {
                    reviews.map(({ review, email, id, photoURL }) => (
                        <div className="reviews__item review" key={id}>

                            <div className="review__box">
                                <picture className="review__picture">
                                    <Image src={photoURL} alt={email + "photo"}
                                        height={32} width={32}></Image>
                                </picture>
                            </div>

                            <div className="review__information">
                                <span className="review__email">
                                    {email}
                                </span>
                                <p className="review__description">
                                    {review}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>


            <form className="reviews__form" onSubmit={handleSubmit}>
                <div className="reviews__form-title">Add Review</div>
                <span
                    contentEditable
                    className="reviews__input"
                    onInput={handleChange} ref={inputRef}></span>
                <div className="reviews__form-box">

                    {
                        user
                            ? <button className="reviews__submit">Post comment</button>
                            : <Link className="reviews__submit" href="/signIn">Login to Comment</Link>
                    }
                </div>
            </form>
        </div >
    )
}