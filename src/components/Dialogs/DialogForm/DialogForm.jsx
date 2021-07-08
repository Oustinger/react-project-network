import React from "react";
import { Field, reduxForm } from 'redux-form';

const DialogForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component='textarea' name='messageText' placeholder="Write a message" />
        </div>
        <div>
            <button>Write message</button>
        </div>
    </form>
};

export default reduxForm({ form: 'dialog' })(DialogForm);