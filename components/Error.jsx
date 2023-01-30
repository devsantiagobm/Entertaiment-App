import Link from "next/link"

export default function Error() {
    return (
        <div className="error">
            <div className="error__box">

                <img src="/error.svg" alt="error icon" className="error__image" />
                <span>
                    Oops! Something went wrong
                </span>
                <Link className="main-button" href="/" style={{width: "100%"}}>Back to home</Link>
            </div>
        </div>
    )
}