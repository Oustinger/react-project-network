import React from 'react';
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/imgs/user.png';
import { usersAPI } from './../../api/api';

const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    const pages = Array.apply(null, Array(pagesCount > 20 ? 20 : pagesCount))// создаём пустой массив нужной длины
        .map((val, idx) => idx + 1);                                         // заполняем его номерами страниц

    return (
        <div>
            <div>
                {
                    pages.map(p => {
                        return (
                            <span
                                key={p}
                                className={`${s.pageNumber} ${p === props.currentPage ? s.selected : null}`}
                                onClick={() => props.onChangePageNumber(p)}
                            >{p}</span>
                        );
                    })
                }
            </div>
            <div>
                {props.users.map(u =>
                    <div className={s.user} key={u.id}>
                        <div>
                            <div>
                                <NavLink to={`/profile/${u.id}`}>
                                    <img className={s.photo} src={u.photos.small || userImg} />
                                </NavLink>
                            </div>
                            <div>
                                {
                                    u.followed ?
                                        <button disabled={props.followingInProgress.some((id) => id === u.id)}
                                            onClick={() => {
                                                props.toggleFollowingProgress(true, u.id);
                                                usersAPI.unfollow(u.id)
                                                    .then((data) => {
                                                        if (data.resultCode === 0)
                                                            props.unfollow(u.id);

                                                        props.toggleFollowingProgress(false, u.id);
                                                    });
                                            }}>Unfollow</button> :
                                        <button disabled={props.followingInProgress.some((id) => id === u.id)}
                                            onClick={() => {
                                                props.toggleFollowingProgress(true, u.id);
                                                usersAPI.follow(u.id)
                                                    .then((data) => {
                                                        if (data.resultCode === 0)
                                                            props.follow(u.id);
                                                            
                                                        props.toggleFollowingProgress(false, u.id);
                                                    });
                                            }}>Follow</button>
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </div>
                            {
                                u.location ?
                                    <div>
                                        <div>{u.location.country}</div><div>{u.location.city}</div>
                                    </div> :
                                    null
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;