import { configureStore } from "@reduxjs/toolkit"; 
import  signin  from "../slice/signinSlice";

export const store = configureStore({
    reducer: {
        signin:signin
    },
})