import React from 'react';
import s from './User.module.css';
import { NavLink } from 'react-router-dom';
import userImg from '../../../assets/imgs/user.png';

const User = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div className={s.user} key={user.id}>
            <div>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img className={s.photo} src={user.photos.small || userImg} />
                    </NavLink>
                </div>
                <div>
                    {
                        user.followed ?
                            <button disabled={followingInProgress.some((id) => id === user.id)}
                                onClick={() => unfollow(user.id)}
                            >Unfollow</button> :
                            <button disabled={followingInProgress.some((id) => id === user.id)}
                                onClick={() => follow(user.id)}
                            >Follow</button>
                    }
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                {
                    user.location ?
                        <div>
                            <div>{user.location.country}</div><div>{user.location.city}</div>
                        </div> :
                        null
                }
            </div>
        </div>
    );
};

export default User;