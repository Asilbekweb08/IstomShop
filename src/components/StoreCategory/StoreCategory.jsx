import React, { useEffect, useState } from "react";
import "./StoreCategory.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { URL } from "../../hooks/hook";
import { useParams } from "react-router-dom";

function StoreCategory({
  onCategoryClick,
  onSubcategoryClick,
  onCategoryName,
}) {
  const {id}=useParams()
  const [productsData, setProductsData] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/shop/categories`)
      .then((res) => {
        setProductsData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleCategoryClick = (categoryId) => {
    onCategoryClick(categoryId);

    axios
      .get(`${URL}/shop/main/categories/products/${categoryId}`)
      .then((response) => {
        console.log("API response for category ID:", categoryId);
        console.log(response.data.results);
        setCategoryProducts(response.data.results); // Обновляем состояние с результатами
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
      

  };

  const handleSubcategoryClick = (subcategoryId) => {
    onSubcategoryClick(subcategoryId);
    axios
      .get(`${URL}/shop/category_product/${subcategoryId}`)
      .then((response) => {
        console.log("API response for subcategory ID:", subcategoryId);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  return (
    <div className="container">
      <div className="storecategory">
        <div className="storecategory-acc">
          {productsData.map((product, index) => (
            
            
            <Accordion key={index}>
              
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                onClick={() => {
                  handleCategoryClick(product.id);
                  onCategoryName(product.name);
                }} // Обработчик клика для названия категории
              >
                <p>{product.name}</p>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {product.sub_category.map((subcategory) => (
                    <li
                      className="subcategory"
                      key={subcategory.id}
                      onClick={() => handleSubcategoryClick(subcategory.id)}
                    >
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoreCategory;
