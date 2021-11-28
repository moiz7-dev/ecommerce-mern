import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/layout/Header/Header.js';
import UserOptions from './components/layout/Header/UserOptions.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import './App.css';
import LoginSignUp from './components/User/LoginSignUp.js';
import store from './store';
import { loadUser} from './actions/user';
import Profile from './components/User/Profile.js';
import ProtectedRoute from './components/Route/ProtectedRoute.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import Payment from './components/Cart/Payment.js';
import OrderSuccess from './components/Cart/OrderSuccess.js';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import MyOrders from './components/Cart/MyOrders.js';
import OrderDetails from './components/Cart/OrderDetails.js';
import Dashboard from './components/Admin/Dashboard.js';
import ProductsList from './components/Admin/ProductsList.js';
import NewProduct from './components/Admin/NewProduct.js';

const App = () => {

    const {isAuthenticated, user } = useSelector(state => state.user)

    const [stripeApiKey, setStripeApiKey] = useState('');

    async function getStripeApiKey() {
        const {data} = await axios.get('/api/v1/stripeapikey');

        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka']
            }
        });

        store.dispatch(loadUser());
        getStripeApiKey();
    }, [])

    return (
        <Router>
            <Header />

            {isAuthenticated && <UserOptions user={user} />}
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            <Route exact path="/cart" component={Cart} />
            
            <ProtectedRoute exact path="/account" component={Profile} />
            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
            <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
            <ProtectedRoute exact path="/shipping" component={Shipping} />

            {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute exact path="/process/payment" component={Payment} />
                </Elements>
            )}
            <ProtectedRoute exact path="/success" component={OrderSuccess} />
            <ProtectedRoute exact path="/orders" component={MyOrders} />

            <Switch>
                <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
                <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
            </Switch>

            <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
            <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductsList} />
            <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />

            <Route exact path="/login" component={LoginSignUp} />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route exact path="/password/reset/:token" component={ResetPassword} />
            <Footer />
        </Router>
    )
}

export default App;
