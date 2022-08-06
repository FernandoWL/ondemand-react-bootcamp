import React, { useState } from "react";
import "./productview.css";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Table from "../Table";
import Counter from "../Counter";
import Store from "../../contexts/Store";

const ProductView = ({ data, disabledItem }) => {
  const [numItems, setNumItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [disabled, setDisabled]  = useState(disabledItem);
  const {
    images,
    price,
    sku,
    category,
    description,
    specs = [],
  } = data.results[0].data;
  const basics = [
    { label: "Sku", value: sku },
    { label: "Category", value: category.slug },
    { label: "Price", value: `US$ ${price}` },
    {
      label: "Tags",
      value: data.results[0].tags ? data.results[0].tags.join(", ") : "",
    },
  ];
  const notes = [
    {
      label: "Description",
      value: description[0].text ? description[0].text : "",
    }
  ];
  const specifications = specs.map((spec) => {
    return { label: spec.spec_name, value: spec.spec_value };
  });
  const items = images.map((img) => {
    return { original: img.image.url, thumbnail: img.image.url };
  });
  const handler = (counter) => {
    setNumItems((prevNumItems) => counter);
  };
  return (
    <Store.Consumer>
      {({ cart, updateCart, getCartItem }) => {
        let product = data.results[0]
        ? {
            name: data.results[0].data.name,
            id: data.results[0].id,
            balance: 0,
            price: data.results[0].data.price,
            image: data.results[0].data.mainimage.url,
            stock: data.results[0].data.stock,
          }
        : {};
        const addToCart = () => {
          const cartItem = getCartItem(cart, product.id);
          let currentStock = 0;
          if (cartItem.length > 0) {
            currentStock = cartItem[0].balance;
          } else {
            currentStock = product.stock;
          }
           if (Number(currentStock) >= Number(numItems)) {
            updateCart(cart, product, numItems);
            setNumItems((prevNumItems) => 0);
            if(errorMessage!==null) {
              setErrorMessage((prevErrorMessage) => null);
            }
            if (Number(currentStock) === Number(numItems)) {
              setDisabled((prevDisabled) => true);
            }
           } else {
            setErrorMessage((prevErrorMessage) => 'There are ' + currentStock + ' items in stock.');
           }
        };
        return (
          <div data-testid="product-view" className="productview">
            <div className="productview-label">
              {data.results && data.results[0].data.name}
            </div>
            <div className="productview-carousel">
              <ImageGallery
                items={items}
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
              />
            </div>
            <Table testid="product-view-basics" data={basics} numCells={2} title="BASICS" />
            <Table testid="product-view-description" data={notes} numCells={1} title="DESCRIPTION" cellLabel={false}/>
            <Table testid="product-view-specs" data={specifications} numCells={2} title="SPECS"/>
            <div className="productview-button-container">
              {errorMessage && <div><span>{errorMessage}</span></div>}
              <Counter handler={handler} numItems={numItems}/>
              <Button testid="product-view-add-button" classname="productview-button" onclick={addToCart} disabled={disabled}>
                Add to cart
              </Button>
            </div>
          </div>
        );
      }}
    </Store.Consumer>
  );
};

ProductView.propTypes = {
  data: PropTypes.object.isRequired,
  disabledItem: PropTypes.bool.isRequired
};
export default ProductView;
