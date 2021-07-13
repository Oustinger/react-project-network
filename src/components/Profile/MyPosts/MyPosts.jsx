import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';

const MyPosts = React.memo(({ posts, addPost, resetPostForm }) => {
    return (
        <div className={s.postsBlock}>
            My posts
            <div>
                <PostForm onSubmit={({ postText }) => {
                    addPost(postText);
                    resetPostForm();
                }} />
            </div>
            <div className={s.posts}>
                {
                    posts.map(({ id, message, likesCount }) =>
                        <Post message={message} likesCount={likesCount} key={id} />
                    )
                }
            </div>
        </div>
    );
});

export default MyPosts;