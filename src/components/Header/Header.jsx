import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/imgs/user.png';
import logoSvg from '../../assets/logo.svg';
import s from './Header.module.css';

const Header = (props) => {
    return (
        <div className={s.headerContainer}>
            <header className={`${s.header}  flex-row-xb-yc`}>
                <NavLink to={`/profile/${props.userId}`}>
                    <div className={`${s.logo} flex-row-xs-yc`}>
                        <img src={logoSvg} />
                        <span>Network</span>
                    </div>
                </NavLink>
                <div className={s.authBlock}>
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
                                        <div className={`${s.authBlock_highlighter} hover-highlight flex-row-xs-yc`}>
                                            <span className="uk-margin-small-right" uk-icon="icon: bell; ratio: 1.2"></span>
                                        </div>
                                    </button>
                                    <div uk-drop="mode: click">
                                        <div className={cn(s.notifications__panel, s.authBlock__panel)}>
                                            <ul className={`${s.authBlock__panel__items} uk-list uk-list-divider`}>
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
                                        <div className={`${s.authBlock_highlighter} hover-highlight flex-row-xs-yc`}>
                                            <div className={s.login__btn__userName}>{props.login}</div>
                                            <img className={s.login__btn__userImg} src={props.photo || userImg} />
                                            <span className="uk-margin-small-right" uk-icon="icon: chevron-down"></span>
                                        </div>
                                    </button>
                                    <div uk-drop="mode: click">
                                        <div className={cn(s.login__panel, s.authBlock__panel)}>
                                            <ul className={`${s.authBlock__panel__items} uk-list uk-list-divider`}>
                                                <div>
                                                    <NavLink to={`/profile/${props.userId}`}
                                                        className={`flex-row-xs-yc`}>
                                                        Profile
                                                    </NavLink>
                                                </div>
                                                <div>
                                                    <a href="#" onClick={props.logout}>LogOut</a>
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