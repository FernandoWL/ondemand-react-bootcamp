import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProducts(query) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [products, setProducts] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    let cancel = false
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const {tags= [], categories= [], pageSize= 14, currentPage= 1, productId=null, searchTerm=null} = query;
    const controller = new AbortController();

    async function getProducts() {
      try {
        let addTags = '';
        if(tags.length > 0){
          const tagsParam = tags.length === 1 ? `["${tags[0]}"]` : `["${tags.join('","')}"]`;
          addTags = `&q=${encodeURIComponent(`[[at(document.tags,${tagsParam})]]`)}`;
        }
        let addCategories = '';
        if(categories.length > 0){
          const catsParam = categories.length === 1 ? `["${categories[0]}"]` : `["${categories.join('","')}"]`;
          addCategories = `&q=${encodeURIComponent(`[[any(my.product.category,${catsParam})]]`)}`;
        }
        let addSearchTerm = '';
        if(searchTerm !== null){
          addSearchTerm = `&q=${encodeURIComponent(`[[fulltext(document,"${searchTerm}")]]`)}`;
        }

        let queryString ='';
        if(productId === null){
          queryString = `&q=${encodeURIComponent(
            '[[at(document.type, "product")]]'
          )}&lang=en-us&page=${currentPage}&pageSize=${pageSize}${addTags}${addCategories}${addSearchTerm}`
        } else {
          queryString = `&q=${encodeURIComponent(
            `[[:d=at(document.id,"${productId}")]]`
          )}`
        }

        const url = `${API_BASE_URL}/documents/search?ref=${apiRef}${queryString}`;

        const response = await fetch(url,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        !cancel && setProducts({ data, isLoading: false });
      } catch (err) {
        !cancel && setProducts({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getProducts();

    return () => {
      cancel = true;
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, query]);

  return products;
}
