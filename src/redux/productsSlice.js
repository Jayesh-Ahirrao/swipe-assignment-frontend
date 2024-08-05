import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from '../data/products';

const initialState = {
    products: dummyProducts,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            const { product } = action.payload;
            state.products = state.products.map((record) => record.id === product.id ? product : record);
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateBulkProducts: (state, action) => {
            // build addition of products which can include both new and existing-updated-products
            if (!action.payload || !Array.isArray(action.payload.bulkUpdatingProducts)) return;
            const { bulkUpdatingProducts } = action.payload;
            bulkUpdatingProducts.forEach((product) => {
                const existingRecordIndex = state.products.findIndex((record) => record.id === product.id);
                if (existingRecordIndex !== -1) {
                    // if product already exists then update it 
                    state.products[existingRecordIndex] = product;
                } else {
                    // otherwise insert new record 
                    state.products.push(product);
                }
            })
        }
    },
});


export const selectProductList = (state) => state.products;


export default productsSlice.reducer;
export const { addProduct, deleteProduct, updateProduct, updateBulkProducts } = productsSlice.actions;
