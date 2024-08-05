import { createSlice } from "@reduxjs/toolkit";
import { updateBulkProducts, updateProduct } from "./productsSlice";
import { CATEGORIES } from "../constants/categories";
import { BASE_CURRENCY, BITCOIN_CURRENCY, DECIMAL_PLACES } from "../constants/currencies";



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

        const { product, exchangeRates } = action.payload;

        state.forEach((invoice, index) => {
          const productIndex = invoice.items.findIndex((record) => record.itemId === product.id);
          if (productIndex !== -1) {
            let currencyMultiplier = 1;
            let currencySymbol = invoice.currency.split(" ")[1];
            let dec_places = currencySymbol === BITCOIN_CURRENCY ? DECIMAL_PLACES.BITCOIN : DECIMAL_PLACES.CURRENCIES;

            if (invoice.currency !== BASE_CURRENCY) {
              currencyMultiplier = exchangeRates[currencySymbol];
            }

            const itemInsideInvoice = invoice.items[productIndex];
            const prevItemCost = parseFloat(itemInsideInvoice.itemPrice) * parseInt(itemInsideInvoice.itemQuantity, 10);

            

            // only if product found update invoice based on new values
            // calculate data for curr item
            const currItemCost = parseFloat(product.price) * parseInt(itemInsideInvoice.itemQuantity, 10) * currencyMultiplier;

            // this is to retain the quanity field which is present in items not in products
            // TODO: this should be done after calculations

            console.log('currencyMultiplier:', currencyMultiplier);
            console.log('currency:', invoice.currency);
            console.log('product.price:', product.price);
            console.log('prevItemCost:', prevItemCost);
            console.log('currItemCost:', currItemCost);



            invoice.items[productIndex] = {
              ...invoice.items[productIndex],
              itemDescription: product.description,
              itemPrice: (currItemCost).toFixed(dec_places),
              category: product.category,
              itemName: product.name,
            }

            invoice.subTotal = ((parseFloat(invoice.subTotal) || 0) + currItemCost - prevItemCost).toFixed(dec_places); //before tax and discounts

            if (product.category === CATEGORIES.GOODS) {
              invoice.goodsTotal = ((parseFloat(invoice.goodsTotal) || 0) + currItemCost - prevItemCost).toFixed(dec_places);
            } else {
              invoice.serviceTotal = ((parseFloat(invoice.serviceTotal) || 0) + currItemCost - prevItemCost).toFixed(dec_places);
            }

            let taxRate = parseFloat(invoice.taxRate) || 0;
            let discountRate = parseFloat(invoice.discountRate) || 0;

            invoice.taxAmount = ((invoice.subTotal) * (taxRate / 100)).toFixed(dec_places);
            invoice.discountAmount = ((invoice.subTotal) * (discountRate / 100)).toFixed(dec_places)

            invoice.total = (parseFloat(invoice.subTotal) - parseFloat(invoice.discountAmount) + parseFloat(invoice.taxAmount)).toFixed(dec_places);
          }
        })
      })


      // .addCase(updateBulkProducts, (state, action) => {
      //   if (!action.payload || !Array.isArray(action.payload)) return;

      //   // for easier retrival
      //   const productIdMapped = action.payload.reduce((accumulator, product) => {
      //     accumulator[product.id] = product
      //     return accumulator;
      //   }, {});

      //   state.forEach((invoice) => {
      //     // traverse their items and see if it matched with updated products
      //     const dec_places = invoice.currency.split(' ')[1] === BITCOIN_CURRENCY ? DECIMAL_PLACES.BITCOIN : DECIMAL_PLACES.CURRENCIES;

      //     invoice.items.forEach((item) => {
      //       const updatedProduct = productIdMapped[item.itemId];


      //       if (updatedProduct) {
      //         // means we need to  update this product
      //         const prevItemCost = parseFloat(item.itemPrice) * parseInt(item.itemQuantity, 10);


      //         item.itemDescription = updatedProduct.description;
      //         item.itemPrice = updatedProduct.price;
      //         item.category = updatedProduct.category;
      //         item.itemName = updatedProduct.name;

      //         const currItemCost = parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity, 10);

      //         invoice.subTotal = parseFloat((parseFloat(invoice.subTotal) || 0) + currItemCost - prevItemCost).toFixed(2);
      //         if (updatedProduct.category === CATEGORIES.GOODS) {
      //           invoice.goodsTotal = parseFloat((parseFloat(invoice.goodsTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString();
      //         } else {
      //           invoice.serviceTotal = parseFloat((parseFloat(invoice.serviceTotal) || 0) + currItemCost - prevItemCost).toFixed(2).toString();
      //         }

      //         let taxRate = parseFloat(invoice.taxRate) || 0;
      //         let discountRate = parseFloat(invoice.discountRate) || 0;

      //         invoice.taxAmount = (parseFloat(invoice.subTotal) * (taxRate / 100)).toFixed(2).toString();
      //         invoice.discountAmount = (parseFloat(invoice.subTotal) * (discountRate / 100)).toFixed(2).toString();

      //         invoice.total = (parseFloat(invoice.subTotal) - parseFloat(invoice.discountAmount) + parseFloat(invoice.taxAmount)).toFixed(2).toString();
      //       }
      //     })

      //   });

      // });
  }
});



export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
