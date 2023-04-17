import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState:{
        userEmail: '',
        userId:''
    },
    reducers:{
        authentification: (state, action)=>{
            state.userEmail =  action.payload.email ? action.payload.email: state.userEmail;
            state.userId = action.payload.userId;
            console.log('State athentication :', state);
        },
        signOut: (state, action)=>{
            state.userEmail = '';
            state.userId = '';
            console.log('State signOut :', state);
        }
    }
});

export const {authentification, signOut} = UserSlice.actions;
export default UserSlice.reducer;
