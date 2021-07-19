import React from 'react';
import Paginator from './Paginator/Paginator';
import User from './User/User';

const Users = (props) => {
    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onChangePageNumber={props.onChangePageNumber} />
            <div>
                {props.users.map(u => (
                    <User user={u}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                        key={u.id} />
                ))}
            </div>
        </div>
    );
};

export default Users;