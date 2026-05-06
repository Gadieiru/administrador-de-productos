import React from "react";
import Select, { type SingleValue } from "react-select";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

type SelectOption = {
  value: string;
  label: string;
};

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  

  const { data: listaCategorias } = useCategories();

  const selectOptions: SelectOption[] =
    listaCategorias?.map((c) => ({
      value: c.slug,
      label: c.name,
    })) || [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text) searchParams.set("q", text);
    else searchParams.delete("q");
    setSearchParams(searchParams);
  };

  const SelectValue = selectOptions.find((opt) => opt.value === category);

  const handleSelectChange = (newValue: SingleValue<SelectOption>) => {
    if (newValue) {
      searchParams.set("category", newValue.value);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

const customStyles = {
  // Contenedor principal
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "#162a37",
    borderColor: state.isFocused ? "#0891b2" : "#164e63", // Cian cuando está activo
    color: "#22d3ee",
    minHeight: "38px",
    boxShadow: state.isFocused ? "0 0 0 1px #0891b2" : "none",
    "&:hover": {
      borderColor: "#0891b2",
    },
  }),
  // El texto que el usuario ve escrito
  singleValue: (base: any) => ({
    ...base,
    color: "#22d3ee", // Texto color cian
  }),
  // El menú desplegable
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#162a37",
    border: "1px solid #164e63",
  }),
  // Las opciones dentro del menú
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? "#0891b2" 
      : state.isFocused 
      ? "#1e3a4d" 
      : "#162a37",
    color: state.isSelected ? "white" : "#22d3ee",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#0891b2",
    },
  }),
  // El placeholder y los iconos
  placeholder: (base: any) => ({
    ...base,
    color: "#164e63",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#164e63",
    "&:hover": { color: "#22d3ee" },
  }),
  clearIndicator: (base: any) => ({
    ...base,
    color: "#164e63",
    "&:hover": { color: "#ef4444" },
  }),
};

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar productos"
        />
      </div>

      <div>
        <span className="font-semibold uppercase text-xs">Filtros:</span>
        <div className="w-64">
          <Select
            options={selectOptions}
            value={SelectValue}
            onChange={handleSelectChange}
            styles={customStyles}
            isClearable
            placeholder="Categorias"
          />
        </div>
      </div>
    </div>
  );
};
