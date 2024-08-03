import { createSlice } from "@reduxjs/toolkit";
import { updateProduct } from "./productsSlice";


const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const { id, updatedInvoice } = action.payload;
      const index = state.findIndex((invoice) => invoice["id"] == id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedInvoice };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct, (state, action) => {
      const updatedProduct = action.payload;
      state.forEach((invoice, index) => {

        const productIndex = invoice.items.findIndex((record) => record.itemId == updatedProduct.id);
        if (productIndex !== -1) {
          // this is to retain the quanity field which is present in items not in products
          invoice.items[productIndex] = {
            ...invoice.items[productIndex],
            itemDescription: updatedProduct.description,
            itemPrice: updatedProduct.price,
            category: updatedProduct.category,
            itemName: updatedProduct.name,
          }
        }
      })

    });
  }
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
