import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'
import userReducer from './slides/userSlide'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer
  },
})