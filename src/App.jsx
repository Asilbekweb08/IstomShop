import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import Home from "./Page/Home";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Store from "./Page/Store";
import Delivery from "./Page/Delivery";
import Contacts from "./Page/Contacts";
import AboutPage from "./Page/AboutPage";
import CartPage from "./Page/CartPage";
import Signin from "./Page/Signin";
import Signup from "./Page/Signup";
import DetailsPage from "./Page/DetailsPage";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import { useState } from "react";
import StoreCategory from "./components/StoreCategory/StoreCategory";

function App() {
    // Состояние для хранения результатов поиска
    const [searchResults, setSearchResults] = useState([]);

    // Функция для передачи результатов поиска из Header в App
    const handleSearchResults = (results) => {
      setSearchResults(results);
    };

  return (
    <>
      <Header onSearch={handleSearchResults}  />
      <ConnectButton/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store searchResults={searchResults}  />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/store/category:id" element={<StoreCategory />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/store/:id" element={<DetailsPage/>} />
        {/* <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} /> */}

      </Routes>
      <Footer />
    </>
  );
}

export default App;
