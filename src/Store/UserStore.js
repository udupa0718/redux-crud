import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Reducer/UserReducer";

const DataStore = configureStore({
    reducer: UserReducer,
    devTools: true
})

export default DataStore