import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getPhotoSmall, getUserId } from '../../redux/auth/authSelectors';
import { getAuthUserData, logout } from './../../redux/auth/authReducer';
import { getIsAuth, getLogin } from './../../redux/auth/authSelectors';
import Header from './Header';

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header userId={this.props.userId}
                login={this.props.login}
                logout={this.props.logout}
                photo={this.props.photo}
                isAuth={this.props.isAuth}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    userId: getUserId(state),
    login: getLogin(state),
    photo: getPhotoSmall(state),
    isAuth: getIsAuth(state),
});

export default compose(
    connect(mapStateToProps, { getAuthUserData, logout }),
    withRouter,
)(HeaderContainer);