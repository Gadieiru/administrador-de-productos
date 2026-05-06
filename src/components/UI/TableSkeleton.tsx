export const TableSkeleton = () => {
  return (
    <>
      {/* Usamos Array.from para evitar problemas de iteración */}
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-cyan-900/20">
          <td className="px-4 py-3 flex justify-center">
            <div className="w-8 h-8 bg-cyan-900/40 rounded shadow-inner"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-3 bg-cyan-900/40 rounded w-3/4"></div>
          </td>
          <td className="px-4 py-3 text-right">
            <div className="h-3 bg-cyan-900/40 rounded w-1/2 ml-auto"></div>
          </td>
          <td className="px-4 py-3 text-left">
            <div className="h-3 bg-cyan-900/40 rounded w-2/3"></div>
          </td>
          <td className="px-4 py-3 text-right">
            <div className="h-3 bg-cyan-900/40 rounded w-8 ml-auto"></div>
          </td>
          <td className="px-4 py-3">
            <div className="flex justify-center gap-2">
              <div className="h-4 w-4 bg-cyan-900/40 rounded"></div>
              <div className="h-4 w-4 bg-cyan-900/40 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

