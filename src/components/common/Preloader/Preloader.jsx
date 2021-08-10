import cn from 'classnames';
import preloader from '../../../assets/preloader.svg';
import s from './Preloader.module.css';

const Preloader = ({ isAllBlockSize, children, position }) => {
    const classNames = cn(
        s.preloader,
        'flex-col-xc-yc',
        { [s.allBlockSize]: isAllBlockSize },
        { [s[`position-${position}`]]: isAllBlockSize },
    );

    return (
        <>
            {
                !isAllBlockSize ?
                    <div className={classNames}>
                        <img className={s.preloader__img} src={preloader} />
                    </div>
                    : <div className={s.allBlockSizeContainer}>
                        <div className={classNames}>
                            <img className={s.preloader__img} src={preloader} />
                        </div>
                        {children}
                    </div>
            }
        </>
    );
};

export default Preloader;