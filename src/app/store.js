import { configureStore } from "@reduxjs/toolkit"
import globalState from "../features/globalState/globalState"

/* const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["project", "gallery", "company", "publication"]
};


const persistReducers = persistReducer(persistConfig, combineReducers({
    auth: authSlice,
    global: globalState,
    project: projectSlice,
    employee: employeeSlice,
    gallery: gallerySlice,
    company: companySlice,
    publication: publicationSlice
})); */

export const store = configureStore({
    reducer: {
        global: globalState,
    },

    //soluciona error de A non-serializable value was detected in an action
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            ignoredActions: []
        })
}
)

/* export const persistor = persistStore(store); */