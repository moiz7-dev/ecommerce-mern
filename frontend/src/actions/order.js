import axios from 'axios';

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_FAIL,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/order";

export const createOrder = (order) => async (dispatch) => {
    try{
        dispatch({type: CREATE_ORDER_REQUEST});

        const {data} = await axios.post('/api/v1/order/new', order);

        dispatch({type: CREATE_ORDER_SUCCESS, payload: data});
    } catch(error) {
        dispatch({type: CREATE_ORDER_FAIL, payload: error.response.data.message})
    }
}

export const myOrders = () => async (dispatch) => {
    try{
        dispatch({type: MY_ORDERS_REQUEST});

        const {data} = await axios.get('/api/v1/orders/me');

        dispatch({type: MY_ORDERS_SUCCESS, payload: data.orders});
    } catch(error) {
        dispatch({type: MY_ORDERS_FAIL, payload: error.response.data.message})
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: ORDER_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/order/${id}`);

        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.order});
    } catch(error) {
        console.log(error.response.data.message)
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.response.data.message})
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}