import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <img className={s.logo} src="https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png" />
        </header>
    );
}

export default Header;