import React from "react";
import PropTypes from 'prop-types';

const Button = ({ children, classname, onclick, type='button', disabled=false, testid=''}) => {
  return (
    <button data-testid={testid} type={type} onClick={onclick} className={classname} disabled={disabled}>{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  classname: PropTypes.string.isRequired
};
export default Button;
