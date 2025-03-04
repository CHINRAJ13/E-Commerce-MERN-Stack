import axios from 'axios'
import { clearError, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutSuccess, registerFail, registerRequest, registerSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updateProfileClear, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../slice/authSlice"
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from '../slice/userSlice';


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        // const config = {
        //     withCredentials: true
        // }
        const { data } = await axios.post(`http://localhost:4000/users/login`, { email, password });
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data));
    }
}

export const clearAuthError = dispatch => {
    dispatch(clearError());
}


export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const config = {
            headers: {
                'Content-type': 'multipart / form-data'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`http://localhost:4000/users/register`, userData, config);
        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response.data));
        // console.log(error)
    }
}


export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/users/myprofile`, config);
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
        // console.log(error)
    }
}


export const logout = async (dispatch) => {
    try {
        const config = {
            withCredentials: true
        }
        await axios.get(`http://localhost:4000/users/logout`, config);
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data));
        // console.log(error)
    }
}


export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const config = {
            headers: {
                'Content-type': 'multipart / form-data'
            },
            withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:4000/users/myprofile/update`, userData, config);
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data));
        // console.log(error)
    }
}


export const clearProfileUpdate = dispatch => {
    dispatch(updateProfileClear());
}


export const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
            withCredentials: true
        }
        await axios.put(`http://localhost:4000/users/password/change`, userData, config);
        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data));
        // console.log(error)
    }
}


export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.post(`http://localhost:4000/users/password/forgot`, { email }, config);
        dispatch(forgotPasswordSuccess(data));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data));
        console.log(error)
    }
}

export const resetPassword = (userData, token) => async (dispatch) => {
    // console.log(userData);
    try {
        dispatch(resetPasswordRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await axios.post(`http://localhost:4000/users/password/reset/${token}`, userData, config);
        dispatch(resetPasswordSuccess(data));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data));
        console.log(error)
    }
}


export const getUsers = async (dispatch) => {
    try {
        dispatch(usersRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/users/admin/users`, config);
        dispatch(usersSuccess(data));
    } catch (error) {
        dispatch(usersFail(error.response.data.message));
        // console.log(error)
    }
}

export const getSingleUser = (userId) => async (dispatch) => {
    try {
        dispatch(userRequest());
        const config = {
            withCredentials: true
        }
        const { data } = await axios.get(`http://localhost:4000/users/admin/${userId}`, config);
        dispatch(userSuccess(data));
    } catch (error) {
        dispatch(userFail(error.response.data.message));
        // console.log(error)
    }
}


export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());
        const config = {
            withCredentials: true
        }
        await axios.delete(`http://localhost:4000/users/admin/${userId}`, config);
        dispatch(deleteUserSuccess());
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message));
        // console.log(error)
    }
}


export const updateUser = (userId, formData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());
        const config = {
            withCredentials: true
        }
        await axios.put(`http://localhost:4000/users/admin/${userId}`, formData, config);
        dispatch(updateUserSuccess());
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message));
        // console.log(error)
    }
}