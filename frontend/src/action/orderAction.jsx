import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from '../slice/orderSlice'
import axios from 'axios'


export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.post(`http://localhost:4000/order/new`, order, config);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
}


export const userOrders = async (dispatch) => {
    try {
        dispatch(userOrdersRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/order/myorders/:id`,config);
        dispatch(userOrdersSuccess(data));
    } catch (error) {
        console.log(error);
        dispatch(userOrdersFail(error.response.data));
        
    }
}


export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch(orderDetailRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/order/${id}`,config);
        dispatch(orderDetailSuccess(data));
    } catch (error) {
        // console.log(error);
        dispatch(orderDetailFail(error.response.data));
        
    }
}

export const getAdminOrders = async (dispatch) => {
    try {
        dispatch(adminOrdersRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/order/allorders/:id`,config);
        dispatch(adminOrdersSuccess(data));
    } catch (error) {
        // console.log(error);
        dispatch(adminOrdersFail(error.response.data));
        
    }
}


export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.delete(`http://localhost:4000/order/delete/${id}`,config);
        dispatch(deleteOrderSuccess(data));
    } catch (error) {
        // console.log(error);
        dispatch(deleteOrderFail(error.response.data));
        
    }
}


export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:4000/order/update/${id}`, orderData, config);
        dispatch(updateOrderSuccess(data));
    } catch (error) {
        // console.log(error);
        dispatch(updateOrderFail(error.response.data));
        
    }
}