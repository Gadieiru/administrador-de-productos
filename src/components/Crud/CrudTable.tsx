import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useUpdateProducts } from "../../hooks/useUpdateProducts";
import { type Product } from "../../interfaces/product";
import { useEffect, useState } from "react";
import { getFilteredProducts, getProducts } from "../../api/productsApi";
import { useDeleteProduct } from "../../hooks/useDeleteProducts";
import { TableSkeleton } from "../UI/TableSkeleton";

export const CrudTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    data: products,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useProducts(page);

  const { mutate } = useUpdateProducts();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formData = new FormData(e.currentTarget);
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));

    mutate({ id: editingProduct.id, updates: { price, stock } });

    setEditingProduct(null);
  };

  useEffect(() => {
    if (page < 20) {
      const nextPage = page + 1;
      const limit = 10;
      const skip = (nextPage - 1) * limit;

      // Obtenemos los términos de búsqueda actuales para que el prefetch sea preciso
      const searchTerm = searchParams.get("q") || "";
      const categoryTerm = searchParams.get("category") || "";

      queryClient.prefetchQuery({
        queryKey: ["products", searchTerm, categoryTerm, nextPage],
        queryFn: () => {
          if (categoryTerm || searchTerm) {
            return getFilteredProducts(searchTerm, categoryTerm, limit, skip);
          }
          return getProducts(limit, skip);
        },
        staleTime: 1000 * 60 * 5,
      });
    }
  }, [page, queryClient, searchParams]);

  const { mutate: deleteMutate } = useDeleteProduct();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const confirmDelete = () => {
    if (productToDelete) {
      deleteMutate(productToDelete.id);
      setProductToDelete(null); // Cerramos el modal
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center p-10 border border-red-900/50 rounded-lg bg-red-950/20">
        <p className="text-red-400 font-bold mb-4 italic">
          ⚠️ HA OCURRIDO UN ERROR DE CONEXIÓN
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-black transition-all active:scale-95"
        >
          REINTENTAR CARGA
        </button>
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-cyan-900/50 bg-[#1e3a4d]">
      <h2 className="p-4 text-cyan-100 font-bold">Productos</h2>

      <table className="w-full text-xs text-left">
        <thead className="bg-[#162a37] text-cyan-500 uppercase tracking-wider border-b border-cyan-900">
          <tr>
            <th className="px-4 py-3 text-center">Imagen</th>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-right">Precio</th>
            <th className="px-4 py-3 text-left">Categoría</th>
            <th className="px-4 py-3 text-right">Stock</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-cyan-900/30">
          {isLoading || isFetching ? (
            <TableSkeleton />
          ) : products && products.length > 0 ? (
            products.map((e) => (
              <tr key={e.id} className="hover:bg-[#24465c] transition-colors">
                <td className="px-2 py-1 flex justify-center">
                  <img
                    src={e.thumbnail}
                    alt={e.title}
                    className="w-8 h-8 object-cover rounded border border-cyan-800"
                  />
                </td>
                <td className="px-4 py-2 font-semibold text-cyan-100">
                  {e.title}
                </td>
                <td className="px-4 py-2 text-right font-mono text-cyan-300 text-sm">
                  ${e.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-cyan-700 italic">{e.category}</td>
                <td className="px-4 py-2 text-right font-medium text-cyan-100">
                  {e.stock}{" "}
                  <span className="text-[10px] text-cyan-800 ml-1">Uds</span>
                </td>
                <td className="px-2 py-1 text-center">
                  <button
                    className="text-cyan-600 hover:scale-110 px-1"
                    onClick={() => setEditingProduct(e)}
                  >
                    ✎
                  </button>
                  <button
                    className="text-cyan-600 hover:text-red-500/70 px-1"
                    onClick={() => setProductToDelete(e)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-20 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-3xl">🔍</span>
                  <p className="text-cyan-600 font-medium italic">
                    No se encontraron productos.
                  </p>
                  <button
                    onClick={() => setSearchParams({ page: "1" })}
                    className="mt-2 text-cyan-400 underline text-[10px] font-bold uppercase tracking-widest"
                  >
                    Ver todos los productos
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4 text-[10px] text-cyan-700 uppercase px-2">
        <span>Página {page}</span>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setSearchParams({
                ...Object.fromEntries(searchParams),
                page: (page - 1).toString(),
              })
            }
            disabled={page === 1}
            className="px-3 py-1 bg-[#162a37] border border-cyan-900 rounded text-cyan-500 disabled:opacity-20 hover:bg-[#24465c]"
          >
            Anterior
          </button>

          <button
            onClick={() =>
              setSearchParams({
                ...Object.fromEntries(searchParams),
                page: (page + 1).toString(),
              })
            }
            disabled={page === 20}
            className="px-3 py-1 bg-[#162a37] border border-cyan-900 rounded text-cyan-500 disabled:opacity-20 hover:bg-[#24465c]"
          >
            Siguiente
          </button>
        </div>
        {/* --- MODAL DE EDICIÓN --- */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Fondo oscuro con desenfoque */}
            <div
              className="absolute inset-0 bg-[#0a1921]/80 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setEditingProduct(null)}
            ></div>

            {/* Tarjeta del Modal */}
            <form
              onSubmit={handleUpdate}
              className="relative w-full max-w-sm rounded-2xl border border-cyan-500/30 bg-[#162a37] p-6 shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] animate-in zoom-in-95 duration-200"
            >
              <h3 className="text-lg font-bold text-white mb-1">
                Editar Existencias
              </h3>
              <p className="text-[10px] text-cyan-500 uppercase tracking-widest mb-6">
                {editingProduct.title}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold text-cyan-700 uppercase mb-1 ml-1">
                    Precio ($)
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct.price}
                    className="w-full bg-[#1e3a4d] border border-cyan-900 rounded-lg p-2 text-cyan-100 outline-none focus:border-cyan-500 transition-colors"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-cyan-700 uppercase mb-1 ml-1">
                    Cantidad en Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    defaultValue={editingProduct.stock}
                    className="w-full bg-[#1e3a4d] border border-cyan-900 rounded-lg p-2 text-cyan-100 outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 px-4 py-2 text-xs font-bold text-cyan-700 hover:text-cyan-400 transition-colors"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-[#162a37] font-black py-2 rounded-lg text-xs uppercase transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
                >
                  GUARDAR CAMBIOS
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {productToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-red-950/40 backdrop-blur-md animate-in fade-in duration-700"
            onClick={() => setProductToDelete(null)}
          ></div>
          <div className="relative w-full max-w-xs rounded-2xl border border-red-500/30 bg-[#162a37] p-6 shadow-[0_0_50px_-12px_rgba(239,68,68,0.4)] animate-in zoom-in-95 duration-300 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-900/20 mb-4">
              <span className="text-red-500 text-2xl font-bold">!</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              ¿Eliminar producto?
            </h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">
              Estás a punto de borrar{" "}
              <span className="text-red-400 uppercase">
                {productToDelete.title}
              </span>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 text-xs font-bold text-gray-500 hover:text-white"
              >
                CANCELAR
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-xl text-xs uppercase transition-all shadow-lg shadow-red-900/40"
              >
                ELIMINAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
