import React from 'react';
import s from './Profile.module.css';
import { setUserProfile } from './../../redux/profileReducer';
import axios from 'axios';
import { connect } from 'react-redux';
import Profile from './Profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);