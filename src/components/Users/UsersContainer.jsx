import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { follow, requestUsers, unfollow } from '../../redux/users/usersReducer';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users/usersSelectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';
class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    render() {
        const onChangePageNumber = (pageNumber) => (
            this.props.requestUsers(pageNumber, this.props.pageSize)
        );

        const users = <Users
            users={this.props.users}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            followingInProgress={this.props.followingInProgress}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            urlHistory={this.props.history}
            onChangePageNumber={onChangePageNumber}
        />;

        return <>
            {
                this.props.isFetching ? <Preloader isAllBlockSize={true}
                    position={this.props.users.length > 0 ? 'absolute' : 'relative'}
                >
                    {users}
                </Preloader>
                    : users
            }
        </>
    }
};

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        requestUsers,
    }),
    withRouter,
)(UsersContainer);