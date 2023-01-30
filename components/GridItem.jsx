import Image from "next/image"
import Link from "next/link"
export default function GridItem({ element, category }) {
    const { image, title, year, rating, id } = element

    return (
        <div className="grid__item">

            <picture className="grid__picture">
                <img
                    height={160}
                    width={280}
                    src={image}
                    className="grid__image"
                    alt={title + "Photo"} />
            </picture>


            <div className="grid__information">
                <div className="grid__data">
                    <span className="grid__details">
                        {year}
                    </span>
                    <span className="grid__details">
                        {rating}
                    </span>
                </div>
                <p className="grid__title">
                    {title}
                </p>
            </div>

            <Link href={category === "movie"
                ? `/movies/${id}`
                : `/tv/${id}`} className="grid__link">
            </Link>
        </div>

    )
}