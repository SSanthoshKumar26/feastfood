import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
    return (
        <div className="app-download" id="app-download">
            <p>For Better Experience, Download <br /> Feast Spot</p>

            <div className="app-download-platforms">
                <img src={assets.play_store} alt="Download on Google Play" />
                <img src={assets.app_store} alt="Download on the App Store" />
            </div>
        </div>
    );
}

export default AppDownload;
