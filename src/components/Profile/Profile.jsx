import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                status={props.status}
                updateProfileStatus={props.updateProfileStatus}
                isFetchingUserProfile={props.isFetchingUserProfile}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                goToEditMode={props.toggleProfileDataEditMode}
                updateProfileData={props.updateProfileData}
                editMode={props.profileDataEditMode} />
            <MyPosts posts={props.posts}
                addPost={props.addPost}
                resetPostForm={props.resetPostForm} />
        </div>
    );
}

export default Profile;