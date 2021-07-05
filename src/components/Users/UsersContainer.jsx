import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, setUsersCount, setTotalUsersCount, setUsers, unfollow, toggleIsFetching } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from './../../api/api';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.pageNumber, this.props.pageSize)
            .then((data) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    render() {
        const onChangePageNumber = (pageNumber) => {
            this.props.setCurrentPage(pageNumber);
            this.props.toggleIsFetching(true);

            usersAPI.getUsers(pageNumber, this.props.pageSize)
                .then((data) => {
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(data.items);
                });
        };

        return <>
            {this.props.isFetching && <Preloader />}
            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
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
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    };
};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setTotalUsersCount,
    setUsersCount,
    setCurrentPage,
    toggleIsFetching,
})(UsersContainer);