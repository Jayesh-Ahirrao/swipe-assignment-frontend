import { createSlice } from "@reduxjs/toolkit";
import { updateBulkProducts, updateProduct } from "./productsSlice";
import { CATEGORIES } from "../constants/categories";


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
    builder
      .addCase(updateProduct, (state, action) => {
        const updatedProduct = action.payload;
        state.forEach((invoice, index) => {

          const productIndex = invoice.items.findIndex((record) => record.itemId === updatedProduct.id);
          if (productIndex !== -1) {

            const itemInsideInvoice = invoice.items[productIndex];
            const prevItemCost = parseFloat(itemInsideInvoice.itemPrice).toFixed(2) * parseInt(itemInsideInvoice.itemQuantity, 10);

            // this is to retain the quanity field which is present in items not in products
            invoice.items[productIndex] = {
              ...invoice.items[productIndex],
              itemDescription: updatedProduct.description,
              itemPrice: updatedProduct.price,
              category: updatedProduct.category,
              itemName: updatedProduct.name,
            }

            // only if product found update invoice based on new values
            // calculate data for curr item
            const currItemCost = parseFloat(invoice.items[productIndex].itemPrice).toFixed(2) * parseInt(itemInsideInvoice.itemQuantity, 10);

            invoice.subTotal = parseFloat((parseFloat(invoice.subTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString(); //before tax and discounts

            if (updatedProduct.category === CATEGORIES.GOODS) {
              invoice.goodsTotal = parseFloat((parseFloat(invoice.goodsTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString();
            } else {
              invoice.serviceTotal = parseFloat((parseFloat(invoice.serviceTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString();
            }

            let taxRate = parseFloat(invoice.taxRate) || 0;
            let discountRate = parseFloat(invoice.discountRate) || 0;

            invoice.taxAmount = (parseFloat(invoice.subTotal) * (taxRate / 100)).toFixed(2).toString();
            invoice.discountAmount = (parseFloat(invoice.subTotal) * (discountRate / 100)).toFixed(2).toString();

            invoice.total = (parseFloat(invoice.subTotal) - parseFloat(invoice.discountAmount) + parseFloat(invoice.taxAmount)).toFixed(2).toString();
          }
        })
      })
      .addCase(updateBulkProducts, (state, action) => {
        if (!action.payload || !Array.isArray(action.payload)) return;

        // for easier retrival
        const productIdMapped = action.payload.reduce((accumulator, product) => {
          accumulator[product.id] = product
          return accumulator;
        }, {});

        state.forEach((invoice) => {
          // traverse their items and see if it matched with updated products
          invoice.items.forEach((item) => {
            const updatedProduct = productIdMapped[item.itemId];


            if (updatedProduct) {
              // means we need to  update this product
              const prevItemCost = parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity, 10);


              item.itemDescription = updatedProduct.description;
              item.itemPrice = updatedProduct.price;
              item.category = updatedProduct.category;
              item.itemName = updatedProduct.name;

              const currItemCost = parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity, 10);

              invoice.subTotal = parseFloat((parseFloat(invoice.subTotal) || 0) + currItemCost - prevItemCost).toFixed(2);
              if (updatedProduct.category === CATEGORIES.GOODS) {
                invoice.goodsTotal = parseFloat((parseFloat(invoice.goodsTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString();
              } else {
                invoice.serviceTotal = parseFloat((parseFloat(invoice.serviceTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString();
              }

              let taxRate = parseFloat(invoice.taxRate) || 0;
              let discountRate = parseFloat(invoice.discountRate) || 0;

              invoice.taxAmount = (parseFloat(invoice.subTotal) * (taxRate / 100)).toFixed(2).toString();
              invoice.discountAmount = (parseFloat(invoice.subTotal) * (discountRate / 100)).toFixed(2).toString();

              invoice.total = (parseFloat(invoice.subTotal) - parseFloat(invoice.discountAmount) + parseFloat(invoice.taxAmount)).toFixed(2).toString();
            }
          })

        });

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
