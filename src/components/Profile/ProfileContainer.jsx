import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getUserId } from '../../redux/auth/authSelectors';
import {
    addPost, followProfile, getProfileStatus, getUserProfile,
    resetPostForm, savePhoto, setCurrentUserId, toggleProfileDataEditMode,
    unfollowProfile, updateProfileData, updateProfileStatus
} from './../../redux/profile/profileReducer';
import {
    getCurrentUserId, getIsFetchingUserProfile, getIsFollowed,
    getIsFollowingInProgress, getIsUploadingDataInProgress, getPosts,
    getProfile, getProfileDataEditMode, getStatus, getWallpaper
} from './../../redux/profile/profileSelectors';
import { withAuthRedirect } from './../common/HOC/withAuthRedirect';
import Profile from './Profile';
class ProfileContainer extends React.Component {
    getCurrentUserId() {
        return Number.parseInt(this.props.match.params.userId) || this.props.authUserId;
    }

    getUserData(userId) {
        this.props.setCurrentUserId(userId);
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
                    isProfileDataLoaded={!this.props.isFetchingUserProfile && this.props.profile}
                    isOwner={this.props.authUserId === this.getCurrentUserId()}
                    savePhoto={this.props.savePhoto}
                    profileDataEditMode={this.props.profileDataEditMode}
                    toggleProfileDataEditMode={this.props.toggleProfileDataEditMode}
                    updateProfileData={this.props.updateProfileData}
                    isFollowed={this.props.isFollowed}
                    isFollowingInProgress={this.props.isFollowingInProgress}
                    follow={this.props.followProfile}
                    unfollow={this.props.unfollowProfile}
                    urlHistory={this.props.history}
                    isUploadingDataInProgress={this.props.isUploadingDataInProgress}
                    wallpaper={this.props.wallpaper} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    posts: getPosts(state),
    isFetchingUserProfile: getIsFetchingUserProfile(state),
    prevUserId: getCurrentUserId(state),
    profileDataEditMode: getProfileDataEditMode(state),
    isFollowed: getIsFollowed(state),
    isFollowingInProgress: getIsFollowingInProgress(state),
    isUploadingDataInProgress: getIsUploadingDataInProgress(state),
    wallpaper: getWallpaper(state),
    authUserId: getUserId(state),
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