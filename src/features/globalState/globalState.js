import { createSlice } from "@reduxjs/toolkit";

export const globalState = createSlice({

    name: "global",
    initialState: {
        isLoading: null,
        data: [],
        isVerifycatedLink: false,
    },
    reducers: {
        setUrl: (state, action) => {
            state.data.url = action.payload
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setResult: (state, action) => {
            state.data = action.payload
        },

    },
});

export const { setUrl, setLoading, setResult } = globalState.actions;
export default globalState.reducer