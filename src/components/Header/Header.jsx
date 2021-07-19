import React from 'react';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/imgs/user.png';
import s from './Header.module.css';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img className={s.logo} src="https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png" />
            <div className={s.authBlock}>
                {
                    props.isAuth ?
                        <div>
                            <div>
                                <NavLink to={`/profile/${props.userId}`}>
                                    <img className={s.userImg} src={props.photo || userImg} />
                                    <div>{props.login}</div>
                                </NavLink>
                            </div>
                            <div>
                                <button onClick={props.logout}>LogOut</button>
                            </div>
                        </div> :
                        <NavLink to="/login">LogIn</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;