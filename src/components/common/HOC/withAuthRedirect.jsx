import React from "react";
import { Redirect } from "react-router";
import { connect } from 'react-redux';
import { compose } from "redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
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