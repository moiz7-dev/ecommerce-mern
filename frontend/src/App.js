import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

const App = () => {

    const {isAuthenticated, user } = useSelector(state => state.user)

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka']
            }
        });

        store.dispatch(loadUser());
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

            <Route exact path="/login" component={LoginSignUp} />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route exact path="/password/reset/:token" component={ResetPassword} />
            <Footer />
        </Router>
    )
}

export default App;
