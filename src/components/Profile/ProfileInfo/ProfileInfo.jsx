import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader/Preloader';
import { NavLink } from 'react-router-dom';

const ProfileInfo = (props) => {
    const contacts = props.profile && Object.entries(props.profile.contacts);

    return <> {
        !props.profile && <Preloader /> ||
        <div>
            <div className={s.bannerBlock}>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} />
                <div>{props.profile.fullName}</div>
                <div>О себе: {props.profile.aboutMe}</div>
                {
                    props.profile.lookingForAJob ?
                        <span>
                            <div>В поиске работы</div>
                            <div>Описание поиска: {props.profile.lookingForAJobDescription}</div>
                        </span> :
                        null
                }
                <span>
                    <div>Контакты</div>
                    {contacts.map(([name, address]) => (
                        address ? <div>
                            <div>
                                <a target="_blank" href={address}>{name}</a>
                            </div>
                        </div> : null
                    ))}
                </span>
            </div>
        </div>
    } </>;
}

export default ProfileInfo;