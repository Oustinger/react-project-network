import React from 'react';
import { setAuthData } from './../../redux/authReducer';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { authAPI, profileAPI } from './../../api/api';

class HeaderContainer extends React.Component {
    componentDidMount() {
        authAPI.getAuth()
            .then((data) => {
                if (data.resultCode === 0) {
                    const userId = data.data.id;
                    const email = data.data.email;
                    const login = data.data.login;

                    profileAPI.getProfile(userId)
                        .then((data) => {
                            this.props.setAuthData(userId, email, login, data.photos.small);
                        });
                }
            });
    }

    render() {
        return (
            <Header userId={this.props.userId}
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