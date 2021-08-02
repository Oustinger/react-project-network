import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import userImg from '../../../assets/imgs/user.png';
import MyButton from '../../common/MyButton/MyButton';
import ShadowSection from '../../common/ShadowSection/ShadowSection';
import s from './User.module.css';

const User = ({ user, followingInProgress, unfollow, follow, urlHistory }) => {
    const userBanner = 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg';

    return (
        <ShadowSection>
            <div className={s.user}>
                <div className={s.user__banner}>
                    <img src={userBanner} />
                </div>
                <div className={cn(s.user__data)}>
                    <div className={s.user__photo}>
                        <div className={s.user__photo__imgContainer}>
                            <img src={user.photos.small || userImg} />
                        </div>
                    </div>
                    <div className={s.user__info}>
                        <NavLink to={`/profile/${user.id}`}>
                            {user.name && <b>{user.name}</b>}
                        </NavLink>
                        {user.status && <div>{user.status}</div>}
                    </div>
                    <div className={s.user__btn}>
                        {
                            user.followed ?
                                <MyButton disabled={followingInProgress.some((id) => id === user.id)}
                                    onClick={() => unfollow(user.id, urlHistory)}>
                                    Unfollow
                                </MyButton> :
                                <MyButton disabled={followingInProgress.some((id) => id === user.id)}
                                    onClick={() => follow(user.id, urlHistory)}>
                                    Follow
                                </MyButton>
                        }
                    </div>
                </div>
            </div>
        </ShadowSection>
    );
};

export default User;