import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getFollowingInProgress } from '../../redux/usersSelectors';
import {
    addPost, getProfileStatus, getUserProfile, resetPostForm, savePhoto, setCurrentUserId, toggleProfileDataEditMode,
    updateProfileData, updateProfileStatus, unfollowProfile, followProfile
} from './../../redux/profileReducer';
import { getIsFollowed, getWallpaper } from './../../redux/profileSelectors';
import { withAuthRedirect } from './../common/HOC/withAuthRedirect';
import Profile from './Profile';
class ProfileContainer extends React.Component {
    getCurrentUserId() {
        return Number.parseInt(this.props.match.params.userId) || this.props.authUserId;
    }

    getUserData(userId) {
        this.props.setCurrentUserId(this.getCurrentUserId());
        this.props.getUserProfile(userId);
        this.props.getProfileStatus(userId);
    }

    componentDidMount() {
        this.getUserData(this.getCurrentUserId());
    }

    componentDidUpdate() {
        if (this.getCurrentUserId() !== this.props.prevUserId) {
            this.getUserData(this.getCurrentUserId());
        }
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile}
                    status={this.props.status}
                    updateProfileStatus={this.props.updateProfileStatus}
                    posts={this.props.posts}
                    addPost={this.props.addPost}
                    resetPostForm={this.props.resetPostForm}
                    isFetchingUserProfile={this.props.isFetchingUserProfile}
                    isOwner={this.props.authUserId === this.getCurrentUserId()}
                    savePhoto={this.props.savePhoto}
                    profileDataEditMode={this.props.profileDataEditMode}
                    toggleProfileDataEditMode={this.props.toggleProfileDataEditMode}
                    updateProfileData={this.props.updateProfileData}
                    isFollowed={this.props.isFollowed}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.followProfile}
                    unfollow={this.props.unfollowProfile}
                    urlHistory={this.props.history}
                    wallpaper={this.props.wallpaper} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    posts: state.profilePage.posts,
    isFetchingUserProfile: state.profilePage.isFetchingUserProfile,
    prevUserId: state.profilePage.currentUserId,
    authUserId: state.auth.userId,
    profileDataEditMode: state.profilePage.profileDataEditMode,
    isFollowed: getIsFollowed(state),
    followingInProgress: getFollowingInProgress(state),
    wallpaper: getWallpaper(state),
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile, getProfileStatus,
        updateProfileStatus, resetPostForm,
        addPost, setCurrentUserId,
        savePhoto, toggleProfileDataEditMode,
        updateProfileData, followProfile,
        unfollowProfile,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);