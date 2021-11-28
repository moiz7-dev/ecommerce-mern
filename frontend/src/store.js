import {createStore, combineReducers, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productsReducer, productReducer, productDetails, newReviewReducer, newProductReducer } from './reducers/product';
import userReducer from './reducers/user';
import {updateProfile, forgotPassword} from './reducers/updateUser';
import {cartReducer} from './reducers/cart';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/order';

const reducers = combineReducers({
    products: productsReducer,
    productDetails,
    user: userReducer,
    profile: updateProfile,
    forgotPassword,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProductReducer: newProductReducer,
    product: productReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    }
};

const middlewares = [Thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;