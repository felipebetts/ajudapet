import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import { CarouselItem, Dots } from "./styles";

const responsive = {
    0: { items: 1 },
    // 568: { items: 2 },
    // 1024: { items: 3 },
};

const items = [
    <CarouselItem data-value="1">1</CarouselItem>,
    <CarouselItem data-value="2">2</CarouselItem>,
    <CarouselItem data-value="3">3</CarouselItem>,
    <CarouselItem data-value="4">4</CarouselItem>,
    <CarouselItem data-value="5">5</CarouselItem>,
];

const DotsItem = ({ isActive }) => {
    return (
    	<Dots isActive={isActive === "__active"} />
    )
}
    

const Carousel = () => {
    return (
        <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            disableButtonsControls
            autoPlay
            autoPlayInterval={4000}
            infinite
            renderDotsItem={params => DotsItem(params)}
        />
    )
}

export default Carousel