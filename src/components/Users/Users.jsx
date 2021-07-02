import axios from 'axios';
import React from 'react';
import s from './Users.module.css';
import userImg from '../../assets/imgs/user.png';

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersCount}`)
            .then(({ data }) => {
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    render() {

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.usersCount);

        const pages = Array.apply(null, Array(pagesCount > 20 ? 20 : pagesCount))// создаём пустой массив нужной длины
            .map((val, idx) => idx + 1);                                         // заполняем его номерами страниц

        const onChangePageNumber = (pageNumber) => {
            this.props.setCurrentPage(pageNumber);

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersCount}`)
                .then(({ data }) => {
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount(data.totalCount);
                });
        };

        return (
            <div>
                <div>
                    {
                        pages.map(p => {
                            return (
                                <span
                                    className={`${s.pageNumber} ${p === this.props.currentPage ? s.selected : null}`}
                                    onClick={() => onChangePageNumber(p)}
                                >{p}</span>
                            );
                        })
                    }
                </div>
                <div>
                    {this.props.users.map(u =>
                        <div className={s.user} key={u.id}>
                            <div>
                                <div>
                                    <img className={s.photo} src={u.photos.small || userImg} />
                                </div>
                                <div>
                                    {
                                        u.followed ?
                                            <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button> :
                                            <button onClick={() => this.props.follow(u.id)}>Follow</button>
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
    }
}

export default Users;