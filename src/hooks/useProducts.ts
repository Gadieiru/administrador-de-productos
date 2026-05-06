import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFilteredProducts, getProducts } from "../api/productsApi";
import { useDebounce } from "./useDebounce";

export const useProducts = (page: number) => {
  const [searchParams] = useSearchParams();
  const limit = 10; // Cantidad de productos por página
  const skip = (page - 1) * limit;

  const searchTerm = searchParams.get("q") || "";
  const categoryTerm = searchParams.get("category") || "";
  const debounceSearch = useDebounce(searchTerm, 500);

  return useQuery({
    queryKey: ["products", searchTerm, categoryTerm, page],

    queryFn: () => {
      if (categoryTerm || debounceSearch) {
        return getFilteredProducts(debounceSearch, categoryTerm, limit, skip);
      }
      return getProducts(limit, skip);
    },
    placeholderData: (prev) => prev,
  });
};
