import React from "react";
import "./category.css";
import PropTypes from 'prop-types';

const Category = ({ data, handlerEvent }) => {
  const { url, name, alt } = data;
  const handlerOnClick = ()=>{
    handlerEvent();
  }
  return (
    <div className="category" onClick={handlerOnClick}>
      <div className="category-img">
        <img src={url} alt={alt}/>
      </div>
      <div className="category-label">
        <label>{name}</label>
      </div>
    </div>
  );
};

Category.propTypes = {
  data: PropTypes.object.isRequired,
  handlerEvent: PropTypes.func.isRequired
};
export default Category;
