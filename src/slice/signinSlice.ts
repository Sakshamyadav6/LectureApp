import { createSlice } from '@reduxjs/toolkit'

const signinSlice = createSlice({
    name: 'Home',
    initialState: {
        isLoggedin: false,
        jwt:''
    },
    reducers: {
        signin: (state) => {
            
        }
        
    }
})
export default signinSlice.reducer
export const {signin}=signinSlice.actions
 