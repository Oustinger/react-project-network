import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';

const MyPosts = (props) => {
    return (
        <div className={s.postsBlock}>
            My posts
            <div>
                <PostForm onSubmit={({ postText }) => {
                    props.addPost(postText);
                    props.resetPostForm();
                }} />
            </div>
            <div className={s.posts}>
                {
                    props.posts.map(({ id, message, likesCount }) =>
                        <Post message={message} likesCount={likesCount} key={id} />
                    )
                }
            </div>
        </div>
    );
}

export default MyPosts;