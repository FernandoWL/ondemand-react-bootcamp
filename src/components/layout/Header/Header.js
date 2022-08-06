import {useRef} from "react";
import "./header.css";
import logo from "../../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import CartIcon from "../../CartIcon";

const Header = () => {
  const searchTerm = useRef();
  const navigate = useNavigate();
  const goToProductList = (event) => {
    if (event.key === 'Enter') {
      navigate({
        pathname: "/productlist",
        search: "?searchTerm=" + searchTerm.current.value,
      })
    }
  };
  const addToCart = () => {
    navigate({
      pathname: "/cart"
    })
  };
  return (
    <div className="header">
      <div className="header-logo">
        <NavLink to="/"><img data-testid="header-logo" src={logo} alt="logo"style={{height:120}}/></NavLink>
      </div>
      <div className="header-right">
        <input data-testid="search-item" type="text" placeholder="Search item" onKeyDown={goToProductList} ref={searchTerm}></input>
        <CartIcon onclick={addToCart}/>
      </div>
    </div>
  );
};

export default Header;
