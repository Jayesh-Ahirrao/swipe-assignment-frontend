import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from '../data/products';

const initialState = {
    products: dummyProducts,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            // testing 
            state.products.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product);
        },
    },
});


export const selectProductList = (state) => state.products;


export default productsSlice.reducer;
export const {addProduct, deleteProduct, updateProduct} = productsSlice.actions;
