import React from 'react';
import { connect } from 'react-redux';
import { followAC, setCurrentPageAC, setUsersCountAC, setTotalUsersCountAC, setUsersAC, unfollowAC } from '../../redux/usersReducer';
import Users from './Users';
import axios from 'axios';

class UsersContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersCount}`)
            .then(({ data }) => {
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    render() {
        const onChangePageNumber = (pageNumber) => {
            this.props.setCurrentPage(pageNumber);

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersCount}`)
                .then(({ data }) => {
                    this.props.setUsers(data.items);
                });
        };

        return <Users
            users={this.props.users}
            totalUsersCount={this.props.totalUsersCount}
            usersCount={this.props.usersCount}
            currentPage={this.props.currentPage}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            onChangePageNumber={onChangePageNumber}
        />
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);