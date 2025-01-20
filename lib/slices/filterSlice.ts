// import type { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum HungarianAlphabet {
  A = "A",
  Á = "Á",
  B = "B",
  C = "C",
  Cs = "Cs",
  D = "D",
  Dz = "Dz",
  Dzs = "Dzs",
  E = "E",
  É = "É",
  F = "F",
  G = "G",
  Gy = "Gy",
  H = "H",
  I = "I",
  Í = "Í",
  J = "J",
  K = "K",
  L = "L",
  Ly = "Ly",
  M = "M",
  N = "N",
  Ny = "Ny",
  O = "O",
  Ó = "Ó",
  Ö = "Ö",
  Ő = "Ő",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  Sz = "Sz",
  T = "T",
  Ty = "Ty",
  U = "U",
  Ú = "Ú",
  Ü = "Ü",
  Ű = "Ű",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
  Zs = "Zs",
}

// Define a type for the slice state
interface FilterState {
  onlyFavorites: boolean;
  selectedLetters: HungarianAlphabet[];
}

// Define the initial state using that type
const initialState: FilterState = {
  onlyFavorites: false,
  selectedLetters: [HungarianAlphabet.A],
};

export const filterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleOnlyFavoriteFilter: (state) => {
      state.onlyFavorites = !state.onlyFavorites;
    },
    addLetterToFilter: (state, action: PayloadAction<HungarianAlphabet>) => {
      state.selectedLetters.push(action.payload);
    },
    removeLetterFromFilter: (
      state,
      action: PayloadAction<HungarianAlphabet>
    ) => {
      state.selectedLetters = state.selectedLetters.filter(
        (letter) => letter !== action.payload
      );
    },
  },
});

export const {
  toggleOnlyFavoriteFilter,
  addLetterToFilter,
  removeLetterFromFilter,
} = filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default filterSlice.reducer;
