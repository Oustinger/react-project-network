import React from "react";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength15 = maxLengthCreator(15);

const DialogForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name='messageText' placeholder="Write a message"
                validate={[required, maxLength15]} />
        </div>
        <div>
            <button>Write message</button>
        </div>
    </form>
};

export default reduxForm({ form: 'dialog' })(DialogForm);