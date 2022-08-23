import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name:"cart",
	initialState:{
		quantity:0,
	},
	reducers:{
		addProduct: (state)=>{
			state.quantity +=1;
		},
		addCurrentCartProducts:(state, action)=>{
			state.quantity = action.payload.currentQuantity;
		}
	},
});

export const {addProduct, addCurrentCartProducts} = cartSlice.actions
export default cartSlice.reducer;