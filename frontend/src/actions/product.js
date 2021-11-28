import axios from 'axios';

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
  CLEAR_ERRORS,
} from "../constants/product";

export const getProduct = (keyword='', currentPage=1, price=[0, 25000], category, ratings=0) => async (dispatch) => {
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `${link}&category=${category}`;
        }

        const {data} = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//get product lists (admin)
export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get('/api/v1/admin/products');

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// create new product (admin)
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST});

        const {data} = await axios.post(`/api/v1/admin/product/new`, productData);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// delete product (admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST});

        const {data} = await axios.put(`/api/v1/review`, reviewData);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}