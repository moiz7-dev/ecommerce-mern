import {createStore, combineReducers, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productsReducer, productReducer, productDetails, newReviewReducer, newProductReducer, reviewReducer, productReviewsReducer } from './reducers/product';
import userReducer from './reducers/user';
import {profileReducer, forgotPassword, allUsersReducer} from './reducers/updateUser';
import {cartReducer} from './reducers/cart';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer, updateOrderReducer, deleteOrderReducer } from './reducers/order';

const reducers = combineReducers({
    products: productsReducer,
    productDetails,
    user: userReducer,
    profile: profileReducer,
    forgotPassword,
    cart: cartReducer,
    newOrder: newOrderReducer,
    allOrders: ordersReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    updateOrder: updateOrderReducer,
    deleteOrder: deleteOrderReducer,
    newReview: newReviewReducer,
    review: reviewReducer,
    productReviews: productReviewsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allUsers: allUsersReducer,
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