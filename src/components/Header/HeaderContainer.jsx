import React from 'react';
import { getAuthUserData, logout } from './../../redux/authReducer';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();
    }

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
    userId: state.auth.userId,
    login: state.auth.login,
    photo: state.auth.photo,
    isAuth: state.auth.isAuth,
});

export default compose(
    connect(mapStateToProps, { getAuthUserData, logout }),
    withRouter,
)(HeaderContainer);