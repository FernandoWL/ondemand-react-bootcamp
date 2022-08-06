import { useState } from "react";
import trashImg from "../../assets/images/trash.png";
import trashImg_active from "../../assets/images/trash-active.png";
import Store from "../../contexts/Store";
import "./cartitem.css";
import Counter from "../Counter";
import PropTypes from "prop-types";

const CartItem = ({ cartItem }) => {
  const [isHover, setIsHover] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handlerOnMouseEnter = () => {
    setIsHover((prevIsHover) => true);
  };
  const handlerOnMouseLeave = () => {
    setIsHover((prevIsHover) => false);
  };
  const { name, id, price, image, numItems, stock, balance } = cartItem;
  const subtotal = Number(price) * Number(numItems);
  return (
    <Store.Consumer>
      {({ cart, setNumberOfItems, removeCartItem }) => {
        const handler = (counter) => {
          if (counter <= stock) {
            setNumberOfItems(cart, id, counter);
            if(errorMessage!==null) {
              setErrorMessage((prevErrorMessage) => null);
            }
          } else{
            setErrorMessage((prevErrorMessage) => 'There are ' + balance + ' items in stock.');
          }
        };
        const removeItem = () => {
          removeCartItem(cart, id);
        };
        return (
          <div data-testid="cart-detail" className="cart-detail">
            <div className="cart-detail-items">
              <img src={image} alt={name} style={{ height: 150 }}></img>
            </div>
            <div className="cart-detail-items">{name}</div>
            <div className="cart-detail-items">${price}</div>
            <div className="cart-detail-items">
              <Counter handler={handler} numItems={numItems}/>
              {errorMessage && <div data-testid="cart-error-mesagge"><span>{errorMessage}</span></div>}</div>
            <div className="cart-detail-items">${subtotal.toFixed(2)}</div>
            <div className="cart-detail-items-icon">
              <img
                data-testid="cart-detail-items-icon"
                src={isHover ? trashImg_active : trashImg}
                alt="cart"
                style={{ height: 30 }}
                onMouseEnter={handlerOnMouseEnter}
                onMouseLeave={handlerOnMouseLeave}
                onClick={removeItem}
              />
            </div>
          </div>
        );
      }}
    </Store.Consumer>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
};
export default CartItem;
