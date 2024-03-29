import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/imgs/user.png';
import logoSvg from '../../assets/logo.svg';
import MyButton from '../common/MyButton/MyButton';
import s from './Header.module.css';

const Header = (props) => {
    return (
        <div className={s.headerContainer}>
            <header className={cn(s.header, 'flex-row-xb-yc')}>
                <NavLink to={`/profile/${props.userId}`}>
                    <div className={cn(s.logo, 'flex-row-xs-yc')}>
                        <img src={logoSvg} alt='logo img' />
                        <span>Network</span>
                    </div>
                </NavLink>
                <div className={cn(s.authBlock, 'flex-row-xb-yc')}>
                    <MyButton isSmall={true} isInvert={true} type="button"
                        ukToggle="target: #modalNotifier" className={s.authBlock__modalNotifier}>
                        Useful info
                    </MyButton>
                    {
                        props.isAuth ?
                            <div className={`flex-row-xs-yc`}>
                                <div className={s.notifications}>
                                    <button className={cn(
                                        s.notifications__btn,
                                        s.authBlock__btn,
                                        'uk-button',
                                        'uk-button-default',
                                        'flex-row-xs-yc',
                                    )} type="button">
                                        <div className={
                                            cn(s.authBlock_highlighter, 'hover-highlight', 'flex-row-xs-yc')
                                        }>
                                            <span className="uk-margin-small-right" uk-icon="icon: bell; ratio: 1.2">
                                            </span>
                                        </div>
                                    </button>
                                    <div uk-drop="mode: click">
                                        <div className={cn(s.notifications__panel, s.authBlock__panel)}>
                                            <ul className={cn(s.authBlock__panel__items, 'uk-list uk-list-divider')}>
                                                <span>Notifications: 0</span>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.login}>
                                    <button className={cn(
                                        s.login__btn,
                                        s.authBlock__btn,
                                        'uk-button',
                                        'uk-button-default',
                                        'flex-row-xs-yc',
                                    )} type="button">
                                        <div className={
                                            cn(s.authBlock_highlighter, 'hover-highlight', 'flex-row-xs-yc')
                                        }>
                                            <div className={s.login__btn__userName}>{props.login}</div>
                                            <img className={s.login__btn__userImg}
                                                src={props.photo || userImg}
                                                alt='login btn with user img' />
                                            <span className="uk-margin-small-right" uk-icon="icon: chevron-down"></span>
                                        </div>
                                    </button>
                                    <div uk-drop="mode: click">
                                        <div className={cn(s.login__panel, s.authBlock__panel)}>
                                            <ul className={cn(s.authBlock__panel__items, 'uk-list', 'uk-list-divider')}>
                                                <div>
                                                    <NavLink to={`/profile/${props.userId}`}
                                                        className='flex-row-xs-yc'>
                                                        Profile
                                                    </NavLink>
                                                </div>
                                                <div>
                                                    <NavLink to={`/profile/18114`}
                                                        className='flex-row-xs-yc'>
                                                        Author
                                                    </NavLink>
                                                </div>
                                                <div>
                                                    {/* eslint-disable-next-line */}
                                                    <a href="#" onClick={props.logout}
                                                        className='flex-row-xs-yc'>
                                                        LogOut
                                                    </a>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <NavLink to="/login" className={s.authBlock__logout}>LogIn</NavLink>
                    }
                </div>
            </header>
        </div>
    );
}

export default Header;