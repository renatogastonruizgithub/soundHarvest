import { createSlice } from "@reduxjs/toolkit";

export const globalState = createSlice({

    name: "global",
    initialState: {
        isLoading: null,
        data: [],
        isVerifycatedLink: false,
        url: "",
        isAudioDownload: false,
        isVideoDownload: false,
        dataChoose: [],
    },
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload
        },
        clearUrl: (state, action) => {
            state.url = ""
        },
        clearData: (state, action) => {
            state.data = []
            state.dataChoose = []
            state.isAudioDownload = false
            state.isVideoDownload = false
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setResult: (state, action) => {
            state.data = action.payload
        },
        chooseDownload: (state, action) => {
            state.dataChoose = state.data.filter((data) => data.url === action.payload)

        },
        setAudioDownload: (state, action) => {
            state.isAudioDownload = action.payload
        },
        setVideoDownload: (state, action) => {
            state.isVideoDownload = action.payload
        },
    },
});

export const { setUrl, setLoading, clearData,
    setResult, clearUrl, chooseDownload, setAudioDownload, setVideoDownload } = globalState.actions;
export default globalState.reducer