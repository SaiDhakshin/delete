import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;

            if(item.quantity <= 0) {
                cartSlice.caseReducers.deleteItem(state, action);
            }
        },
        clearCart(state, action) {
            state.cart = [];
        }
    }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export function getTotalCartQty(state) {
    return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
}

export const getCart = state => state.cart.cart;

export function getTotalCartPrice(state) {
    return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
}

export const getCurrentQuantityById = (id) => (state) =>{
    const item = state.cart.cart.find(item => item.pizzaId === id);
    return item ? item.quantity : 0;
}