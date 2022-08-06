import React from 'react'
import './content.css';
import PropTypes from "prop-types";

const Content = ( { children } ) =>{
  return <div className="content">{ children }</div>
}

Content.propTypes = {
  children: PropTypes.any.isRequired
};
export default Content;