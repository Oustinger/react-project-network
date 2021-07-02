import React from 'react';
import { connect } from 'react-redux';
import { followAC, setCurrentPageAC, setUsersCountAC, setTotalUsersCountAC, setUsersAC, unfollowAC, toggleIsFetchingAC } from '../../redux/usersReducer';
import Users from './Users';
import axios from 'axios';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersCount}`)
            .then(({ data }) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    render() {
        const onChangePageNumber = (pageNumber) => {
            this.props.setCurrentPage(pageNumber);
            this.props.toggleIsFetching(true);

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersCount}`)
                .then(({ data }) => {
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(data.items);
                });
        };

        return <>
            { this.props.isFetching && <Preloader />}
            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                usersCount={this.props.usersCount}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onChangePageNumber={onChangePageNumber}
            />
        </>
    }
};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
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
        toggleIsFetching(isFetching) {
            dispatch(toggleIsFetchingAC(isFetching));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);