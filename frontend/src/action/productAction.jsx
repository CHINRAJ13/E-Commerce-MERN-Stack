import axios from 'axios'
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from '../slice/productSlice'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../slice/productsSlice'

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch(productRequest());
        const { data } = await axios.get(`http://localhost:4000/product/${id}`);
        dispatch(productSuccess(data));
    } catch (error) {
        dispatch(productFail(error.response.data));
    }
}



export const getProducts = (keyword, currentPage, category) => async (dispatch) => {
    try {
        dispatch(productsRequest());

        let link = `http://localhost:4000/product?page=${currentPage}`;

        if (keyword) {
            link += `&keyword=${keyword}`;
        }

        if (category) {
            link += `&category=${category}`;
        }

        // console.log(link);

        const { data } = await axios.get(link);
        dispatch(productsSuccess(data));
    } catch (error) {
        dispatch(productsFail(error.response.data));
    }
}


export const createReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(createReviewRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:4000/product/reviews/:id`, reviewData, config);
        dispatch(createReviewSuccess(data));
    } catch (error) {
        dispatch(createReviewFail(error.response.data));
    }
}


export const getAdminProducts = async (dispatch) => {
    try {
        dispatch(adminProductsRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/product/admin/products`, config);
        dispatch(adminProductsSuccess(data));
    } catch (error) {
        dispatch(adminProductsFail(error.response.data))
        // console.log(error)
    }
}


export const createNewProducts = (product) => async (dispatch) => {
    try {
        dispatch(newProductRequest());
        const config = {
            headers: {
                'Content-type': 'multipart / form-data'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`http://localhost:4000/product/new`, product, config);
        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductFail(error.response.data.error));
        // console.log(error.response.data.error)
    }
}


export const deleteProducts = (id) => async (dispatch) => {
    try {
        dispatch(deleteProductRequest());
        const config = {
            withCredentials: true
        }
        await axios.delete(`http://localhost:4000/product/${id}`, config);
        dispatch(deleteProductSuccess());
    } catch (error) {
        dispatch(deleteProductFail(error.response.data.error));
        console.log(error.response.data)
    }
}


export const updateProducts = (id, productData) => async (dispatch) => {
    try {
        dispatch(updateProductRequest());
        const config = {
            headers: {
                'Content-type': 'multipart / form-data'
            },
            withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:4000/product/${id}`, productData, config);
        dispatch(updateProductSuccess(data));
    } catch (error) {
        dispatch(updateProductFail(error.response.data.error));
        // console.log(error.response.data.error)
    }
}


export const getReviews = (prodId) => async (dispatch) => {
    try {
        dispatch(reviewsRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/product/reviews/${prodId}`, config);
        dispatch(reviewsSuccess(data));
    } catch (error) {
        dispatch(reviewsFail(error.response.data.error));
        // console.log(error.response.data.error)
    }
}

export const deleteReview = (prodId, id) => async (dispatch) => {
    try {
        dispatch(deleteReviewRequest());
        const config = {
            withCredentials: true,
            params :{ id}
        }
        const { data } = await axios.delete(`http://localhost:4000/product/reviews/${prodId}`, config);
        dispatch(deleteReviewSuccess(data));
    } catch (error) {
        dispatch(deleteReviewFail(error.response.data.error));
        // console.log(error.response.data.error)
    }
}