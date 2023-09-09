import { Carousel } from "react-responsive-carousel";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Modal, } from "@mui/material";


const Slider = ({ banner_picture, box_picture, real_picture }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const slides = [banner_picture];


  console.log(slides);
  if (box_picture) {
    console.log(box_picture);
    slides.push(box_picture);
  }
  if (real_picture) {
    slides.push(real_picture)
  }



  function handleImgClick(img) {
    console.log(img);
    setModalOpen(true);
    setSelectedImage(img);
  }

  return (
    <div className="relative">
      <Carousel className="[&>.carousel-slider>.slider-wrapper]:cursor-pointer" autoPlay={true} infiniteLoop={true} showStatus={false}>
        {slides.map((img, index) => (
          <div key={`img-${index}`} onClick={() => handleImgClick(img)} >
            <img
              src={img}
              alt={img}
              className="max-w-[600px] max-h-[400px] object-contain"
            />
          </div>
        ))}
      </Carousel>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <img
          src={selectedImage}
          alt={selectedImage}
          className="w-2/3 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
        />
      </Modal>
    </div>
  );
};

export default Slider;
