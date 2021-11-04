import { BrowserRouter as Router, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect } from 'react';

import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
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
            <Footer />
        </Router>
    )
}

export default App;