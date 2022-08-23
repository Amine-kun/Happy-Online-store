import {createSlice} from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
	name:"wishlist",
	initialState:{
		quantity:0,
	},
	reducers:{
		addProductToWishlist: (state)=>{
			state.quantity +=1;
		},
		addCurrentWishlistProducts:(state, action)=>{
			state.quantity = action.payload.currentQuantity;
		}
	},
});

export const {addProductToWishlist, addCurrentWishlistProducts} =wishlistSlice.actions
export default wishlistSlice.reducer;