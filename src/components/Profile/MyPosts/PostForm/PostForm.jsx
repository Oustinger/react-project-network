import cn from 'classnames';
import React from "react";
import { reduxForm } from 'redux-form';
import { maxLengthCreator } from "../../../../utils/validators";
import { createField, FormButton, Textarea } from '../../../common/FormsControls/FormsControls';
import stylesFormsControls from '../../../common/FormsControls/FormsControls.module.css';
import s from '../MyPosts.module.css';

const maxLength150 = maxLengthCreator(150);

const PostForm = ({ handleSubmit }) => {
    return <form onSubmit={handleSubmit} className={cn(stylesFormsControls.form, s.form)}>
        <div>
            {createField(Textarea, [maxLength150], 'postText', { placeholder: "Write a new post" })}
        </div>
        <div>
            <FormButton isMedium={true} className={s.form__btn}>Add post</FormButton>
        </div>
    </form>
};

export default reduxForm({ form: 'post' })(PostForm);