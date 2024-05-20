import { useProductsContext } from "../context/products_context";

import GridView from "./GridView";
import ListView from "./ListView";
const ProductList = () => {
  const { productsFilter: products, grid_view } = useProductsContext();

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search.
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default ProductList;
