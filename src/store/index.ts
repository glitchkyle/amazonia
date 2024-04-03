// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import Cart from 'src/store/apps/cart'

export const store = configureStore({
    reducer: {
        Cart
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
