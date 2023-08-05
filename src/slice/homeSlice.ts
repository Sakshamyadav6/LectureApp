import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'Home',
    initialState: { value: 0 },
    reducers: {
        signin: (state) => {
            state.value+=1
        }
        
    }
})
export default homeSlice.reducer
export const {signin}=homeSlice.actions
 