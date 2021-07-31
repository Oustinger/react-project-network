import cn from 'classnames';
import s from './MyButton.module.css';

export default ({ children, onClick, disabled, key, className, isInvert }) => {
    return (
        <div className={cn(
            'uk-button',
            'uk-button-default',
            s.btn,
            className,
            { [s.invert]: isInvert },
        )}
            disabled={disabled}
            onClick={onClick}
            key={key}
        >
            {children}
        </div>
    );
}