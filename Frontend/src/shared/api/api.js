export const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const dataProducts = await response.json();

  return dataProducts;
};
