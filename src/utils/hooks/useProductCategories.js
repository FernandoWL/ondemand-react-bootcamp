import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProductCategories() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [productCategories, setProductCategories] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    let cancel = false;
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getProductCategories() {
      try {
        !cancel && setProductCategories({ data: {}, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "category")]]'
          )}&lang=en-us&pageSize=30`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        !cancel && setProductCategories({ data, isLoading: false });
      } catch (err) {
        !cancel && setProductCategories({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getProductCategories();

    return () => {
      cancel = true;
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return productCategories;
}
