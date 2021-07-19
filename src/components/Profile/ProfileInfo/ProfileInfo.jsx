import React from 'react';
import userImg from '../../../assets/imgs/user.png';
import Preloader from './../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileData from './ProfileData';
import { useState } from 'react';
import ProfileForm from './ProfileForm';

const ProfileInfo = ({
    profile, isFetchingUserProfile, updateProfileStatus, status,
    isOwner, savePhoto, goToEditMode, updateProfileData, editMode
}) => {
    const isProfileDataLoaded = !isFetchingUserProfile && profile;

    const onSavePhoto = ({ currentTarget }) => {
        if (currentTarget.files.length)
            savePhoto(currentTarget.files[0])
    };

    return <> {
        isProfileDataLoaded && <div>
            <div className={s.bannerBlock}>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userImg} className={s.userPhoto} />
                {isOwner && <input type='file' onChange={onSavePhoto} />}
                <div>{profile.fullName}</div>
                <ProfileStatusWithHooks status={status} updateProfileStatus={updateProfileStatus} isOwner={isOwner} />
                {
                    editMode ?
                        <ProfileForm onSubmit={updateProfileData} initialValues={profile} /> :
                        <ProfileData profile={profile} goToEditMode={goToEditMode} isOwner={isOwner} />
                }
            </div>
        </div> || <Preloader />
    } </>;
}

export default ProfileInfo;