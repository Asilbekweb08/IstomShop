import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/images/logo.svg";
import fb from "../../assets/images/vk-icon.svg";
import tg from "../../assets/images/tg-icon.svg";
import wp from "../../assets/images/wp-icon.svg";
import cart from "../../assets/images/cart.svg";
import search from "../../assets/images/search.svg";
import burger from "../../assets/images/burger.svg";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./Header.scss";
import { URL } from "../../hooks/hook";

export const Header = ({ onSearch }) => {
  const Navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 275,
    bgcolor: "background.paper",
    border: "1px solid #ffb224 ",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [query, setQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartItemCount = () => {
      // Получение данных корзины из localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Установка количества товаров в корзине
      setCartItemCount(storedCart.length);
    };
  
    // Вызываем функцию обновления сразу после монтирования компонента
    updateCartItemCount();
  
    // Добавляем слушатель события на изменения в localStorage
    window.addEventListener("storage", updateCartItemCount);
  
    // Убираем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("storage", updateCartItemCount);
    };
   }); // Не указываем зависимости, чтобы эффект запускался при каждом обновлении компонента
  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${URL}/shop/product/?query=${query}`);
      console.log("API Response:", response.data.results);
      // Фильтрация результатов поиска по имени или другим полям, если необходимо
      const filteredResults = response.data.results.filter((product) => {
        // Здесь можно использовать различные условия для фильтрации, например, по имени
        return product.name.toLowerCase().includes(query.toLowerCase());
      });
      if (typeof onSearch === "function") {
        onSearch(filteredResults);
      }
      Navigate("/store");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <>
      <div className="container header-fix">
        <div className="header">
          <div className="header-logo">
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>
          <div className="header-title">
            <Link to="/store">
              <p>Магазин</p>
            </Link>
            <Link to="/delivery">
              <p>Оплата и доставка</p>
            </Link>
            <Link to="/about">
              <p>О нас</p>
            </Link>
            <Link to="/contacts">
              <p>Контакты</p>
            </Link>
          </div>

          <div className="header-search">
            <input
            className="header-input"
              type="text"
              placeholder="поиск товара"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <img
              onClick={handleSearch}
              className="search-img"
              src={search}
              alt=""
            />
          </div>

          <div className="header-net">
            <div className="header-net-icon">
              <a href="https://m.vk.com/istomshop "><img className="net-icon vk" src={fb} alt="" /></a>
            </div>
            <div className="header-net-icon">
              <img className="net-icon" src={tg} alt="" />
            </div>
            <div className="header-net-icon">
              <img className="net-icon" src={wp} alt="" />
            </div>
          </div>
          <div className="header-cart">
            <Link to="/cart">
              <img src={cart} alt="" />
              <span className="cart-item-count">{cartItemCount}</span>
            </Link>
          </div>

          <div className="header-burger">
            <img onClick={handleOpen} src={burger} alt="" />
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="burger-menu" style={{ textAlign: "center" }}>
                <NavLink to="/">
                  <img src={logo} alt="" style={{ marginBottom: "15px" }} />
                </NavLink>
                <div className="header-title">
                  <Link to="/store" onClick={handleClose}>
                    <p style={{ padding: "10px" }}>Магазин</p>
                  </Link>
                  <Link to="/delivery" onClick={handleClose}>
                    <p style={{ padding: "10px" }}>Оплата и доставка</p>
                  </Link>
                  <Link to="/about" onClick={handleClose}>
                    <p style={{ padding: "10px" }}>О нас</p>
                  </Link>
                  <Link to="/contacts" onClick={handleClose}>
                    <p style={{ padding: "10px" }}>Контакты</p>
                  </Link>
                </div>


                <div
                  className="header-net"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems:"center",
                    gap: "10px",
                    margin: "15px",
                  }}
                >
                  <div className="header-net-icon">
                    <img className="net-icon vk" src={fb} alt="" />
                  </div>
                  <div className="header-net-icon">
                    <img className="net-icon" src={tg} alt="" />
                  </div>
                  <div className="header-net-icon">
                    <img className="net-icon" src={wp} alt="" />
                  </div>
                </div>

                <Link to="/cart">
                  <button
                    onClick={handleClose}
                    className="istom-btn"
                    style={{ width: "190px", height: "50px" }}
                  >
                    Корзина
                  </button>
                </Link>
              </div>
            </Box>
          </Modal>
        </div>

        <div className="search-mobile">
          <div
            className="header-search"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="text"
              placeholder="поиск товара"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                border: "none",
                backgroundColor: "#FFA500DB",
                borderRadius: "10px 0px 0px 10px",
                width: "170px",
                height: "25px",
                padding: "0 0 0 15px",
                color: "#fff",
              }}
            />
            <img
              onClick={() => {
                handleSearch();
                handleClose();
              }}
              className="search-img"
              src={search}
              alt=""
              style={{
                backgroundColor: "#FFA500DB",
                borderRadius: "0 10px 10px 0",
                padding: "5px 10px 5px 5px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
