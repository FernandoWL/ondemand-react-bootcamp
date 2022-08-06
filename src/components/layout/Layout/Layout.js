import React from 'react'
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';
import Navigation from '../Navigation';
import Body from '../Body/Body';
import PropTypes from 'prop-types';

const Layout = ({ type, navHandlerEvent, navCheckedItems, children }) => {
  const handlerEvent = (e) => {
    return navHandlerEvent(e);
  }
  return (
  <>
  <Header/>
  <Body>
    {type === 'withNav'  &&  <Navigation handlerEvent={handlerEvent} checkedItems={navCheckedItems}/> }
    <Content>{children}</Content>
  </Body>
  <Footer/>
  </>
  )
}

Layout.propTypes = {
    type: PropTypes.oneOf(['withNav','withoutNav']).isRequired,
    children: PropTypes.any.isRequired,
};

export default Layout;