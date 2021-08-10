import cn from 'classnames';
import React from "react";
import { reduxForm } from 'redux-form';
import { maxLengthCreator } from "../../../utils/validators";
import { createField, FormButton, Textarea } from '../../common/FormsControls/FormsControls';
import stylesFormsControls from '../../common/FormsControls/FormsControls.module.css';
import s from '../Dialogs.module.css';

const maxLength150 = maxLengthCreator(150);

const DialogForm = ({ handleSubmit }) => {
    return <form onSubmit={handleSubmit} className={cn(stylesFormsControls.form, s.form)}>
        <div>
            {createField(Textarea, [maxLength150], 'message', { placeholder: "Write a message" })}
        </div>
        <div>
            <FormButton isMedium={true} float="right">Send</FormButton>
        </div>
    </form>
};

export default reduxForm({ form: 'dialog' })(DialogForm);