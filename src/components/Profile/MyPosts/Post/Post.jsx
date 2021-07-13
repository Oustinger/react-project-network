import React from 'react';
import s from './Post.module.css';

const Post = ({ message, likesCount }) => {
    return (
        <div className={s.item}>
            <img className={s.img} src="https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
            {message}
            <div>
                <span>
                    {likesCount} like
                </span>
            </div>
        </div>
    );
}

export default Post;