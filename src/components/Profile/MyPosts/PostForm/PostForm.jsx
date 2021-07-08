import React from "react";
import { Field, reduxForm } from 'redux-form';

const PostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component='textarea' name='postText' placeholder="Write a new post" />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
};

export default reduxForm({ form: 'post' })(PostForm);