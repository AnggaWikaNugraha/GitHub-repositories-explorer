import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  input: string;
  query: string;
}

const initialState: SearchState = {
  input: "",
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { 
    setInput, 
    setQuery,
} = searchSlice.actions;
export default searchSlice.reducer;