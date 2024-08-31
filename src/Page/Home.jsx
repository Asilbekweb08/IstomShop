import React, { useEffect, useState } from "react";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import About from "../components/About/About";
import Service from "../components/Service/Service";
import Products from "../components/Products/Products";
import { BannerCarousel } from "../components/BannerCarousel/BannerCarousel";
import { Promotion } from "../components/Promotion/Promotion";
import { PartnersCarousel } from "../components/PartnersCarousel/PartnersCarousel";
import Connect from "../components/Connect/Connect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import ReactLoading from "react-loading";
import { useInView } from "react-intersection-observer";

function LazyBlock({ children }) {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3,     
  });

  return (
    <div ref={ref} style={{ minHeight: "100px", transition: "opacity 1s ease-in-out", opacity: inView ? 1 : 0 }}>
      {inView ? children : null}
    </div>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Профессиональные инструменты и оборудование для стоматологов |
          IstomShop
        </title>
        <meta
          name="description"
          content="IstomShop - У нас вы найдёте большой выбор качетсвенных инструментов и оборудование для стоматологов! Находимся в Москве и Санкт-Петербурге
          "
        />
      </Helmet>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ReactLoading
            type={"balls"}
            color={"#FFB224"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="container">
          <LazyBlock><HomeBanner /></LazyBlock>
          <LazyBlock><About /></LazyBlock>
          <LazyBlock><Service /></LazyBlock>
          <LazyBlock><Products /></LazyBlock>
          <LazyBlock><BannerCarousel /></LazyBlock>
          <LazyBlock><Promotion /></LazyBlock>
          <LazyBlock><PartnersCarousel /></LazyBlock>
          <LazyBlock><Connect /></LazyBlock>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default Home;
