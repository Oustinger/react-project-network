import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import styles from '../common/FormsControls/FormsControls.module.css';
import { login } from './../../redux/authReducer';

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({ error, handleSubmit, captchaUrl }) => {
    if (!error) {
        (() => { })();
    };
    return <form onSubmit={handleSubmit}>
        <div>
            {createField(Input, [required, maxLength30], 'email', { placeholder: "Email" })}
        </div>
        <div>
            {createField(Input, [required, maxLength30], 'password', { placeholder: "Password" })}
        </div>
        <div>
            {createField(Input, [], 'rememberMe', { type: 'checkbox', textAfter: ' remember me' })}
        </div>
        {
            captchaUrl &&
            <img src={captchaUrl} />
        }
        {
            captchaUrl &&
            <div>
                {createField(Input, [required], 'captcha', { placeholder: 'Symbols form image' })}
            </div>
        }
        {
            error && <div className={styles.commonError}>
                {error}
            </div>
        }
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ isAuth, captchaUrl, login }) => {
    if (isAuth)
        return <Redirect to="/profile" />

    return <div>
        <h2>Login page</h2>
        <LoginReduxForm onSubmit={login} captchaUrl={captchaUrl} />
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);