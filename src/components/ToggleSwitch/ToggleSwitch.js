import React from "react";
import "./toggleswitch.css";
import PropTypes from "prop-types";

const ToggleSwitch = ({ label, handlerEvent, value, checked=false }) => {
  const handlerOnChange = (e)=>{
    handlerEvent(e);
  }

  return (
    <div className="container">
      <div className="toggle-label">{label} </div>
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" name={label} id={label} value={value} onChange={handlerOnChange} checked={checked}/>
        <label className="label" htmlFor={label}>
          <span data-testid="toggle-item" className="inner" />
        </label>
      </div>
    </div>
  );
};

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  handlerEvent: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default ToggleSwitch;
