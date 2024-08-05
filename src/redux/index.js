import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import productReducer from "./productsSlice"; 
import exchangeReducer from "./exchangeSlice";


const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productReducer,
  exchange: exchangeReducer
});

export default rootReducer;