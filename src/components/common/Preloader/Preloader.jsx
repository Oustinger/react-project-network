import cn from 'classnames';
import React from 'react';
import preloader from '../../../assets/preloader.svg';
import s from './Preloader.module.css';

const Preloader = ({ isAllBlockSize, children }) => {
    return (
        <>
            {
                !isAllBlockSize ?
                    <div className={cn(s.preloader, 'flex-col-xc-yc')}>
                        <img className={s.preloader__img} src={preloader} />
                    </div>
                    : <div className={s.allBlockSizeContainer}>
                        <div className={cn(
                            s.preloader,
                            s.allBlockSize,
                            'flex-col-xc-yc',
                        )}>
                            <img className={s.preloader__img} src={preloader} />
                        </div>
                        {children}
                    </div>
            }
        </>
    );
};

export default Preloader;