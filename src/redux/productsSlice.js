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
            state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product);
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateBulkProducts: (state, action) => {
            if (!action.payload || !Array.isArray(action.payload)) return;

            action.payload.forEach((product) => {
                const existingRecordIndex = state.products.findIndex((record) => record.id === product.id);
                if (existingRecordIndex !== -1) {
                    state.products[existingRecordIndex] = product;
                } else {
                    state.products.push(product);
                }
            })
        }
    },
});


export const selectProductList = (state) => state.products;


export default productsSlice.reducer;
export const { addProduct, deleteProduct, updateProduct, updateBulkProducts } = productsSlice.actions;
