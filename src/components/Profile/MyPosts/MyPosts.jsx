import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    const postsElements = props.posts.map(({ id, message, likesCount }) =>
        <Post message={message} likesCount={likesCount} key={id} />
    );

    const newPostElement = React.createRef();

    const onAddPost = () => {
        props.addPost();
    };

    const onUpdateNewPostText = () => {
        const newText = newPostElement.current.value;
        props.updateNewPostText(newText);
    };

    return (
        <div className={s.postsBlock}>
            My posts
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onUpdateNewPostText} value={props.newPostText} />
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    );
}

export default MyPosts;