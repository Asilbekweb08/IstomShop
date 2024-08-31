import logo from "../../assets/images/logo.svg";

import vk from "../../assets/images/vk-icon.svg";
import tg from "../../assets/images/tg-icon.svg";
import wp from "../../assets/images/wp-icon.svg";



import "./Footer.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
  const ScrollTop=()=>{
    window.scrollTo({ top: -1000, behavior: "smooth" })
  }
  return (
    <>
      <div className="container">
        <div className="footer">
          <Link to="/">
          <div className="footer-logo" >
            <img src={logo} alt="" />
          </div>
          </Link>
          <div className="footer-nav">
            <h1>Навигация</h1>
            <Link to="/store" ><p>Магазин</p></Link>
            <Link to="/delivery" ><p>Оплата и доставка</p></Link>
            <Link to="/about" ><p>О нас</p></Link>
            <Link to="/contacts" ><p>Контакты</p></Link>
            
            
            
            
          </div>
          <div className="footer-service">
            <h1>Услуги</h1>
           <Link to='/' onClick={ScrollTop}> <p>Стоматологические материалы</p></Link>
           <Link to='/' onClick={ScrollTop}> <p>Зуботехнические материалы</p></Link>
           <Link to='/' onClick={ScrollTop}> <p>Дезенфекция и стерелизация</p></Link>
           <Link to='/' onClick={ScrollTop}> <p>Сотрудничество</p></Link> 
          </div>
          <div className="footer-net">
            <p>Мы в социальных сетях</p>
            <div className="net-icons">
              <div className="footer-net-icon">
              <a href="https://m.vk.com/istomshop ">                <img className="net-icon vk" src={vk} alt="" /> </a>
              </div>
              <div className="footer-net-icon">
                <img className="net-icon" src={tg} alt="" />
              </div>
              <div className="footer-net-icon">
                <img className="net-icon" src={wp} alt="" />
              </div>
            </div>
          <Link to='/contacts'>
          <button className="footer-net-btn istom-btn" onClick={ScrollTop}>Обратная связь</button>

          </Link>
          </div>
        </div>
      </div>
    </>
  );
};
