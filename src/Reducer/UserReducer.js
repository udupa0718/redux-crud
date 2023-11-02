import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { createUser, retriveAll, retriveSingle, updateUser, deleteUser } from '../Actions/UserAction'

// initial state
let initialState = [];

// reducer slices
const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state,action) => {
            state.push(action.payload)
        })

        .addCase(retriveAll.fulfilled, (state,action) => {
            console.log('data =', action.payload)
            return [...action.payload.users]
        })

        .addCase(retriveSingle.fulfilled, (state,action) => {})
        
        .addCase(updateUser.fulfilled, (state,action) => {
            const index = state.findIndex(item => item.id === action.payload.id)
            state[index] = {
                ...state[index],
                ...action.payload
            }
        })

        .addCase(deleteUser.fulfilled, (state,action) => {
            const index = state.findIndex(item => item._id === action.payload.id)
              state.splice(index,1)
        })
    }
})

// reducer
const UserReducer = combineReducers({
    users: userSlice.reducer
})

export default UserReducer
