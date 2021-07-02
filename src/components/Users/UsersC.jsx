import axios from 'axios';
import React from 'react';
import s from './Users.module.css';
import userImg from '../../assets/imgs/user.png';

class Users extends React.Component {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(({ data }) => {
                this.props.setUsers(data.items);
            });
    }

    render() {
        return (
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
        );
    }
}

export default Users;