import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart';
import wishReducer from './wishlist';

export default configureStore({
	reducer : {
		cart: cartReducer,
		wishlist: wishReducer,
	},
});