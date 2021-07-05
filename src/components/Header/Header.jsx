import React from 'react';
import s from './Header.module.css';
import userImg from '../../assets/imgs/user.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img className={s.logo} src="https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png" />
            <div className={s.authBlock}>
                {
                    props.isAuth ?
                        <div>
                            <NavLink to={`/profile/${props.userId}`}>
                                <img className={s.userImg} src={props.photo || userImg} />
                                <div>{props.login}</div>
                            </NavLink>
                        </div> :
                        <a target="_blanc" href="https://social-network.samuraijs.com/login">LogIn</a>
                }
            </div>
        </header>
    );
}

export default Header;