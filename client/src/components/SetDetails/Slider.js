import { Carousel } from "react-responsive-carousel";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = ({ banner_picture, box_picture, real_picture }) => {
  let slides = [banner_picture, box_picture, real_picture];

  return (
    <Carousel autoPlay={true} infiniteLoop={true} showStatus={false}>
      {slides.map((img, index) => (
        <img
          key={`img-${index}`}
          src={img}
          alt={img}
          className="max-w-[600px] max-h-[400px] object-contain"
        />
      ))}
    </Carousel>
  );
};

export default Slider;
