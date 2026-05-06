import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsApi";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (dataResponse) => {
      console.log(
        `Felicidades, el producto "${dataResponse.title}" se ha agregado con exito con el ID: ${dataResponse.id} `,
      );

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
