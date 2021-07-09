import React from "react";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../../../utils/validators/validators";
import { Textarea } from '../../../common/FormsControls/FormsControls';

const maxLength5 = maxLengthCreator(5);

const PostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name='postText' placeholder="Write a new post"
                validate={[required, maxLength5]} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
};

export default reduxForm({ form: 'post' })(PostForm);