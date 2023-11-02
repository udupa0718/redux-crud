import { createAsyncThunk  } from "@reduxjs/toolkit";
import UserApi from "../API/UserApi";

// create new user action
const createUser = createAsyncThunk("user/create", async(user) => {
    const res = await UserApi.create(user)
    return res.data
})
    
// read all user action
const retriveAll = createAsyncThunk("user/retrive/all", async() => {
    const res = await UserApi.readAll()
    return res.data
})

// single user action
const retriveSingle = createAsyncThunk("user/retrive/single", async (id) => {})

// update single user action
const updateUser = createAsyncThunk("user/update", async ({user,id}) => {
    const res = await UserApi.update(user,id)
    return res.data
})

// delete user action
const deleteUser = createAsyncThunk("user/delete", async (id) => {
    const res = await UserApi.delete(id);
    return { id }
})

export { createUser, retriveAll, retriveSingle, updateUser, deleteUser }