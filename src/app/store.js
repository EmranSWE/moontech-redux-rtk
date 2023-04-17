import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "../feature/cart/cartSlice";
import filterSlice from "../feature/filter/filterSlice";
import logger from "redux-logger";
import productsSlice from "../feature/products/productsSlice";
const store= configureStore({
    reducer:{
        cart:cartSlice,
        filter:filterSlice,
        products:productsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export default store;