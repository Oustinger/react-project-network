import cn from 'classnames';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UIkit from 'uikit';
import MyButton from '../common/MyButton/MyButton';
import s from './ModalNotifier.module.css';

const showNotificationIfNeed = () => {
    const cookie = document.cookie ? document.cookie.split(';')
        .map(cookie => cookie.split('='))
        .filter(([name, value]) => name === 'modalNotifier')
        .map(([name, value]) => value) : null;

    if (!cookie) {
        const element = document.getElementById('modalNotifier');
        UIkit.modal(element).show();

        // (now date + 1 day) in UTC format
        const expires = (new Date(Date.now() + 86400e3)).toUTCString();

        document.cookie = `modalNotifier=true; expires=${expires}; path=/`;
    }
};

const ModalNotifier = () => {
    useEffect(() => {
        showNotificationIfNeed();
    });

    return (
        <div id="modalNotifier" uk-modal className={s.modalNotifier}>
            <div className={cn(s.modalNotifier__body, "uk-modal-dialog uk-modal-body")}>
                <h2 className="uk-modal-title">Useful info</h2>
                <h3>
                    First:
                </h3>
                <p>
                    There are some components and also page, have a hardcore data in state because
                    there is no API for them.
                </p>
                <p>
                    <b>Components:</b>
                    <br />
                    - Posts (on Profile page);
                    <br />
                    - UserWallpaper (on Profile and Users pages).
                </p>
                <p>
                    <b>Page:</b>
                    <br />
                    - Dialogs.
                </p>
                <h3>
                    Second:
                </h3>
                <p>
                    This site has been adapted for desktop only.
                </p>
                <h3>
                    Third:
                </h3>
                <p>
                    Authentication data for your test account:
                    <br />
                    <br />
                    <b>Email:</b> free@samuraijs.com
                    <br />
                    <b>Password:</b> free
                </p>
                <h3>
                    Fourth:
                </h3>
                <p>
                    <NavLink to={`/profile/18114`}>Link on my page</NavLink>
                    &nbsp;(also you can find it in a header menu (top right) when you are authenticated).
                </p>
                <hr />
                <p>
                    You can open this notification again by clicking the button in the header.
                </p>
                <p className="uk-text-right">
                    <MyButton className="uk-modal-close" type="button">Ok</MyButton>
                </p>
            </div>
        </div>
    );
};

export default ModalNotifier;