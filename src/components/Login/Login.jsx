import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../validators/validators";
import { Input } from "../FormsControls/FormsControls";

const maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder='email' name='email' component={Input}
                validate={[required, maxLength30]} />
        </div>
        <div>
            <Field placeholder='password' name='password' component={Input}
                validate={[required, maxLength30]} />
        </div>
        <div>
            <div>
                <Field name='rememberMe' type='checkbox' component={Input} />
            </div>
            <div> remember me</div>
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    return <div>
        <h2>Login page</h2>
        <LoginReduxForm onSubmit={props.login} />
    </div>
};

export default Login;