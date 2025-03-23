import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { query: "", filteredResults: [] },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilteredResults: (state, action) => {
      state.filteredResults = action.payload;
    },
  },
});

export const { setSearchQuery, setFilteredResults } = searchSlice.actions;
export default searchSlice.reducer;
