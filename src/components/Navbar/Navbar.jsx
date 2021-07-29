import React from 'react';
import { NavLink } from 'react-router-dom';
import ShadowSection from '../common/ShadowSection/ShadowSection';
import s from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={s.navContainer}>
            <nav className={s.nav}>
                <ShadowSection width={'calc(100% - 2rem)'} height={'calc(100% - 2rem)'} padding={'1rem'}>
                    <div className={s.item}>
                        <NavLink to="/profile" activeClassName={s.active} className={`flex-row-xs-yc`}>
                            <span class="uk-margin-small-right" uk-icon="icon: user; ratio: 1.4"></span>
                            Profile
                        </NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to="/users" activeClassName={s.active} className={`flex-row-xs-yc`}>
                            <span class="uk-margin-small-right" uk-icon="icon: users; ratio: 1.4"></span>
                            Users
                        </NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to="/dialogs" activeClassName={s.active} className={`flex-row-xs-yc`}>
                            <span class="uk-margin-small-right" uk-icon="icon: comments; ratio: 1.4"></span>
                            Dialogs
                        </NavLink>
                    </div>
                    {/* <div className={s.item}>
                    <NavLink to="/news" activeClassName={s.active}>
                        <span class="uk-margin-small-right" uk-icon="icon: user"></span>
                        News
                    </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/music" activeClassName={s.active}>
                        <span class="uk-margin-small-right" uk-icon="icon: user"></span>
                        Music
                    </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/settings" activeClassName={s.active}>
                        <span class="uk-margin-small-right" uk-icon="icon: user"></span>
                        Settings
                    </NavLink>
                </div> */}
                </ShadowSection>
            </nav>
        </div>
    );
}

export default Navbar;