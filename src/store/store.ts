import { configureStore } from "@reduxjs/toolkit"; 
import  signin  from "../slice/homeslice";

export const store = configureStore({
    reducer: {
        home:signin
    },
})