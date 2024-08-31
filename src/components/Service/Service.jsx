import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Service.scss";
import axios from "axios";
import { URL } from "../../hooks/hook";
// import Slider from "react-styled-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// import Slider from "react-styled-carousel";

const Service = () => {
  const navigate = useNavigate()
  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}/shop/service`)
      .then((res) => setServiceData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleClickToCatalog = (subcategoryId) => {
    axios
      .get(`${URL}/shop/category_product/${subcategoryId}`)
      .then((response) => {
        console.log("API response for subcategory ID:", subcategoryId);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
    // const selectedItem = productsData.find((item) => item.id === id);
    // if (selectedItem) {
    //   console.log("Selected Item:", selectedItem);
    //   // Переход на страницу деталей продукта с использованием navigate
    //   // navigate(`store/${selectedItem.id}`);
    //   navigate(`/store`);
    // } else {
    //   console.log("Item not found");

    // }
    // console.log('amir');
    navigate(`/store`);

  };


  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Показывать стрелки
  };  

  return (
    <div className="container" data-aos="fade-up">
      <div className="service" data-aos="fade-up">
        <div className="service-title">
          <p>Наши </p>
          <br />
          <p className="istom-text">Услуги!</p>
        </div>

        <div className="service-cards" data-aos="fade-up">
          <div className="service-column" data-aos="fade-up">
            {serviceData.map((item, key) => (
              <div
                className="ser-card"
                data-aos="fade-up"
                key={key}
                onClick={() => handleClickToCatalog(item.id)}
              >
                <img
                  className="ser-card-img"
                  src={item.image}
                  alt={`Service ${key + 1}`}
                />
                <p className="ser-card-subtitle">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="service-mobile">
          <div className="service-column" data-aos="fade-up">
            <Slider {...settings}>
              {serviceData.map((item, key) => (
                <div className="ser-card" data-aos="fade-up" key={key}>
                  <img
                    className="ser-card-img"
                    src={item.image}
                    alt={`Service ${key + 1}`}
                  />
                  <p className="ser-card-subtitle">{item.title}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
