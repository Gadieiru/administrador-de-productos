import { CrudTable } from "./CrudTable";
import { CrudForm } from "./CrudForm";
import { SearchBar } from "../UI/SearchBar";

export const CrudApp = () => {
  return (
    <div className="min-h-screen bg-[#1a2c38] text-white p-6 font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-center mb-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Administrador de productos
        </h1>
        <div className="bg-[#1e3a4d] p-4 rounded-lg shadow-lg border border-cyan-900/50">
          <SearchBar />
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 overflow-x-auto bg-[#1e3a4d] rounded-lg p-4 border border-cyan-900/50">
          <CrudTable />
        </div>
        <div className="w-full lg:w-80 bg-[#1e3a4d] p-6 rounded-lg border border-cyan-900/50 h-fit">
          <CrudForm />
        </div>
      </main>
    </div>
  );
};
