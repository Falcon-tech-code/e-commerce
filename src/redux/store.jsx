import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../redux/slices/appSlice'
import productReducers from '../redux/slices/productSlice'
import basketReducer from '../redux/slices/basketSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        product: productReducers,
        basket: basketReducer
    }
})