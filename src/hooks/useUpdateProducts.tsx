import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { updateProduct } from "../api/productsApi";
import { type Product } from "../interfaces/product";
import toast from "react-hot-toast";

export const useUpdateProducts = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("q") || "";
  const categoryTerm = searchParams.get("Category") || "";

  const queryKey = ["products", searchTerm, categoryTerm, page];
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Product> }) =>
      updateProduct(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousProducts = queryClient.getQueryData<Product[]>(queryKey);

      queryClient.setQueryData<Product[]>(queryKey, (old) => {
        return old?.map((p) => (p.id === id ? { ...p, ...updates } : p));
      });

      return { previousProducts };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(queryKey, context.previousProducts);
      }

      toast.error("No se pudo actualizar el producto", {
        id: "update-error",
      });
    },

    onSuccess: () => {
      toast.success("¡Precio y Stock actualizados!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
