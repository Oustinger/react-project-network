import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import s from './Profile.module.css';

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profile={props.profile}
                status={props.status}
                updateProfileStatus={props.updateProfileStatus}
                isProfileDataLoaded={props.isProfileDataLoaded}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                goToEditMode={props.toggleProfileDataEditMode}
                updateProfileData={props.updateProfileData}
                editMode={props.profileDataEditMode}
                isFollowingInProgress={props.isFollowingInProgress}
                unfollow={props.unfollow}
                follow={props.follow}
                isFollowed={props.isFollowed}
                wallpaper={props.wallpaper}
                isUploadingDataInProgress={props.isUploadingDataInProgress}
                urlHistory={props.urlHistory} />
            <MyPosts posts={props.posts}
                addPost={props.addPost}
                resetPostForm={props.resetPostForm}
                isProfileDataLoaded={props.isProfileDataLoaded}
                profile={props.profile} />
        </div>
    );
}

export default Profile;