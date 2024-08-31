import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard/DetailCard";
import DetailDesk from "../components/DetailDesk/DetailDesk";
import { URL } from "../hooks/hook";
import { Analog } from "../components/Analog/Analog";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailsPage() {
  const { id } = useParams();
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}/shop/product/${id}`)
      .then((res) => {
        setProductsData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);


  const handleClickToCard = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );
  
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
      toast.success("Товар добавлен в корзину", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success',
      });
    } else {
      existingCart.push({ ...product, quantity: 1 });
      toast.success("Товар добавлен в корзину", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success',
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log("Товар добавлен в корзину:", product);
  };

  return (
    <>
      <Helmet>
        <title>
          IstomShop - {productsData ? productsData.name : "Загрузка..."} купить
          с доставкой по РФ!
        </title>
        <meta
          name="description"
          content={`IstomShop - ${
            productsData ? productsData.name : "Загрузка..."
          } вы можете приобрести у нас с быстрой доставкой по РФ!`}
        />
      </Helmet>

      <div className="container">
        <div className="details">
          <div>
            {productsData && (
              <>
                <DetailCard
                  image={productsData.image}
                  name={productsData.name}
                  price={productsData.price}
                  firm={productsData.firm}
                  manufactured_city={productsData.manufactured_city}
                  created_at={productsData.created_at}
                  main_category_name={
                    productsData.category[0].main_category_name
                  }
                  images_set={productsData.images_set[0].image}
                  quant={
                    productsData.quantity ||
                    (existingCartItem && existingCartItem.quantity) ||
                    1
                  }
                  addToCart={() => handleClickToCard(productsData)}
                  key={productsData.id}
                  data-aos="fade-up"
                />
              </>
            )}
          </div>
          <div>{productsData && <DetailDesk details={productsData} />}</div>

          <div style={{ marginBottom: "70px" }}>
            <Analog />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DetailsPage;
