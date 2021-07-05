import React from 'react';
import s from './Profile.module.css';
import { setUserProfile } from './../../redux/profileReducer';
import axios from 'axios';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router';

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId || 2}`)
            .then(({ data }) => {
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