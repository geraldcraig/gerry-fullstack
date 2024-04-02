import { Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
import Messages from './components/Messages';
import AboutTheApp from './components/AboutTheApp';
import ListAllProducts from './components/ListAllProducts';
import ProductSearchByName from "./components/ProductSearchByName";
import ProductSearchByDescription from "./components/ProductSearchByDescription";
import ProductSearchByStockLevel from "./components/ProductSearchByStockLevel";
import ProductReviews from "./components/ProductReviews";


const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="messages" element={<Messages />} />
            <Route path="abouttheapp" element={<AboutTheApp />} />
            <Route path="listallproducts" element={<ListAllProducts />} />
            <Route path="productsearchbyname" element={<ProductSearchByName />} />
            <Route path="producsearchtbydescription" element={<ProductSearchByDescription />} />
            <Route path="producsearchbystocklevel" element={<ProductSearchByStockLevel />} />
            <Route path="reviews" element={<ProductReviews />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Route>
        </Routes>
  );
};

export default App;