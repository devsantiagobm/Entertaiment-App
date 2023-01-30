import Image from "next/image"
import GenresList from "components/GenresList"
import { BiLink as LinkIcon } from "react-icons/bi"
import CarrouselCast from "components/CarrouselCast"
import Reviews from "components/Reviews"
import { FaImdb as ImdbIcon} from "react-icons/fa"


export default function Title({ information, metaData, people }) {

    const {
        poster,
        genres,
        website,
        voteAverage,
        id,
        title,
        description,
        tagline,
        category,
        imdbWebsite
    } = information


    return (

        <>
            <div className="film">

                <div className="film__column">
                    <picture className="film__picture">
                        <Image src={poster} width={350} height={530} alt={title + " image"} className="film__poster" />
                    </picture>
                </div>

                <div className="film__information">

                    <div className="film__name"> {title} </div>
                    <div className="film__tagline"> {tagline} </div>

                    <div className="film__votes">
                        <span className="film__vote-average"> {voteAverage} </span>

                        <div className="film__stars">
                            <div className="film__stars-fill" style={{ width: Number(voteAverage) * 20 + "%" }}>
                                <span>★★★★★</span>
                            </div>

                            <div className="film__stars-empty">
                                <span>★★★★★</span>
                            </div>
                        </div>
                    </div>


                    <div className="film__meta-information">
                        {
                            metaData.map(({ data, label }) => (
                                <div className="film__meta-column" key={label}>
                                    <div className="film__meta-subtitle">{label}</div>
                                    <div className="film__meta-data">{data}</div>
                                </div>
                            ))
                        }
                    </div>

                    {
                        genres.length > 0 && (
                            <div className="film__genres">
                                <span className="film__subtitle">Genres</span>
                                <GenresList list={genres} category={category}></GenresList>
                            </div>
                        )
                    }


                    <div className="film__synopsis">
                        <span className="film__subtitle">synopsis</span>
                        <p>{description}</p>
                    </div>

                    {
                        people.map(({ list, title, id }) => (
                            list.length > 0 && (
                                <div className="film__carrousel" key={id}>
                                    <CarrouselCast list={list} title={title}></CarrouselCast>
                                </div>
                            )
                        ))
                    }


                    <div className="film__buttons">

                        {
                            website && (
                                <a href={website} target="_blank" className="film__links">
                                    <span>Website</span>
                                    <LinkIcon className="film__link-icon" />
                                </a>
                            )
                        }
                        {

                            imdbWebsite && (
                                <a href={imdbWebsite} target="_blank" className="film__links">
                                    <span>IMDB</span>
                                    <ImdbIcon className="film__link-icon" />
                                </a>
                            )

                        }

                    </div>

                </div>

            </div>

            <Reviews
                category={category}
                id={id}></Reviews>
        </>

    )
}
