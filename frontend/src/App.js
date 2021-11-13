import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import './App.css';
import LoginSignUp from './components/User/LoginSignUp.js';

const App = () => {

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka']
            }
        })
    }, [])

    return (
        <Router>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            
            <Route exact path="/login" component={LoginSignUp} />
            <Footer />
        </Router>
    )
}

export default App;
