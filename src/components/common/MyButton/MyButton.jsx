import cn from 'classnames';
import s from './MyButton.module.css';

export default ({ children, onClick, disabled, key, className, isInvert, isSmall, isMedium, float, type, ukToggle }) => {
    const classes = cn(
        'uk-button',
        'uk-button-default',
        s.btn,
        className,
        { [s.invert]: isInvert },
        { [s.small]: isSmall },
        { [s.medium]: isMedium },
        { [s[`float-${float}`]]: float },
        { 'uk-disabled': disabled },
        { [s.disabled]: disabled },
    );

    return (
        <div className={classes}
            onClick={onClick}
            key={key}
            type={type}
            uk-toggle={ukToggle}
        >
            {children}
        </div>
    );
}