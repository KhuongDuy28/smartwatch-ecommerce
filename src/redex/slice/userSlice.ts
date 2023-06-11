import { Dispatch, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    users: []
}

const callAPIUsers : any = async (dispatch: Dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3005/users`)
        dispatch(getAPIUsersAction(res.data)) 
    } catch (error) {
        throw new Error("Dax xay ra loi roi")
    }
}

const registerUser : any = (data: any) => async (dispatch: Dispatch) => {
    console.log(data);
    try {
        await axios.post(`http://localhost:3005/users`, data)
        .then(() => {
            dispatch(registerUserAction(data))
        })
    } catch (error) {
        throw new Error("Dax xay ra loi roi")
        
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUserAction: (state: any, action) => {
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        },
        getAPIUsersAction: (state, action) => {
            return {
                ...state,
                users: action.payload
            }
        }
    }
})

export default userSlice.reducer
export const {registerUserAction, getAPIUsersAction} = userSlice.actions
export {registerUser, callAPIUsers}