import { createSlice } from "@reduxjs/toolkit";

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
      // const { id, updatedInvoice } = action.payload;
      // state  = state.map((invoice) => invoice.id === id ? {id, updatedInvoice} : invoice)
      // console.log("from slice", action.payload);


      const { id, updatedInvoice } = action.payload;

      const index = state.findIndex((invoice) => invoice["id"] == id);

      // console.log("from slice index", index);

      if (index !== -1) {
        state[index] = { ...state[index], ...updatedInvoice };
      }
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
