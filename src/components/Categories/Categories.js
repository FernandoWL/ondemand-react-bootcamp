import React from "react";
import "./categories.css";
import Category from "../Category/Category";
import {useProductCategories} from '../../utils/hooks/useProductCategories';
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { data, isLoading } = useProductCategories();
  const navigate = useNavigate();
  return (
    <div className="categories">
      <h3>Categories</h3>
      {isLoading && <div>Loading...</div>}
      {data.results && <div data-testid="categories-items" className="categories-items">
        {data.results.map((row) => {
          const goToProductList = () =>
          navigate({
            pathname: '/productlist',
            search: '?category=' + row.id,
          });
          return (
            <Category
            key = {row.id}
            data={{
              name: row.data.name,
              alt: row.data.main_image.alt,
              url: row.data.main_image.url,
            }}
            handlerEvent= {goToProductList}
          />
          );
        })}
      </div>}
    </div>
  );
};

export default Categories;
