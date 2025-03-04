import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducer from './slice/productsSlice'
import productReducer from './slice/productSlice'
import authReducer from './slice/authSlice'
import cartReducer from './slice/cartSlice'
import orderReducer from './slice/orderSlice'
import userReducer from './slice/userSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer
})

const store = configureStore({
    reducer
})

export default store;