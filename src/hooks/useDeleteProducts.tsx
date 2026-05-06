import { useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/productsApi";
import type { Product } from "../interfaces/product";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("q") || "";
  const categoryTerm = searchParams.get("category") || "";

  const queryKey = ["products", searchTerm, categoryTerm, page];

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previousProducts = queryClient.getQueryData<Product[]>(queryKey);

      queryClient.setQueryData<Product[]>(queryKey, (old) =>
        old?.filter((p) => p.id !== id),
      );

      return { previousProducts };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(queryKey, context.previousProducts);
      }
      toast.error("No se pudo eliminar el producto");
    },
    onSuccess: () => toast.success("Producto eliminado"),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
};
