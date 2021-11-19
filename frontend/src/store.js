import {createStore, combineReducers, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { product, productDetails} from './reducers/product';
import userReducer from './reducers/user';
import {updateProfile, forgotPassword} from './reducers/updateUser';
import {cartReducer} from './reducers/cart';

const reducers = combineReducers({
    products: product,
    productDetails,
    user: userReducer,
    profile: updateProfile,
    forgotPassword,
    cart: cartReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
};

const middlewares = [Thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;