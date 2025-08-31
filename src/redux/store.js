import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slides/userSlide'
import productReducer from './slides/productSlide'
import orderReducer from './slides/orderSlides'
export const store = configureStore({
  reducer: {
    product: productReducer,
    user:userReducer,
    order:orderReducer
  },
})