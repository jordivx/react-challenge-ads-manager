import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';
import React from "react";
import Slider from "react-slick";

export default function Carousel({images}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
        {
            images.map((img, index) => <div className="img-ctn" key={'image'+index}><img className="ad-img" src={img} alt={'image'+index}/></div>)
        }
    </Slider>
  );
}