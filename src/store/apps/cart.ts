import { Product } from '@prisma/client'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface AppAction {
    payload: Product
    type: string
}

export interface CartProduct extends Product {
    quantity: number
}

export const purchase = createAsyncThunk('appCart/purchase', async () => {
    // TODO: Call API request creating new order
    console.log('Submitting purchase request')
})

export const appCartSlice = createSlice({
    name: 'appCart',
    initialState: {
        data: [] as CartProduct[],
        total: 1,
        price: 0
    },
    reducers: {
        handleAddItem: (state, { payload }: AppAction) => {
            const product = payload

            const idx = state.data.findIndex(item => item.id === product.id)

            if (idx > -1) {
                // If item is in store, increment quantity
                state.data[idx].quantity += 1
            } else {
                // If item is not in store, create new order product
                state.data.push({ ...product, quantity: 1 })
            }

            state.total += 1
            state.price += product.price
        },
        handleRemoveItem: (state, { payload }: AppAction) => {
            const product = payload

            const idx = state.data.findIndex(item => item.id === product.id)

            if (idx > -1) {
                const item = state.data[idx]
                if (item.quantity >= 2) {
                    // If item is in store with quantity >= 2, decrement quantity
                    state.data[idx].quantity -= 1
                } else if (item.quantity === 1) {
                    // If item is in store with quantity = 1, delete order product
                    state.data = state.data.filter(element => element.id !== item.id)
                }

                state.total -= 1
                state.price -= product.price
            }

            // If item is not in store ignore
        }
    },
    extraReducers: builder => {
        builder.addCase(purchase.fulfilled, state => {
            // Reset cart when order successfully created
            state.data = []
            state.total = 0
        })
    }
})

export const { handleAddItem, handleRemoveItem } = appCartSlice.actions

export default appCartSlice.reducer
