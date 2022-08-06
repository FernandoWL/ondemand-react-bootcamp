import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useProducts } from "../../utils/hooks/useProducts";
import Products from "../../components/Products/Products";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

const ProductList = () => {
  const [productQuery, setProductQuery] = useState({
    categories: [],
    pageSize: 12,
    currentPage: 1,
  });
  const { data, isLoading } = useProducts(productQuery);
  const [searchParams] = useSearchParams();
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchTerm = searchParams.get("searchTerm");
  const [isSearcResult, setIsSearcResult] = useState(false);
  useEffect(() => {
    const queryCategory = searchParams.get("category");
    if (queryCategory !== null) {
      setCheckedItems((prevCheckedItems) => [queryCategory]);
      setProductQuery((prevProductQuery) => ({
        ...prevProductQuery,
        categories: [queryCategory],
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    setProductQuery((prevProductQuery) => ({
      ...prevProductQuery,
      currentPage,
    }));
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm == null || searchTerm === "") {
      setProductQuery((prevProductQuery) => ({
        ...prevProductQuery,
        searchTerm: null,
        pageSize: 12,
      }));
      setIsSearcResult((prevIsSearcResult) => false);
    } else {
      setProductQuery((prevProductQuery) => ({
        ...prevProductQuery,
        searchTerm,
        pageSize: 20,
      }));
      setIsSearcResult((prevIsSearcResult) => true);
    }
  }, [searchTerm]);

  const handlerEvent = (e) => {
    let cats = [];
    if (e.target.type === "checkbox") {
      let checked = e.target.checked;
      let category = e.target.value;
      const categories = productQuery.categories;
      if (!categories.includes(category)) {
        if (checked) {
          cats = categories;
          cats.push(category);
        }
      } else {
        if (!checked) {
          cats = categories.filter((cat) => cat !== category);
        } else {
          cats = categories;
        }
      }
    }

    setProductQuery((prevProductQuery) => ({
      ...prevProductQuery,
      categories: cats,
    }));
    setCheckedItems((prevCheckedItems) => cats);
    setCurrentPage((prevCurrentPage) => 1);
  };

  return (
    <Layout
      type="withNav"
      navHandlerEvent={handlerEvent}
      navCheckedItems={checkedItems}
    >
      <Products
        data={data}
        isLoading={isLoading}
        isSearcResult={isSearcResult}
      />
      {data.total_results_size && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.total_results_size}
          pageSize={productQuery.pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Layout>
  );
};

export default ProductList;
