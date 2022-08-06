import React from 'react';
import Button from "../Button/Button";
import "./counter.css";
import PropTypes from "prop-types";

function Counter({ handler, numItems }) {

  function handleIncrement() {
    handler(numItems + 1);
  }

  function handleDecrement() {
    handler(numItems <= 0 ? 0 : numItems - 1);
  }

  return (
    <div data-testid="counter" className="counter">
      <Button testid="counter-decrement" classname="counter-button" onclick={handleDecrement}>-</Button>
      <span className="counter-text">{numItems}</span>
      <Button testid="counter-increment" classname="counter-button" onclick={handleIncrement}>+</Button>
      <br />
    </div>
  );
}

Counter.propTypes = {
  handler: PropTypes.func.isRequired,
  numItems: PropTypes.number.isRequired
};
export default Counter;
