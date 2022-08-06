//import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("2 Home Page", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("2.1 FeatureBanners Slider", async () => {
    const slider = await screen.findByTestId("slider-items");
    expect(slider).toBeVisible();
  });

  test("2.2 Categories", async () => {
    const categories = await screen.findByTestId("categories-items");
    expect(categories).toBeVisible();
  });

  test("2.3 Featured products", async () => {
    const featuredProducts = await screen.findByTestId("featured-items");
    expect(featuredProducts).toBeVisible();
  });
});

describe("3 Product List Page", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("3.1 Product Category Sidebar", async () => {
    const viewAllProductsButton = screen.getByText("View all products");
    fireEvent.click(viewAllProductsButton);
    const navigation = await screen.findByTestId("navigation-items");
    expect(navigation).toBeVisible();
  });

  test("3.2 Category links are filtering Products", async () => {
    const categoryItems = await screen.findAllByTestId("toggle-item");
    expect(categoryItems.length).toEqual(5);
    act(() => {
      fireEvent.click(categoryItems[1]);
    });
    const products = await screen.findAllByTestId("product-item");
    expect(products[0]).toHaveTextContent("Category: lighting");
  });

  test("3.3 Pagination Controls are generated correctly", async () => {
    const pagination = await screen.findByTestId("pagination-container");
    expect(pagination).toBeVisible();
  });

  test("3.4 Prev button is disabled when the user is on the first page", async () => {
    const paginationPrev = await screen.findByTestId(
      "pagination-container-prev"
    );
    expect(paginationPrev).toHaveClass("disabled");
  });

  test("3.5 Next button is working as expected", async () => {
    const categoryItems = await screen.findAllByTestId("toggle-item");
    expect(categoryItems.length).toEqual(5);
    act(() => {
      fireEvent.click(categoryItems[1]);
    });

    const paginationNext = await screen.findByTestId(
      "pagination-container-next"
    );
    act(() => {
      expect(paginationNext).toBeVisible();
    });

    act(() => {
      fireEvent.click(paginationNext);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 3000));
    });

    const products = await screen.findAllByTestId("product-item");
    expect(products.length).toEqual(2);
  });

  test("3.6 Prev button is working as expected", async () => {
    const categoryItems = await screen.findAllByTestId("toggle-item");
    expect(categoryItems.length).toEqual(5);
    act(() => {
      fireEvent.click(categoryItems[1]);
    });

    const paginationNext = await screen.findByTestId(
      "pagination-container-next"
    );
    act(() => {
      expect(paginationNext).toBeVisible();
    });

    act(() => {
      fireEvent.click(paginationNext);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const products = await screen.findAllByTestId("product-item");
    expect(products.length).toEqual(2);

    const paginationPrev = await screen.findByTestId(
      "pagination-container-prev"
    );
    act(() => {
      expect(paginationPrev).toBeVisible();
    });

    act(() => {
      fireEvent.click(paginationPrev);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const productsPrev = await screen.findAllByTestId("product-item");
    expect(productsPrev.length).toEqual(12);
  });

  test("3.7 Next button is disabled when the user is on the last page", async () => {
    const categoryItems = await screen.findAllByTestId("toggle-item");
    expect(categoryItems.length).toEqual(5);
    act(() => {
      fireEvent.click(categoryItems[1]);
    });

    const paginationNext = await screen.findByTestId(
      "pagination-container-next"
    );
    act(() => {
      expect(paginationNext).toBeVisible();
    });

    act(() => {
      fireEvent.click(paginationNext);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 3000));
    });

    const products = await screen.findAllByTestId("product-item");
    expect(products.length).toEqual(2);

    const paginationNextCurrent = await screen.findByTestId(
      "pagination-container-next"
    );
    expect(paginationNextCurrent).toHaveClass("disabled");
  });
});

describe("4 Product Detail Page", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("4.1 Product Detail Page is fetching and rendering data", async () => {
    const Products = await screen.findAllByTestId("product-label");
    expect(Products[0]).toBeVisible();

    act(() => {
      fireEvent.click(Products[0]);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 3000));
    });
    const productView = await screen.findByTestId("product-view");
    expect(productView).toBeVisible();
  });

  test("4.2 Product Detail Page contains the following labels", async () => {
    const productViewBasics = await screen.findByTestId("product-view-basics");
    expect(productViewBasics).toBeVisible();

    const productViewDescription = await screen.findByTestId(
      "product-view-description"
    );
    expect(productViewDescription).toBeVisible();

    const productViewSpecs = await screen.findByTestId("product-view-specs");
    expect(productViewSpecs).toBeVisible();
  });

  test("4.3 Product Detail Page contains a quantity selector and an “Add to Cart” button", async () => {
    const counter = await screen.findByTestId("counter");
    expect(counter).toBeVisible();

    const counterDecremet = await screen.findByTestId("counter-decrement");
    expect(counterDecremet).toBeVisible();

    const counterIncrement = await screen.findByTestId("counter-increment");
    expect(counterIncrement).toBeVisible();

    const productViewAddButton = await screen.findByTestId(
      "product-view-add-button"
    );
    expect(productViewAddButton).toBeVisible();
  });

  test("4.4 Validate that after clicking the “Add to cart” button, the items are added", async () => {
    const counterIncrement = await screen.findByTestId("counter-increment");
    expect(counterIncrement).toBeVisible();

    act(() => {
      fireEvent.click(counterIncrement);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const productViewAddButton = await screen.findByTestId(
      "product-view-add-button"
    );
    expect(productViewAddButton).toBeVisible();

    act(() => {
      fireEvent.click(productViewAddButton);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const carticonBadge = await screen.findByTestId("carticon-badge");
    expect(carticonBadge).toHaveTextContent("1");
  });

  test("4.5 Validate that the “Add to Cart” button is disabled when the stock units available for the selected product is zero", async () => {
    const counterIncrement = await screen.findByTestId("counter-increment");
    expect(counterIncrement).toBeVisible();

    act(() => {
      fireEvent.click(counterIncrement);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const productViewAddButton = await screen.findByTestId(
      "product-view-add-button"
    );
    expect(productViewAddButton).toBeVisible();

    act(() => {
      fireEvent.click(productViewAddButton);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const productViewAddButtonNew = await screen.findByTestId(
      "product-view-add-button"
    );
    expect(productViewAddButtonNew).toBeDisabled();
  });
});

describe("5 Search Results Page", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("5.1 Validate that the list of results is rendering data according to the “searchTerm” provided", async () => {
    const searchItem = await screen.findByTestId("search-item");
    expect(searchItem).toBeVisible();
    fireEvent.change(searchItem, { target: { value: "Tallulah" } });
    expect(searchItem.value).toBe("Tallulah");

    act(() => {
      fireEvent.keyDown(searchItem, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
        keyCode: 13,
      });
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 3000));
    });

    const products = await screen.findAllByTestId("product-item");
    expect(products.length).toEqual(1);
  });

  test("5.2 Validate that an empty state is displayed when there are no results for the “searchTerm” provided", async () => {
    const searchItem = await screen.findByTestId("search-item");
    expect(searchItem).toBeVisible();
    fireEvent.change(searchItem, { target: { value: "Bathrobe" } });
    expect(searchItem.value).toBe("Bathrobe");

    act(() => {
      fireEvent.keyDown(searchItem, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
        keyCode: 13,
      });
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 3000));
    });

    const productError = await screen.findByTestId("product-error");
    expect(productError).toBeVisible();
  });
});

describe("6 Shopping Cart Page", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("6.1 Validate that an empty state is displayed when there are no items in the cart", async () => {
    const cartIcon = await screen.findByTestId("carticon-container-image");
    expect(cartIcon).toBeVisible();
    act(() => {
      fireEvent.click(cartIcon);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 3000));
    });

    const cartError = await screen.findByTestId("cart-error");
    expect(cartError).toBeVisible();
  });

  test("6.2 Validate that the list of products is shown when there are items in the cart", async () => {
    const headerLogo = await screen.findByTestId("header-logo");
    expect(headerLogo).toBeVisible();
    act(() => {
      fireEvent.click(headerLogo);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    const Products = await screen.findAllByTestId("product-button");
    expect(Products[0]).toBeVisible();

    act(() => {
      fireEvent.click(Products[0]);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const cartIcon = await screen.findByTestId("carticon-container-image");
    expect(cartIcon).toBeVisible();
    act(() => {
      fireEvent.click(cartIcon);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    const cartDetail = await screen.findAllByTestId("cart-detail");
    expect(cartDetail.length).toEqual(1);
  });

  test("6.3 Validate that the cart total label displays the sum of the subtotals of all items in the cart", async () => {
    const headerLogo = await screen.findByTestId("header-logo");
    expect(headerLogo).toBeVisible();
    act(() => {
      fireEvent.click(headerLogo);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    const Products = await screen.findAllByTestId("product-button");
    expect(Products[0]).toBeVisible();

    act(() => {
      fireEvent.click(Products[0]);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    const cartIcon = await screen.findByTestId("carticon-container-image");
    expect(cartIcon).toBeVisible();
    act(() => {
      fireEvent.click(cartIcon);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });
    const cartTotal = await screen.findByTestId("cart-total-items-text");
    expect(cartTotal).toBeVisible();
    expect(cartTotal).toHaveTextContent("Total $1834.57");
  });

  test("6.4 Validate that you can update the quantity of items for a particular product in the cart", async () => {
    const headerLogo = await screen.findByTestId("header-logo");
    expect(headerLogo).toBeVisible();
    act(() => {
      fireEvent.click(headerLogo);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    const Products = await screen.findAllByTestId("product-button");
    expect(Products[0]).toBeVisible();

    act(() => {
      fireEvent.click(Products[0]);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });

    const cartIcon = await screen.findByTestId("carticon-container-image");
    expect(cartIcon).toBeVisible();
    act(() => {
      fireEvent.click(cartIcon);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });
    const cartTotal = await screen.findByTestId("cart-total-items-text");
    expect(cartTotal).toBeVisible();
    expect(cartTotal).toHaveTextContent("Total $1834.57");

    const counterIncrement = await screen.findByTestId("counter-increment");
    expect(counterIncrement).toBeVisible();
    act(() => {
      fireEvent.click(counterIncrement);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });

    const cartTotalNew = await screen.findByTestId("cart-total-items-text");
    expect(cartTotalNew).toBeVisible();
    expect(cartTotalNew).toHaveTextContent("Total $3669.14");

    act(() => {
      fireEvent.click(counterIncrement);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });

    const cartErrorMesagge = await screen.findByTestId("cart-error-mesagge");
    expect(cartErrorMesagge).toBeVisible();
  });

  test("6.5 Validate that you can remove a product from the cart after clicking on the “remove from cart icon”", async () => {
    const headerLogo = await screen.findByTestId("header-logo");
    expect(headerLogo).toBeVisible();
    act(() => {
      fireEvent.click(headerLogo);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    const Products = await screen.findAllByTestId("product-button");
    expect(Products[0]).toBeVisible();

    act(() => {
      fireEvent.click(Products[0]);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });

    const cartIcon = await screen.findByTestId("carticon-container-image");
    expect(cartIcon).toBeVisible();
    act(() => {
      fireEvent.click(cartIcon);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });
    const cartTotal = await screen.findByTestId("cart-total-items-text");
    expect(cartTotal).toBeVisible();
    expect(cartTotal).toHaveTextContent("Total $1834.57");

    const deleteButton = await screen.findByTestId("cart-detail-items-icon");
    expect(deleteButton).toBeVisible();

    act(() => {
      fireEvent.click(deleteButton);
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });

    const cartError = await screen.findByTestId("cart-error");
    expect(cartError).toBeVisible();

  });
});
