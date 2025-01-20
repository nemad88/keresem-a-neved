"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addLetterToFilter,
  HungarianAlphabet,
  removeLetterFromFilter,
} from "@/lib/slices/filterSlice";
import { cn } from "@/lib/utils";

const FilterBar = () => {
  const selectedLetters = useAppSelector(
    (state) => state.filter.selectedLetters
  );

  const dispatch = useAppDispatch();

  const handleSelectLetter = (letter: HungarianAlphabet) => {
    if (selectedLetters.includes(letter)) {
      dispatch(removeLetterFromFilter(letter));
    } else {
      dispatch(addLetterToFilter(letter));
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {Object.values(HungarianAlphabet).map((letter) => {
          return (
            <button
              className={cn(
                "bg-gray-200 text-gray-800 p-2 rounded-xl cursor-pointer hover:border border-black",
                selectedLetters.includes(letter as HungarianAlphabet)
                  ? "bg-blue-200 text-blue-800"
                  : ""
              )}
              key={letter}
              onClick={() => handleSelectLetter(letter as HungarianAlphabet)}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
