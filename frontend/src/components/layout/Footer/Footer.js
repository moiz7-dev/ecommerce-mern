import React from 'react'
import playStore from '../../../images/playStore.png';
import appStore from '../../../images/appStore.png';

import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download app for android and iOS phones.</p> 
                <img src={playStore} alt="PlayStore" />
                <img src={appStore} alt="AppStore" />
            </div>
        
            <div className="midFooter">
                <h1>MR-Ecommerce</h1>
                <p>Moiz Ratlamwala's Ecommerce Demo MERN App.</p>
                <p>Copyrights 2021 &copy; MR-ecommerce.</p>
                <p></p>
            </div>
        
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/moiz_ratlam77" rel="noreferrer" target="_blank">Instgram</a>
                <a href="http://youtube.com" rel="noreferrer" target="_blank">Youtube</a>
                <a href="http://twitter.com" rel="noreferrer" target="_blank">Twitter</a>
            </div>
        </footer>
    )
}

export default Footer;