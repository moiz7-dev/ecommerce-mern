import {createStore, combineReducers, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { product, productDetails} from './reducers/product';
import userReducer from './reducers/user';

const reducers = combineReducers({
    products: product,
    productDetails,
    user: userReducer
});

let initialState = {};

const middlewares = [Thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;