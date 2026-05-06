import axios from "axios";
import type { Product, ProductResponse, Category } from "../interfaces/product";

export const productsApi = axios.create({
  baseURL: "https://dummyjson.com",
});

/* CRUD */
export const createProduct = async (product: Partial<Product>) => {
  const { data } = await productsApi.post<Product>("/products/add", product);
  return data;
};

export const getProducts = async (limit: number, skip: number) => {
  const { data } = await productsApi.get<ProductResponse>(
    `/products?limit=${limit}&skip=${skip}`,
  );
  return data.products;
};

export const updateProduct = async (id: number, updates: Partial<Product>) => {
  const { data } = await productsApi.patch<Product>(`/products/${id}`, updates);
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await productsApi.delete(`/products/${id}`);
  return data;
};
/* CRUD END */

/* Search Products */
export const searchProducts = async (termino: string) => {
  const { data } = await productsApi.get<ProductResponse>(
    `/products/search?q=${termino}`,
  );
  return data.products;
};

/* Categories */
export const getCategories = async (): Promise<Category[]> => {
  const { data } = await productsApi.get<Category[]>("/products/categories");
  return data;
};
/* Categories END*/

export const getFilteredProducts = async (
  query: string,
  category: string,
  limit: number,
  skip: number,
) => {
  let url = `/products?limit=${limit}&skip=${skip}`;

  if (category) {
    url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
  } else if (query) {
    url = `/products/search?q=${query}&limit=${limit}&skip=${skip}`;
  }

  const { data } = await productsApi.get<ProductResponse>(url);
  let results = data.products;

  if (category && query) {
    results = results.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  return results;
};
