import { createContext } from "react";

const Store = createContext({
  cart: [],
  updateCart: () => {},
  getCartItem: () => {},
  getNumOfItems: () => {},
  setNumberOfItems: () =>{},
  removeCartItem: ()=>{},
});

export default Store;
