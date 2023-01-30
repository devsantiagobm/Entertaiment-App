import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import Image from "next/image"


export default function CarrouselCast({ list, title }) {
    return (
        <>
            <span className="cast__title">{title}</span>
            <Swiper
                className="cast"
                slidesPerView={"auto"}
                spaceBetween={16}>
                {
                    list.map(people => {
                        const { id, image, name, job, character } = people
                        return (
                            <SwiperSlide key={id} className="cast__item">
                                <picture className="cast__picture">
                                    <Image src={image} alt={`${name} image`} className="cast__image" width={100} height={100} />

                                </picture>
                                <span className="cast__name">{name}</span>
                                {job && <span className="cast__job">{people?.job}</span>}
                                {character && <span className="cast__job">{people?.character}</span>}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>

    )
}