import { createSlice } from "@reduxjs/toolkit";
import { updateBulkProducts, updateProduct } from "./productsSlice";
import { getUpdatedPricedForInvoice } from "../utils/updateInvoice";
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

          const productIndex = invoice.items.findIndex((record) => record.itemId == updatedProduct.id);
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
              invoice.serviceTotal = parseFloat((parseFloat(invoice.serviceTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString;
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

        console.log(`bulkUpdayes inside invoice slice : payload}`, action.payload);

        if (!action.payload || !Array.isArray(action.payload)) return;

        // for easier retrival
        const productIdMapped = action.payload.reduce((accumulator, product) => {
          accumulator[product.id] = product
          return accumulator;
        }, {});


        console.log(`bulkUpdayes inside invoice slice : mapped Products}`, productIdMapped);


        state.forEach((invoice) => {
          // traverse their items and see if it matched with updated products
          invoice.items.forEach((item) => {

            console.log(`bulkUpdayes inside invoice slice : item id}`, item.itemId);
            console.log(`bulkUpdayes inside invoice slice : item}`, item);
            const updatedProduct = productIdMapped[item.itemId];
            console.log(`bulkUpdayes inside invoice slice : updatedProd}`, updatedProduct);
            // console.log(`bulkUpdayes inside invoice slice : updatedProd id : }`, );


            if (updatedProduct) {
              // means we need to  update this product

              console.log(`bulkUpdayes inside invoice slice : item product found}`, updatedProduct);
              console.log(`bulkUpdayes inside invoice slice : item id}`, item.id);
              console.log(`bulkUpdayes inside invoice slice : prod id }`, updatedProduct.id);


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
                invoice.serviceTotal = parseFloat((parseFloat(invoice.serviceTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString;
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
