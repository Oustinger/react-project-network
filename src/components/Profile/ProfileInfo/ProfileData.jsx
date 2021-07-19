import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    const contacts = Object.entries(profile.contacts).filter(([name, address]) => address);

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
            contacts.length &&
            <div>
                <b>Contacts</b>
                <div className={s.contactsList}>
                    {contacts.map(([name, address]) => (
                        <div key={name}>
                            <a target="_blank" href={address}>{name}</a>
                        </div>
                    ))}
                </div>
            </div>
        }
    </div>;
}

export default ProfileData;