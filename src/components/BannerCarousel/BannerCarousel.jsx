import React, { useEffect } from "react";
import AOS from "aos";

// import { Swiper, SwiperSlide } from 'swiper/react';
import woman from "../../assets/images/woman.png";

// import Slider from "react-styled-carousel";

import "./BannerCarousel.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export const BannerCarousel = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="container">
        <div className="bannercarousel" data-aos="fade-up">
          {/* <Slider autoSlide={false} showDots={false} cardsToShow={1}> */}
          <div className="carousel-card">
            <div className="carousel-card-left">
              <p className="carousel-title">
                Отбеливание <span className="istom-text"> зубов</span>
              </p>
              <p className="carousel-subtitle">
                Достигните белоснежной улыбки с нашей линейкой инструментов от
                ведущих производителей
              </p>

              <Link to="/about">
                <button className="carousel-btn istom-btn">Подробнее</button>
              </Link>
            </div>
            <div className="carousel-card-right">
              <img src={woman} alt="" />
            </div>
          </div>

          {/* </Slider> */}
        </div>
      </div>
    </>
  );
};
