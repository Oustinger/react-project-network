import React from 'react';
import Paginator from './Paginator/Paginator';
import User from './User/User';
import s from './Users.module.css';

const Users = (props) => {
    return (
        <div>
            <div className={s.users}>
                {props.users.map(u => (
                    <User user={u}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                        urlHistory={props.urlHistory}
                        key={u.id} />
                ))}
            </div>
            <Paginator totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onChangePageNumber={props.onChangePageNumber} />
        </div>
    );
};

export default Users;