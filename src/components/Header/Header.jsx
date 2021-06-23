import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <img className={s.logo} src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" />
        </header>
    );
}

export default Header;