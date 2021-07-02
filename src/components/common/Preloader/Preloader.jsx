import React from 'react';
import s from './Preloader.module.css';
import preloader from '../../../assets/preloader.gif';

const Preloader = () => {
    return (
        <div>
            <img src={preloader} />
        </div>
    );
};

export default Preloader;