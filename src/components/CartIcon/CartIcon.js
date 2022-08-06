import { useState } from "react";
import PropTypes from "prop-types";
import cartImg from "../../assets/images/shopping_cart.png";
import cartImg_active from "../../assets/images/shopping_cart_active.png";
import "./carticon.css";
import Store from "../../contexts/Store";

const CartIcon = ({ onclick }) => {
  const [isHover, setIsHover] = useState(false);
  const handlerOnMouseEnter = () => {
    setIsHover((prevIsHover) => true);
  };
  const handlerOnMouseLeave = () => {
    setIsHover((prevIsHover) => false);
  };
  return (
    <Store.Consumer>
      {({ cart, getNumOfItems }) => {
        const items = getNumOfItems(cart);
        return (
          <div className="carticon-container">
            <div>
              <img
                data-testid="carticon-container-image"
                src={isHover ? cartImg_active : cartImg}
                alt="cart"
                style={{ height: 60 }}
                onMouseEnter={handlerOnMouseEnter}
                onMouseLeave={handlerOnMouseLeave}
                onClick={onclick}
              />
            </div>
            {items > 0 && <div data-testid="carticon-badge" className="carticon-badge">{items}</div>}
          </div>
        );
      }}
    </Store.Consumer>
  );
};

CartIcon.propTypes = {
  onclick: PropTypes.func.isRequired,
};
export default CartIcon;
