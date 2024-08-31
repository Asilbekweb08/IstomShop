import StoreProducts from "../components/StoreProducts/StoreProducts";
import StoreCategory from "../components/StoreCategory/StoreCategory";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

function Store({ searchResults }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [CategoryName,setCategoryName]=useState("")
  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const categoryName=(CategoryName)=>{
    setCategoryName(CategoryName)
    
  }

  return (
    <>
      <Helmet>
        <title>
          Большой выбор инструментов и оборудование для стоматологов! IstomShop
        </title>
        <meta
          name="description"
          content="IstomShop - Большой ассортимент профессионального оборудование и инструментов для стоматологов! Доставка по РФ"
        />
      </Helmet>
      <div className="container">
        <div className="store">
          <StoreCategory
            onSubcategoryClick={handleSubcategoryClick}
            onCategoryClick={handleCategoryClick}
            onCategoryName={categoryName}
          />

          <StoreProducts
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            searchResults={searchResults}
            categoryName={CategoryName}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Store;
