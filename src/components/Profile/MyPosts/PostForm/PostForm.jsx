import React from "react";
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../../../utils/validators";
import { createField, Textarea } from '../../../common/FormsControls/FormsControls';

const maxLength5 = maxLengthCreator(5);

const PostForm = ({ handleSubmit }) => {
    return <form onSubmit={handleSubmit}>
        <div>
            {createField(Textarea, [maxLength5], 'postText', { placeholder: "Write a new post" })}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
};

export default reduxForm({ form: 'post' })(PostForm);