import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Connect.scss";
import axios from "axios";
import { URL } from "../../hooks/hook";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { toast } from "react-toastify";

const Connect = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    toast.success("Получить консультацию")
    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(`${URL}/shop/consultation`, formData);

      // Handle the response if needed
      console.log(response);

      // Clear the form data after successful submission
      setFormData({
        name: "",
        phone: "",
        description: "",
      });
    } catch (error) {
      // Handle errors if any
      console.error(error);
    }
  };

  return (
    <div className="container" data-aos="fade-up">
      {/* <div className="connect-title" data-aos="fade-up">
        <p>ПОЛУЧИТЬ </p>
        <p className="istom-text">КОНСУЛЬТАЦИЮ</p>
      </div> */}
      <div className="connect" data-aos="fade-up">
        <div className="connect-left" data-aos="fade-right">
          <div className="con-left-title">
            <p>ПОЛУЧИТЬ </p>
            <p className="istom-text">КОНСУЛЬТАЦИЮ</p>
          </div>
          <p className="con-left-subtitle">
            Оставьте заявку  и, в ближайшее время мы с Вами свяжемся
          </p>
          <div className="name-input" data-aos="fade-up">
            <p>Ваше имя</p>
            <input
              className="connect-name"
              type="text"
              placeholder="Иван Иванов"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="number-input" data-aos="fade-up">
            <p>Ваш номер</p>
            <input
              className="connect-number"
              type="text"
              placeholder="+7(999) 999-9999"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="quest-input" data-aos="fade-up">
            <p>Ваш вопрос</p>
            <input
              className="connect-quest"
              type="text"
              placeholder=""
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="connect-button istom-btn"
            data-aos="fade-up"
            onClick={handleSubmit}
          >
            Получить консультацию
          </button>
          <p className="connect-done" data-aos="fade-up">
            Нажимая кнопку, вы даете согласие на обработку персональных данных
          </p>
        </div>
        <div className="connect-right">
          {/* <div className="connect-video"> */}
          <YMaps>
            <Map
              width={636}
              height={427}
              defaultState={{
                center: [55.751574, 37.573856],
                zoom: 5,
              }}
            >
              <Placemark geometry={[55.684758, 37.738521]} />
            </Map>
          </YMaps>
          {/* </div> */}
        </div>
        <div className="connect-right-mobile">
          {/* <div className="connect-video"> */}
          <YMaps>
            <Map
              width={342}
              height={427}
              defaultState={{
                center: [55.751574, 37.573856],
                zoom: 5,
              }}
            >
              <Placemark geometry={[55.684758, 37.738521]} />
            </Map>
          </YMaps>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Connect;
