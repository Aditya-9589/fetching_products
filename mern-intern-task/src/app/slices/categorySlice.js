import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    selected: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    selectCategory: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setCategories, selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
