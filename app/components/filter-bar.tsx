"use client";
import { cn } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Filters = {
  onlyFavorites: boolean;
  selectedLetter: string | undefined;
};

type FiltersProps = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

const FilterBar = ({ filters, setFilters }: FiltersProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, onlyFavorites: event.target.checked }));
  };

  const handleSelectLetter = (letter: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedLetter: prev.selectedLetter === letter ? undefined : letter,
    }));
  };

  const hungarianAlphabet = [
    "A",
    "Á",
    "B",
    "C",
    "Cs",
    "D",
    "Dz",
    "Dzs",
    "E",
    "É",
    "F",
    "G",
    "Gy",
    "H",
    "I",
    "Í",
    "J",
    "K",
    "L",
    "Ly",
    "M",
    "N",
    "Ny",
    "O",
    "Ó",
    "Ö",
    "Ő",
    "P",
    "Q",
    "R",
    "S",
    "Sz",
    "T",
    "Ty",
    "U",
    "Ú",
    "Ü",
    "Ű",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Zs",
  ];

  return (
    <div>
      <div className="flex gap-2">
        {hungarianAlphabet.map((letter) => {
          return (
            <button
              className={cn(
                "bg-gray-200 text-gray-800 p-2 rounded-xl cursor-pointer hover:bg-gray-400 hover:text-gray-900",
                filters.selectedLetter === letter
                  ? "border-gray-800 border-2 rounded-xl p-2 bg-gray-400"
                  : ""
              )}
              key={letter}
              onClick={() => handleSelectLetter(letter)}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <fieldset>
        <div>
          <input type="checkbox" placeholder="Search" onChange={handleChange} />
          <label>Only favorites</label>
        </div>
      </fieldset>
    </div>
  );
};

export default FilterBar;
