import { useForm } from 'react-hook-form';
import { useCreateProduct } from "../../hooks/useCreateProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaProduct, type ProductFormData } from "../../interfaces/schemas";

export const CrudForm = () => {
  const { mutate: createProduct, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(schemaProduct),
  });

  const sendData = (data: ProductFormData) => {
    createProduct(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(sendData)}>
      <div>
        <input {...register('title')} placeholder="nombre del producto" />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <input 
          {...register('price', { valueAsNumber: true })} 
          type="number" 
          placeholder="precio del producto" 
        />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'guardando...' : 'agregar'}
      </button>
    </form>
  );
};
