import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={'email'} name={'email'} component={'input'} />
        </div>
        <div>
            <Field placeholder={'password'} name={'password'} component={'input'} />
        </div>
        <div>
            <Field name={'rememberMe'} type={'checkbox'} component={'input'} /> remember me
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