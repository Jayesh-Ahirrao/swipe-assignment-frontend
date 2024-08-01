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
        }
    },
});


export default productsSlice.reducer;
export const {addProduct} = productsSlice.actions;
