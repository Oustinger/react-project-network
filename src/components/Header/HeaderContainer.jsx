import axios from 'axios';
import React from 'react';
import { setAuthData } from './../../redux/authReducer';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(({ data }) => {
            if (data.resultCode === 0) {
                const userId = data.data.id;
                const email = data.data.email;
                const login = data.data.login;

                axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
                    .then(({ data }) => {
                        this.props.setAuthData(userId, email, login, data.photos.small);
                    });
            }
        });
    }

    render() {
        return (
            <Header userId={this.props.userId}
                email={this.props.email}
                login={this.props.login}
                photo={this.props.photo}
                isAuth={this.props.isAuth}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    photo: state.auth.photo,
    isAuth: state.auth.isAuth,
});

const WithUrlDataContainerComponent = withRouter(HeaderContainer);

export default connect(mapStateToProps, { setAuthData })(WithUrlDataContainerComponent);