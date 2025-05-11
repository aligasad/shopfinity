import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2025/GW/BAU/Unrec/PC/934044814._CB551384116_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img19/SiddMiniTV/10may/PPPHigh._CB795869145_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/yesbank/makeup_PC._CB796616147_.png",
  "https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Home/2025/BAU/May/Hero/Mothers_Day-BAU-GW-PC_-_Custom_gifts__more._CB795803255_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img25/Media/PC_Hero_3000x1200_Asin-toys-2x._CB547414496_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Unrec/Shoes/1/30003._CB542120021_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Media/BAU/PC_Hero_2x-toys_1._CB582765723_.jpg"
];

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-3xl bg-black/50 p-2 rounded-full"
  >
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-3xl bg-black/50 p-2 rounded-full"
  >
    <FaChevronLeft />
  </div>
);

function HeroSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index}`} className="w-full h-60 object-cover object-top" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSection;
