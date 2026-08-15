import type { Product } from "../../../entities/Product/model/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
