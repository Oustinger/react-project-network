import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import s from './Profile.module.css';

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profile={props.profile}
                status={props.status}
                updateProfileStatus={props.updateProfileStatus}
                isFetchingUserProfile={props.isFetchingUserProfile}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                goToEditMode={props.toggleProfileDataEditMode}
                updateProfileData={props.updateProfileData}
                editMode={props.profileDataEditMode}
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow}
                isFollowed={props.isFollowed}
                wallpaper={props.wallpaper}
                urlHistory={props.urlHistory} />
            <MyPosts posts={props.posts}
                addPost={props.addPost}
                resetPostForm={props.resetPostForm} />
        </div>
    );
}

export default Profile;