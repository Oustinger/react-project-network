import userImg from '../../../assets/imgs/user.png';
import MyButton from '../../common/MyButton/MyButton';
import ShadowSection from '../../common/ShadowSection/ShadowSection';
import Preloader from './../../common/Preloader/Preloader';
import ProfileData from './ProfileData';
import ProfileForm from './ProfileForm';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import cn from 'classnames';

const ProfileInfo = ({
    profile, isProfileDataLoaded, updateProfileStatus, status,
    isOwner, savePhoto, goToEditMode, updateProfileData, editMode,
    isFollowingInProgress, unfollow, follow, urlHistory,
    isFollowed, wallpaper, isUploadingDataInProgress,
}) => {
    const onSavePhoto = ({ currentTarget }) => {
        if (currentTarget.files.length)
            savePhoto(currentTarget.files[0])
    };

    return <>
        <div className={s.main}>
            <ShadowSection padding=".9rem"> {
                isProfileDataLoaded ?
                    <div>
                        <div className={s.wallpaperBlock}
                            style={{ backgroundImage: `url(${wallpaper})` }}></div>
                        <div className={s.descriptionBlock}>
                            <div className={s.userPhoto}>
                                <div className={cn(
                                    s.userPhoto__imgContainer,
                                    { [s.userPhoto__imgContainer_imgChanger]: isOwner }
                                )}>
                                    {
                                        isOwner ?
                                            <>
                                                <input id="changeImg" className={s.changeUserPhoto__input}
                                                    type='file' onChange={onSavePhoto} />
                                                <label htmlFor="changeImg" className={s.changeUserPhoto__label}>
                                                    <img src={profile.photos.large || userImg}
                                                        alt='user img' />
                                                    <div className={s.changeUserPhoto__label__textContainer}>
                                                        <span className={s.changeUserPhoto__label__text}>
                                                            <b>
                                                                <span className={
                                                                    s.changeUserPhoto__label__text_highlight
                                                                }>
                                                                    Upload
                                                                </span>
                                                                <br />new photo
                                                            </b>
                                                        </span>
                                                    </div>
                                                </label>
                                            </>
                                            : <img src={profile.photos.large || userImg} alt='user img' />
                                    }
                                </div>
                            </div>
                            <div>
                                <b className={s.fullName}>{profile.fullName}</b>
                                <ProfileStatusWithHooks status={status}
                                    updateProfileStatus={updateProfileStatus}
                                    isOwner={isOwner} />
                            </div>
                            {
                                !isOwner &&
                                (
                                    isFollowed ?
                                        <MyButton disabled={isFollowingInProgress}
                                            onClick={() => unfollow(profile.userId, urlHistory)}>
                                            Unfollow
                                        </MyButton> :
                                        <MyButton disabled={isFollowingInProgress}
                                            onClick={() => follow(profile.userId, urlHistory)}>
                                            Follow
                                        </MyButton>
                                )
                            }
                        </div>
                    </div>
                    : <Preloader />
            } </ShadowSection>
        </div>
        <div className={s.about}>
            <ShadowSection padding=".9rem"> {
                isProfileDataLoaded ?
                    <div>
                        {
                            editMode ?
                                <ProfileForm onSubmit={(formData) => Promise.all[updateProfileData(formData)]}
                                    initialValues={profile} isUploadingDataInProgress={isUploadingDataInProgress} />
                                : <ProfileData profile={profile} goToEditMode={goToEditMode} isOwner={isOwner} />
                        }
                    </div>
                    : <Preloader />
            } </ShadowSection>
        </div>
    </>;
}

export default ProfileInfo;