import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import './App.css';

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
            <Footer />
        </Router>
    )
}

export default App;
