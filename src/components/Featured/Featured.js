import React, { useRef } from "react";
import "./featured.css";
import Product from "../Product/Product";
import Button from "../Button/Button";
import { useProducts } from "../../utils/hooks/useProducts";
import { NavLink } from "react-router-dom";
import Store from "../../contexts/Store";

const Featured = () => {
  const productQuery = useRef({ tags: ["Featured"], pageSize: 16 });
  const { data, isLoading } = useProducts(productQuery.current);
  return (
    <div className="featured">
      <h3>Featured Products</h3>
      {isLoading && <div>Loading...</div>}
        {data.results && <div data-testid="featured-items" className="featured-items">
          {data.results.map((row) => {
            return (
              <Store.Consumer key={row.id}>
                {({ cart, getCartItem }) => {
                  let disabled = false;
                  const cartItem = getCartItem(cart, row.id);
                  if (cartItem.length > 0) {
                    disabled =  cartItem[0].balance === 0 ? true : false;
                  }
                  return (
                    <Product
                      data={{
                        id: row.id,
                        name: row.data.name,
                        alt: row.data.mainimage.alt,
                        url: row.data.mainimage.url,
                        price: row.data.price,
                        category: row.data.category.slug,
                        image: row.data.mainimage.url,
                        stock: row.data.stock,
                      }}
                      disabledItem={disabled}
                    />
                  );
                }}
              </Store.Consumer>
            );
          })}
          </div>
        }
      <div className="featured-div">
        <NavLink to="/productlist">
          <Button classname="featured-button">View all products</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Featured;
