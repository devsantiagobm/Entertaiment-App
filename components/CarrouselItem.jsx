import { MdLocalMovies as CinemaIcon } from "react-icons/md"
import { BiTv as TvIcon } from "react-icons/bi"
import Link from "next/link";
import Image from "next/image";

export default function CarrouselItem({ item }) {
    const { image, title, category, rating, year, id } = item

    return (
        <>

            <Image
                src={image}
                className="carrousel__item-bg"
                draggable="false"
                alt={title + "image"}
                width={350}
                height={180}
                style={{ height: "auto", width: "auto" }}
            />
            <div className="carrousel__item-content">
                <Link className="carrousel__item-link"
                    href={category === "movie"
                        ? `/movies/${id}`
                        : `/tv/${id}`
                    } />
                <div className="carrousel__space">
                </div>
                <div className="carrousel__item-information">
                    <div className="carrousel__item-data">
                        <span
                            className="carrousel__item-details">
                            {
                                category === "movie"
                                    ? <CinemaIcon className="carrousel__item-icon" />
                                    : <TvIcon className="carrousel__item-icon" />
                            }
                            {category}
                        </span>
                        <span className="carrousel__item-details">
                           
                            {rating}
                        </span>
                        <span className="carrousel__item-details">
                            {year}
                        </span>
                    </div>

                    <span className="carrousel__item-title">
                        {title}
                    </span>
                </div>

            </div>

        </>
    )
}