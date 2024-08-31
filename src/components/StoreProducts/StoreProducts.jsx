import Slider from "react-styled-carousel";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Pagination, PaginationItem } from "@mui/material";
import "@mui/material";

import axios from "axios";

import "./StoreProducts.scss";
import { StoreProductCard } from "../StoreProductCard/StoreProductCard";
import { useNavigate } from "react-router-dom";
import { URL } from "../../hooks/hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreProducts = ({
  selectedSubcategory,
  searchResults,
  selectedCategory,
  categoryName
}) => {
  console.log(selectedCategory);
  
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 12; // Добавлено определение количества карточек на странице
  const navigate = useNavigate();

  useEffect(() => {
    console.log("searchResults:", searchResults);
  }, [searchResults]);


  useEffect(() => {
    if (selectedSubcategory) {
      axios
        .get(`${URL}/shop/category_product/${selectedSubcategory}`)
        .then((response) => {
          setProductsData(response.data.results);
          setTotalPages(Math.ceil(response.data.count / cardsPerPage));
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    }
  }, [selectedSubcategory]);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${URL}/shop/main/categories/products/${selectedCategory}`)
        .then((response) => {
          setProductsData(response.data.results);
          setTotalPages(Math.ceil(response.data.count / cardsPerPage));
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get(`${URL}/shop/product/?page=${currentPage}`)
      .then((res) => {
        setProductsData(res.data.results);
        setTotalPages(Math.ceil(res.data.count / cardsPerPage));
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = (id) => {
    const selectedItem = productsData.find((item) => item.id === id);
    if (selectedItem) {
      console.log("Selected Item:", selectedItem);
      // Переход на страницу деталей продукта с использованием navigate
      navigate(`${selectedItem.id}`);
    } else {
      console.log("Item not found");
    }
  };

  const handleClickToCard = (product) => {
    // Получение существующих данных корзины из localStorage или инициализация пустого массива
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Проверка, есть ли товар с таким id уже в корзине
    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Если товар уже есть в корзине, увеличиваем количество
      existingCart[existingProductIndex].quantity += 1;
      toast.info("Товар добавлен в корзину", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Если товара с таким id еще нет в корзине, добавляем его
      existingCart.push({ ...product, quantity: 1 });
      toast.success("Товар добавлен в корзину", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // Сохранение обновленных данных корзины в localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    console.log("Товар добавлен в корзину:", product);
  };

  const handlePopularClick = () => {
    // Выполнить запрос к API
    axios
      .get(`${URL}/shop/product/?is_popular=true`)

      .then((response) => {
        // Обновить состояние продуктов на странице
        setProductsData(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular products:", error);
      });
  };

  const handleRatingClick = () => {
    // Выполнить запрос к API
    axios
      .get(`${URL}/shop/product/?is_rating=true`)

      .then((response) => {
        // Обновить состояние продуктов на странице
        setProductsData(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular products:", error);
      });
  };
  const handleMaxClick = () => {
    // Выполнить запрос к API
    axios
      .get(`${URL}/shop/product/?is_max_min=1`)

      .then((response) => {
        // Обновить состояние продуктов на странице
        setProductsData(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular products:", error);
      });
  };
  const handleMinClick = () => {
    // Выполнить запрос к API
    axios
      .get(`${URL}/shop/product/?is_max_min=0`)

      .then((response) => {
        // Обновить состояние продуктов на странице
        setProductsData(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular products:", error);
      });
  };

  return (
    <div className="container" data-aos="fade-up">
      <div className="store-product" data-aos="fade-up">
        {searchResults.length > 0 && (
          <div className="search-content">
            <h2>Результаты поиска</h2>
            <div className="search-results">
              {searchResults.map((product) => (
                <StoreProductCard
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
          </div>
        )}

        <div className="store-product-title">
          <p>
            {" "}
             <span className="istom-text">{categoryName}</span> 
          </p>

          <div className="sort-ac">
            <Accordion className="sort-ac-accordion">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <p className="sort-ac-accordion_title">Сортировка по:</p>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li
                    className="sort-ac-accordion_li"
                    onClick={handlePopularClick}
                  >
                    По популярности
                  </li>
                  <li
                    className="sort-ac-accordion_li"
                    onClick={handleRatingClick}
                  >
                    По рейтингу
                  </li>
                    
                  <li className="sort-ac-accordion_li" onClick={handleMaxClick}>По новинке</li>
                  <li className="sort-ac-accordion_li" onClick={handleMinClick}>Цены: по возрастанию</li>
                  <li className="sort-ac-accordion_li" onClick={handleMaxClick}>Цены: по убыванию</li>
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className="store-product-container" data-aos="fade-up">
          {productsData.map((product) => (
            <StoreProductCard
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
        <Pagination
          style={{ paddingBottom: "50px", paddingTop: "50px" }}
          count={totalPages}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              onClick={() => setCurrentPage(item.page)}
            />
          )}
        />

        <div className="store-product-container-mobile" data-aos="fade-up">
          <Slider autoSlide={5000} showDots={true} cardsToShow={1}>
            {productsData.map((product) => (
              <StoreProductCard
                productimg={product.image}
                title={product.name}
                quant={product.price}
                subtitle={product.description}
                key={product.id}
                data-aos="fade-up"
              />
            ))}
          </Slider>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StoreProducts;
