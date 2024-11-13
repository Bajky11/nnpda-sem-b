import {configureStore} from "@reduxjs/toolkit";
import {devicesSlice} from "@/utils/redux/slices";

export const store = configureStore({
    reducer: {
        devices: devicesSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;