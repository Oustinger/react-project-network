import React from 'react';
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/imgs/user.png';
import axios from 'axios';

const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.usersCount);

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
                                        <button onClick={() => {
                                            axios.delete(
                                                `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                                {
                                                    withCredentials: true,
                                                    headers: {
                                                        'API-KEY': 'c97ad9c5-53df-4311-9eb0-ba502f90ac28',
                                                    }
                                                }
                                            ).then(({ data }) => {
                                                if (data.resultCode === 0)
                                                    props.unfollow(u.id);
                                            });
                                        }}>Unfollow</button> :
                                        <button onClick={() => {
                                            axios.post(
                                                `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                                {},
                                                {
                                                    withCredentials: true,
                                                    headers: {
                                                        'API-KEY': 'c97ad9c5-53df-4311-9eb0-ba502f90ac28',
                                                    }
                                                }
                                            ).then(({ data }) => {
                                                if (data.resultCode === 0)
                                                    props.follow(u.id);
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