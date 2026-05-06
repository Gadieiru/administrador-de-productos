export const TableSkeleton = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-cyan-900/20">
          <td className="px-2 py-3 flex justify-center">
            <div className="w-8 h-8 bg-cyan-900/40 rounded shadow-inner"></div>
          </td>
          <td className="px-2 py-3">
            <div className="h-3 bg-cyan-900/40 rounded w-3/4"></div>
          </td>
          <td className="px-2 py-3">
            <div className="h-3 bg-cyan-900/40 rounded w-1/2"></div>
          </td>
          <td className="px-2 py-3">
            <div className="h-3 bg-cyan-900/40 rounded w-2/3"></div>
          </td>
          <td className="px-2 py-3">
            <div className="h-3 bg-cyan-900/40 rounded w-8 mx-auto"></div>
          </td>
          <td className="px-2 py-3">
            <div className="flex justify-center gap-2">
              <div className="h-4 w-4 bg-cyan-900/40 rounded"></div>
              <div className="h-4 w-4 bg-cyan-900/40 rounded"></div>
            </div>
          </td>
        </tr>
      ))};
    </>
  );
};
