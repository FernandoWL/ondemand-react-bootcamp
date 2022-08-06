import { rest } from "msw";
import { API_BASE_URL } from "../src/utils/constants";
import * as apiMetadata from "./en-us/api-metadata.json";
import * as featuredBanners from "./en-us/featured-banners.json";
import * as productCategories from "./en-us/product-categories.json";
import * as featuredProducts from "./en-us/featured-products.json";
import * as products from "./en-us/products.json";

const handlers = [
  rest.get(API_BASE_URL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(apiMetadata))
  ),
  rest.get(`${API_BASE_URL}/documents/search`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const queries = query.getAll("q");
    const [documentType] = queries;
    let jsonToReturn = {};
    if (documentType.includes("banner")) {
      jsonToReturn = featuredBanners;
    } else if (documentType.includes("category")) {
      jsonToReturn = productCategories;
    } else if (documentType.includes("product")) {
      if (queries.includes('[[at(document.tags,["Featured"])]]')) {
        jsonToReturn = featuredProducts;
      } else if (
        queries.includes('[[any(my.product.category,["YWHy0xIAACoAykKm"])]]')
      ) {
        const { results, ...rest } = products;
        jsonToReturn = rest;
        jsonToReturn.results_per_page = 12;
        jsonToReturn.total_pages = 2;
        jsonToReturn.total_results_size = 14;
        jsonToReturn.default = {};
        if (query.getAll("page")[0] === "1") {
          jsonToReturn.results = products.results
            .filter(
              (product) => product.data.category.id === "YWHy0xIAACoAykKm"
            )
            .slice(0, 12);
          jsonToReturn.results_size = 12;
        } else {
          if (query.getAll("page")[0] === "2") {
            jsonToReturn.results = products.results
              .filter(
                (product) => product.data.category.id === "YWHy0xIAACoAykKm"
              )
              .slice(-2);
            jsonToReturn.results_size = 2;
            jsonToReturn.page = 2;
          }
        }
      } else if (queries.includes('[[fulltext(document,"Tallulah")]]')) {
        jsonToReturn = products;
        jsonToReturn.results_per_page= 20;
        jsonToReturn.total_pages = 1;
        jsonToReturn.results_size = 1;
        jsonToReturn.total_results_size = 1;
        jsonToReturn.results = products.results.filter(
          (product) => product.id === "YWL8XBIAAC0AzuPZ"
        );
        jsonToReturn.results[0].data.stock = 1;
        jsonToReturn.default = {};
      } else if (queries.includes('[[fulltext(document,"Bathrobe")]]')) {
        jsonToReturn = {
          license:
            'This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.',
          next_page: null,
          page: 1,
          prev_page: null,
          results: [],
          results_per_page: 20,
          results_size: 0,
          total_pages: 0,
          total_results_size: 0,
          version: '31acd9d',
        };
      } else {
        jsonToReturn = products;
      }
    } else if (documentType.includes("YWL8XBIAAC0AzuPZ")) {
      jsonToReturn = products;
      jsonToReturn.total_pages = 1;
      jsonToReturn.results_size = 1;
      jsonToReturn.total_results_size = 1;
      jsonToReturn.results = products.results.filter(
        (product) => product.id === "YWL8XBIAAC0AzuPZ"
      );
      jsonToReturn.results[0].data.stock = 1;
    }
    return res(ctx.status(200), ctx.json(jsonToReturn));
  }),
];

export default handlers;
