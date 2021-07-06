import React from 'react';
import { getUserProfile } from './../../redux/profileReducer';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from './../HOC/withAuthRedirect';

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.getUserProfile(userId);
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default withAuthRedirect(connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent));