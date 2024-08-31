import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import { ProductCard } from "../ProductCard/ProductCard";
import { useGetThreeProducts } from "../../hooks/hook";

import "./Promotion.scss";

export const Promotion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleCardClick = (id) => {
    const selectedItem = productsData.find((item) => item.id === id);
    if (selectedItem) {
      window.scrollTo({ top: -1000, behavior: "smooth" });
      console.log("Selected Item:", selectedItem);
      navigate(`store/${selectedItem.id}`);
    } else {
      console.log("Item not found");
    }
  };

  const handleClickToCard = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
      toast.success('Товар добавлен в корзину', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success', // Custom class for green background
        bodyClassName: 'toast-body', // Custom class for body styling
      });
    } else {
      existingCart.push({ ...product, quantity: 1 });
      toast.success('Товар добавлен в корзину', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success',
        bodyClassName: 'toast-body', 
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log("Товар добавлен в корзину:", product);
  };

  const [productsData, setProductsData] = useState([]);
  useGetThreeProducts(setProductsData);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <div className="container" data-aos="fade-up">
        <div className="promotion" data-aos="fade-up">
          <div className="promotion-title" data-aos="fade-up">
            <p>Наши</p>
            <p className="istom-text">Акции!</p>
          </div>

          <div className="promotion-container" data-aos="fade-up">
            {productsData.map((product) => (
              <ProductCard
                productimg={product.image}
                name={product.name}
                quant={product.quantity}
                price={product.price}
                subtitle={product.description}
                key={product.id}
                onCardClick={() => handleCardClick(product.id)}
                addToCart={() => handleClickToCard(product)}
                data-aos="fade-up"
              />
            ))}
          </div>

          <div className="promotion-container-mobile" data-aos="fade-up">
            <Slider {...settings}>
              {productsData.map((product) => (
                <ProductCard
                  productimg={product.image}
                  name={product.name}
                  quant={product.quantity}
                  price={product.price}
                  subtitle={product.description}
                  key={product.id}
                  onCardClick={() => handleCardClick(product.id)}
                  addToCart={() => handleClickToCard(product)}
                  data-aos="fade-up"
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
