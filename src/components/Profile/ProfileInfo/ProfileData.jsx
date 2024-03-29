import cn from 'classnames';
import checkMark from '../../../assets/icons/checkbox-mark.png';
import facebook from '../../../assets/icons/socials/facebook.png';
import github from '../../../assets/icons/socials/github.png';
import instagram from '../../../assets/icons/socials/instagram.png';
import twitter from '../../../assets/icons/socials/twitter.png';
import vk from '../../../assets/icons/socials/vk.png';
import website from '../../../assets/icons/socials/website.png';
import youtube from '../../../assets/icons/socials/youtube.png';
import MyButton from '../../common/MyButton/MyButton';
import styleProfile from '../Profile.module.css';
import s from './ProfileInfo.module.css';

const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    const contacts = Object.entries(profile.contacts).filter(([name, address]) => address);
    const middleContactIndex = Math.ceil(contacts.length / 2);
    const maxRowContacts = 5;

    const socials = { vk, github, instagram, facebook, twitter, website, youtube };

    return <div>
        <div className={'flex-row-xb-ys'}>
            <h3 className={styleProfile.profile__blockHeader}><b>About</b></h3>
            {isOwner && <MyButton onClick={goToEditMode} isInvert={true} isSmall={true}>Edit</MyButton>}
        </div>
        <ul className={cn(`uk-list uk-list-divider`, s.data__itemsContainer)}>
            {profile.aboutMe && <div>{profile.aboutMe}</div>}
            {
                profile.lookingForAJob &&
                <div>
                    <div className={'flex-row-xs-yc'}>
                        <b className={s.data__lookingJob__text}>Looking for a job: </b>
                        <img className={s.data__lookingJob__checkMark} src={checkMark} alt='check mark' />
                    </div>
                    <div><b>Description:</b><br />{profile.lookingForAJobDescription}</div>
                </div>
            }
            {
                contacts.length > 0 &&
                <div>
                    <div className={'flex-row-xc-yc'}>
                        {contacts.map(([name, address], index) => (
                            (index <= middleContactIndex || contacts.length <= maxRowContacts) && (
                                <div key={name} className={s.data__contactsList__imgContainer}>
                                    <a target="_blank" rel="noreferrer" href={address}>
                                        <img src={socials[name.toLowerCase()]} alt='social network icon' />
                                    </a>
                                </div>
                            )
                        ))}
                    </div>
                    {
                        contacts.length > maxRowContacts &&
                        <div className={'flex-row-xc-yc'}>
                            {contacts.map(([name, address], index) => (
                                index > middleContactIndex && (
                                    <div key={name} className={s.data__contactsList__imgContainer}>
                                        <a target="_blank" rel="noreferrer" href={address}>
                                            <img src={socials[name.toLowerCase()]} alt='social network icon' />
                                        </a>
                                    </div>
                                )
                            ))}
                        </div>
                    }
                </div>
            }
        </ul>
    </div>;
}

export default ProfileData;