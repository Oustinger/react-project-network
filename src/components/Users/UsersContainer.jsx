import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { follow, requestUsers, unfollow } from '../../redux/usersReducer';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/usersSelectors';
import Preloader from '../common/Preloader/Preloader';
import { getIsAuth } from './../../redux/usersSelectors';
import Users from './Users';
import { withRouter } from 'react-router-dom';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    render() {
        const onChangePageNumber = (pageNumber, pagesCount) => (
            this.props.requestUsers(pageNumber, this.props.pageSize)
        );

        return <>
            {this.props.isFetching && <Preloader />}
            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                followingInProgress={this.props.followingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                urlHistory={this.props.history}
                onChangePageNumber={onChangePageNumber}
            />
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