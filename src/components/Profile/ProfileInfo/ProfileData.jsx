import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    return <div>
        {isOwner && <button onClick={goToEditMode}>Edit</button>}
        {profile.aboutMe && <div><b>About me: </b>{profile.aboutMe}</div>}
        {
            profile.lookingForAJob &&
            <span>
                <div><b>Looking for a job</b></div>
                <div><b>Description: </b>{profile.lookingForAJobDescription}</div>
            </span>
        }
        {
            profile.contacts.length &&
            <div>
                <b>Contacts</b>
                <div className={s.contactsList}>
                    {Object.entries(profile.contacts).map(([name, address]) => (
                        address ?
                            <div key={name}>
                                <a target="_blank" href={address}>{name}</a>
                            </div> :
                            null
                    ))}
                </div>
            </div>
        }
    </div>;
}

export default ProfileData;