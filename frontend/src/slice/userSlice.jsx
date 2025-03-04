import { createSlice } from "@reduxjs/toolkit";


const userSlice =  createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {},
        users: [],
        isUserUpdated: false,
        isUserDeleted: false,
    },
    reducers: {
        usersRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        usersSuccess(state, action){
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            }
        },
        usersFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        userRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        userSuccess(state, action){
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            }
        },
        userFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        deleteUserRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        deleteUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isUserDeleted: true,
            }
        },
        deleteUserFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        updateUserRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        updateUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isUserUpdated: true,
            }
        },
        updateUserFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        clearUserError(state, action){
            return {
                ...state,
                error: null
            }
        },
        clearUserUpdated(state, action){
            return {
                ...state,
                isUserUpdated: false,
            }
        },
        clearUserDeleted(state, action){
            return {
                ...state,
                isUserDeleted: false,
            }
        },
    }
});

const { actions, reducer } = userSlice;

export const {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    clearUserError,
    clearUserUpdated,
    clearUserDeleted
} = actions;

export default reducer;