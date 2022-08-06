import React from "react";
import Layout from "../../components/layout/Layout";
import Store from "../../contexts/Store";
import "./cart.css";
import CartItem from "../../components/CartItem/CartItem";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <Store.Consumer>
      {({ cart }) => {
        const goToCheckout = () => {
          navigate({
            pathname: "/checkout",
          });
        };
        let disabled = true;
        const total =
          cart.reduce(
            (previousValue, carItem) =>
              previousValue + Number(carItem.price) * Number(carItem.numItems),
            0
          ) || 0;
        if (total > 0) {
          disabled = false;
        }
        return (
          <Layout type="withoutNav">
            <div className="cart-container">
              <div className="cart-title">
                <div className="cart-title-items">Image</div>
                <div className="cart-title-items">Name</div>
                <div className="cart-title-items">Price</div>
                <div className="cart-title-items">Number of items</div>
                <div className="cart-title-items">Subtotal</div>
                <div className="cart-title-items">Remove</div>
              </div>
              {cart.length > 0 ? (
                cart.map((cartItem, key) => {
                  return <CartItem key={key} cartItem={cartItem} />;
                })
              ) : (
                <div data-testid="cart-error" className="cart-error">
                  There are no items in the cart
                </div>
              )}
              <div className="cart-total">
                <div data-testid="cart-total-items-text" className="cart-total-items-text">
                  Total ${total.toFixed(2)}
                </div>
                <div className="cart-total-items-button">
                  <Button
                    classname="cart-button"
                    onclick={goToCheckout}
                    disabled={disabled}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </Layout>
        );
      }}
    </Store.Consumer>
  );
};

export default Cart;
