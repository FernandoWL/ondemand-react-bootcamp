import { useRef } from "react";
import Layout from "../../components/layout/Layout";
import "./checkout.css";
import Store from "../../contexts/Store";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const refName = useRef();
  const refEmail = useRef();
  const refZipcode = useRef();
  const refNotes = useRef();
  const navigate = useNavigate();
  return (
    <Store.Consumer>
      {({ cart }) => {
        const handleOnSubmit = (e) => {
          e.preventDefault();
          console.log({
            name:refName.current.value,
            email:refEmail.current.value,
            zipcode:refZipcode.current.value,
            notes:refNotes.current.value,
          });
        };
        const goBackToCart = () => {
          navigate({
            pathname: "/cart"
          })
        }
        const total =
          cart.reduce(
            (previousValue, carItem) =>
              previousValue + Number(carItem.price) * Number(carItem.numItems),
            0
          ) || 0;
        return (
          <Layout type="withoutNav">
            <div className="checkout-container">
              <div className="checkout-detail">
                <div className="checkout-detail-title">
                  <div className="checkout-detail-title-items">Name</div>
                  <div className="checkout-detail-title-items">
                    Number of items
                  </div>
                  <div className="checkout-detail-title-items">Subtotal</div>
                </div>
                {cart.map((cartItem, key) => {
                  const { name, price, numItems } = cartItem;
                  const subtotal = Number(price) * Number(numItems);
                  return (
                    <div className="checkout-detail-cart" key={key}>
                      <div className="checkout-detail-cart-items">{name}</div>
                      <div className="checkout-detail-cart-items">
                        {numItems}
                      </div>
                      <div className="checkout-detail-cart-items">
                        ${subtotal.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
                <div className="checkout-detail-total">
                  <div className="checkout-detail-total-items-text">
                    Total ${total.toFixed(2)}
                  </div>
                  <div className="checkout-detail-total-items-button">
                    <Button
                      classname="checkout-button"
                      onclick={goBackToCart}
                    >
                      Go back to cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="checkout-sep" />
              <div className="checkout-form">
                <form onSubmit={handleOnSubmit}>
                  <div className="checkout-form-row">
                    <label>Name</label>
                    <input type="text" name="name" ref={refName} />
                  </div>
                  <div className="checkout-form-row">
                    <label>Email</label>
                    <input type="text" name="emil" ref={refEmail} />
                  </div>
                  <div className="checkout-form-row">
                    <label>Zip code</label>
                    <input type="text" name="zipcode" ref={refZipcode} />
                  </div>
                  <div className="checkout-form-row">
                    <label>Notes</label>
                    <textarea name="notes" ref={refNotes}></textarea>
                  </div>
                  <Button type="submit" classname="checkout-button">
                    Place order
                  </Button>
                </form>
              </div>
            </div>
          </Layout>
        );
      }}
    </Store.Consumer>
  );
};

export default Checkout;
