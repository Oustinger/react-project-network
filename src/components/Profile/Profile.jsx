import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                status={props.status}
                updateProfileStatus={props.updateProfileStatus} />
            <MyPosts posts={props.posts}
                addPost={props.addPost}
                resetPostForm={props.resetPostForm} />
        </div>
    );
}

export default Profile;