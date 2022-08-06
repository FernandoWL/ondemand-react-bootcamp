import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";

const INITIAL_API_METADATA = { ref: null, isLoading: true };

export function useLatestAPI() {
  const [apiMetadata, setApiMetadata] = useState(() => INITIAL_API_METADATA);

  useEffect(() => {
    let cancel = false;
    const controller = new AbortController();

    async function getAPIMetadata() {
      try {
        !cancel && setApiMetadata(INITIAL_API_METADATA);

        const response = await fetch(API_BASE_URL, {
          signal: controller.signal,
        });
        const { refs: [{ ref } = {}] = [] } = await response.json();

        !cancel && setApiMetadata({ ref, isLoading: false });
      } catch (err) {
        !cancel && setApiMetadata({ ref: null, isLoading: false });
        //console.error(err);
      }
    }

    getAPIMetadata();

    return () => {
      cancel = true;
      controller.abort();
    };
  }, []);

  return apiMetadata;
}
