import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    isError: false,
    deleteSuccess:false,
    error: "",
};
export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();
    console.log('produtg', products)
    return products;
});
export const addProducts = createAsyncThunk("products/addProduct", async (data) => {
    console.log('prodSlice', data)
    const products = postProduct(data)
    return products;
})

export const removeProducts = createAsyncThunk("products/removeProduct", async (id,thunkAPI) => {
    const products =await deleteProduct(id);
    thunkAPI.dispatch(removeFromList(id));
    return products;
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false
        },
        removeFromList: (state,action)=>{
            state.products = state.products.filter (product => product._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        }).addCase(getProducts.rejected, (state, action) => {
            state.products = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
            .addCase(addProducts.pending, (state, action) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            }).addCase(addProducts.fulfilled, (state, action) => {
                state.postSuccess = true;
                state.isLoading = false;
            }).addCase(addProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.postSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(removeProducts.pending, (state, action) => {
                state.isLoading = true;
                state.deleteSuccess = false;
                state.isError = false;
            }).addCase(removeProducts.fulfilled, (state, action) => {
                state.deleteSuccess = true;
                state.isLoading = false;
            }).addCase(removeProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.deleteSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
    },
});

export const {togglePostSuccess,toggleDeleteSuccess,removeFromList}=productsSlice.actions;
export default productsSlice.reducer;