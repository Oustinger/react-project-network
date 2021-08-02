import React from "react";
import { reduxForm } from 'redux-form';
import { maxLengthCreator } from "../../../utils/validators";
import { createField, Textarea } from '../../common/FormsControls/FormsControls';
import stylesFormsControls from '../../common/FormsControls/FormsControls.module.css';

const maxLength15 = maxLengthCreator(15);

const DialogForm = ({ handleSubmit }) => {
    return <form onSubmit={handleSubmit} className={stylesFormsControls.form}>
        <div>
            {createField(Textarea, [maxLength15], 'messageText', { placeholder: "Write a message" })}
        </div>
        <div>
            <button>Write message</button>
        </div>
    </form>
};

export default reduxForm({ form: 'dialog' })(DialogForm);