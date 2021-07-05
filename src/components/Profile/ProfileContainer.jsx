import React from 'react';
import { setUserProfile } from './../../redux/profileReducer';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router';
import { profileAPI } from '../../api/api';

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        profileAPI.getProfile(userId)
            .then((data) => {
                this.props.setUserProfile(data);
            });
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
});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainerComponent);