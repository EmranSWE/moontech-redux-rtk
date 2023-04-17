import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "../feature/cart/cartSlice";
import filterSlice from "../feature/filter/filterSlice";
import logger from "redux-logger";
import productsSlice from "../feature/products/productsSlice";
import { productApi } from "../feature/api/apiSlice";

const store= configureStore({
    reducer:{
        [productApi.reducerPath]:productApi.reducer,
        cart:cartSlice,
        filter:filterSlice,
       
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat();
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(productApi.middleware),
});

export default store;