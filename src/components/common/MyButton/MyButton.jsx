import cn from 'classnames';
import s from './MyButton.module.css';

export default ({ children, onClick, disabled, key, className, isInvert, isSmall, isMedium }) => {
    return (
        <div className={cn(
            'uk-button',
            'uk-button-default',
            s.btn,
            className,
            { [s.invert]: isInvert },
            { [s.small]: isSmall },
            { [s.medium]: isMedium },
        )}
            disabled={disabled}
            onClick={onClick}
            key={key}
        >
            {children}
        </div>
    );
}