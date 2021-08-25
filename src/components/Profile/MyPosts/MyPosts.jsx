import React from 'react';
import ShadowSection from '../../common/ShadowSection/ShadowSection';
import styleProfile from '../Profile.module.css';
import Preloader from './../../common/Preloader/Preloader';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';

const MyPosts = React.memo(({ isProfileDataLoaded, profile, posts, addPost, resetPostForm }) => {
    return <>
        {
            isProfileDataLoaded ?
                <div className={s.postsBlock}>
                    <ShadowSection padding=".9rem" height="fit-content">
                        <h3 className={styleProfile.profile__blockHeader}><b>Posts</b></h3>
                        <div>
                            <PostForm onSubmit={({ postText }) => {
                                addPost(postText);
                                resetPostForm();
                            }} />
                        </div>
                    </ShadowSection>
                    <div className={s.posts}>
                        {
                            posts.map(({ id, message, likesCount }) =>
                                <ShadowSection padding=".9rem" key={id}>
                                    <Post userImg={profile.photos.small} message={message} likesCount={likesCount} />
                                </ShadowSection>
                            )
                        }
                    </div>
                </div>
                : <Preloader />
        }
    </>;
});

export default MyPosts;