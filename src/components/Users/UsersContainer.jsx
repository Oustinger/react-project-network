import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, setUsersCount, setTotalUsersCount, setUsers, unfollow, toggleIsFetching } from '../../redux/usersReducer';
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
            {this.props.isFetching && <Preloader />}
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow(userId) {
//             dispatch(follow(userId));
//         },
//         unfollow(userId) {
//             dispatch(unfollow(userId));
//         },
//         setUsers(users) {
//             dispatch(setUsers(users));
//         },
//         setTotalUsersCount(totalUsersCount) {
//             dispatch(setTotalUsersCount(totalUsersCount));
//         },
//         setUsersCount(usersCount) {
//             dispatch(setUsersCount(usersCount));
//         },
//         setCurrentPage(currentPage) {
//             dispatch(setCurrentPage(currentPage));
//         },
//         toggleIsFetching(isFetching) {
//             dispatch(toggleIsFetching(isFetching));
//         },
//     };
// };

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setTotalUsersCount,
    setUsersCount,
    setCurrentPage,
    toggleIsFetching,
})(UsersContainer);