import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlicer from "../auth/authSlice";
import productSlicer from '../auth/productSlice';

const rootReducers = combineReducers({
    authReducer : authSlicer,
    productReducer: productSlicer
});
export const store = configureStore({
    reducer: rootReducers,

});