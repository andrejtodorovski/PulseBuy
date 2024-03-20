import ProductsRepository from "../repository/productsRepository";

export async function load({ fetch, params }) {
  const res = await ProductsRepository.fetchProducts();
  const products = await res.json();

  if (res.ok) {
    return {
      products: products.slice(0,4),
    };
  }

  return {
    products: [],
    status: res.status,
    error: new Error("Could not fetch the products."),
  };
}