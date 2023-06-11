import { configureStore } from "@reduxjs/toolkit"
import productReducer from '../redex/slice/productSlice'
import userReducer from '../redex/slice/userSlice'

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
