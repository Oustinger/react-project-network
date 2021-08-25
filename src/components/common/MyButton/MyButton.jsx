import cn from 'classnames';
import s from './MyButton.module.css';

const MyButton = (props) => {
    const classes = cn(
        'uk-button',
        'uk-button-default',
        s.btn,
        props.className,
        { [s.invert]: props.isInvert },
        { [s.small]: props.isSmall },
        { [s.medium]: props.isMedium },
        { [s[`float-${props.float}`]]: props.float },
        { 'uk-disabled': props.disabled },
        { [s.disabled]: props.disabled }
    );

    return (
        <div className={classes}
            onClick={props.onClick}
            key={props.key}
            type={props.type}
            uk-toggle={props.ukToggle}
        >
            {props.children}
        </div>
    );
};
export default MyButton;