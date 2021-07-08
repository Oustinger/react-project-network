import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../validators/validators";
import { Input } from "../FormsControls/FormsControls";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './../../redux/authReducer';
import styles from '../FormsControls/FormsControls.module.css';

const maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder='Email' name='email' component={Input}
                validate={[required, maxLength30]} />
        </div>
        <div>
            <Field placeholder='Password' name='password' component={Input}
                validate={[required, maxLength30]} />
        </div>
        <div>
            <div>
                <Field name='rememberMe' type='checkbox' component={Input} />
            </div>
            <div> remember me</div>
        </div>
        {
            props.error && <div className={styles.commonError}>
                {props.error}
            </div>
        }
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    if (props.isAuth)
        return <Redirect to="/profile" />

    return <div>
        <h2>Login page</h2>
        <LoginReduxForm onSubmit={props.login} />
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);