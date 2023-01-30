import Image from "next/image"

export default function () {
    return (
        <div className="att">
            <div className="att__box">
                <span>
                    Powered by
                </span>
                <a href="https://www.themoviedb.org/" target={"_blank"} className="att__link">
                    <Image src="/tmdb-icon.svg" alt="TMDB icon" className="att__image" width={180} height={14}/>
                </a>
            </div>
        </div>
    )
}