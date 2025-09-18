import { createSlice } from "@reduxjs/toolkit";

const intialState = {
   theme:'light',
};

const themeSlice = createSlice({
    name:'theme',
    intialState,
    reducers:{
        toggleTheme:(state) =>{
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    }
})

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;