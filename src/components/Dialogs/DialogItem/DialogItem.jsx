import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import userImg from '../../../assets/imgs/user.png';
import s from './../Dialogs.module.css';

const DialogItem = ({ id, name, activeId }) => {
    const path = '/dialogs/' + id;

    return (
        <NavLink to={path}
            className={cn(s.dialogContainer, { [s.active]: activeId === id })}
            activeClassName={s.active}
        >
            <div className={s.dialog} >
                <img src={userImg} alt='user img' />
                <span>{name}</span>
            </div>
        </NavLink>
    );
};

export default DialogItem;