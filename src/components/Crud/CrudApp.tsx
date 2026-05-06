import { CrudTable } from "./CrudTable";
import { CrudForm } from "./CrudForm";
import { SearchBar } from "../UI/SearchBar";

export const CrudApp = () => {
  return (
    <div className="min-h-screen bg-[#1a2c38] text-white p-6 font-sans">
      <header className="mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-center mb-6">
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
