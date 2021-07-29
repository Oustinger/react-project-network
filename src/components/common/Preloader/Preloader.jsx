import cn from 'classnames';
import React from 'react';
import preloader from '../../../assets/preloader.svg';
import s from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={cn(s.preloader, 'flex-col-xc-yc')}>
            <img className={s.preloader__img} src={preloader} />
        </div>
    );
};

export default Preloader;