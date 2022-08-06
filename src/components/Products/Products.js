import React from "react";
import "./products.css";
import Product from "../Product/Product";
import Store from "../../contexts/Store";
import PropTypes from "prop-types";

const Products = ({ data, isLoading, isSearcResult }) => {
  if (data.results === undefined) {
    data.results = [];
  }
  return (
    <div className="products">
      <h3>Products</h3>
      {isLoading && <div>Loading...</div>}
      <div className="products-items">
        {data.results.length > 0 ? (
          data.results.map((row) => {
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
                        short_description: row.data.short_description,
                        image: row.data.mainimage.url,
                        stock: row.data.stock,
                      }}
                      extendedCard={isSearcResult}
                      disabledItem={disabled}
                    />
                  );
                }}
              </Store.Consumer>
            );
          })
        ) : isSearcResult ? (
          <div data-testid="product-error" className="product-error">
            There are no products for the search term
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Products.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};
export default Products;
