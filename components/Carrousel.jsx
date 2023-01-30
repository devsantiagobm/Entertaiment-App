import { Swiper, SwiperSlide } from "swiper/react"
import CarrouselItem from "components/CarrouselItem";
import "swiper/css";
import Link from "next/link";

export default function Carrousel({ list, title }) {
    
    return (
        <div className="carrousel">
            <span className="carrousel__title">{title}</span>
            <Swiper className="carrousel__list"
                slidesPerView={"auto"}
                spaceBetween={16}>
                {
                    list.map(item => (
                        <SwiperSlide className="carrousel__item" key={item.id}>
                            <CarrouselItem item={item}></CarrouselItem>
                        </SwiperSlide>
                    )
                    )
                }
                <SwiperSlide className="carrousel__item carrousel__item--hidden">This is a hidden slide.</SwiperSlide>
            </Swiper>
        </div>
    )
}


