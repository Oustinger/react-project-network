import React from 'react';
import { getUserProfile, getProfileStatus, updateProfileStatus, resetPostForm, addPost } from './../../redux/profileReducer';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.getUserProfile(userId);
        this.props.getProfileStatus(userId);
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile}
                    status={this.props.status}
                    updateProfileStatus={this.props.updateProfileStatus}
                    posts={this.props.posts}
                    addPost={this.props.addPost}
                    resetPostForm={this.props.resetPostForm} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    posts: state.profilePage.posts,
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile, getProfileStatus,
        updateProfileStatus, resetPostForm,
        addPost
    }),
    withRouter,
)(ProfileContainer);