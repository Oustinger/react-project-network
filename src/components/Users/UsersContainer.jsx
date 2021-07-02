import React from 'react';
import { connect } from 'react-redux';
import { followAC, setCurrentPageAC, setUsersCountAC, setTotalUsersCountAC, setUsersAC, unfollowAC } from '../../redux/usersReducer';
import Users from './Users';

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        follow(userId) {
            dispatch(followAC(userId));
        },
        unfollow(userId) {
            dispatch(unfollowAC(userId));
        },
        setUsers(users) {
            dispatch(setUsersAC(users));
        },
        setTotalUsersCount(totalUsersCount) {
            dispatch(setTotalUsersCountAC(totalUsersCount));
        },
        setUsersCount(usersCount) {
            dispatch(setUsersCountAC(usersCount));
        },
        setCurrentPage(currentPage) {
            dispatch(setCurrentPageAC(currentPage));
        },
    };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;