import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getIsAuth } from './../../../redux/auth/authSelectors';

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        hasProfileUrlUserId = () => {
            return (this.props.match.path === '/profile/:userId?' && this.props.match.params.userId);
        }

        render() {
            if (!this.props.isAuth && !this.hasProfileUrlUserId())
                return <Redirect to="/login" />;

            return <Component {...this.props} />;
        }
    }

    return compose(
        connect(mapStateToProps),
        withRouter,
    )(RedirectComponent);
};