import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useSearchParams } from "react-router-dom";
import {useProducts} from '../../utils/hooks/useProducts';
import ProductView from "../../components/ProductView";
import Store from "../../contexts/Store";
const ProductDetail = () => {
  const [productQuery, setProductQuery] = useState({productId:null});
  const { data, isLoading } = useProducts(productQuery);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setProductQuery(prevProductQuery => ({...prevProductQuery, productId:searchParams.get("productId")}));
  }, [searchParams]);
  return (
    <Layout type="withoutNav">
       {isLoading && <div>Loading...</div>}
      {data.results &&
      <Store.Consumer>
         {({ cart, updateCart, getCartItem }) => {
          let disabled = false;
          const cartItem = getCartItem(cart, data.results[0].id);
          if (cartItem.length > 0) {
            disabled =  cartItem[0].balance === 0 ? true : false;
          }
          return (<ProductView data={data} disabledItem={disabled}/>);
         }}
      </Store.Consumer>}
    </Layout>
  );
};

export default ProductDetail;
