import React from 'react'
import './body.css';
import PropTypes from 'prop-types';

const Body = ( { children } ) =>{
  return <div className="body">{ children }</div>
}

Body.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Body;