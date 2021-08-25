import cn from 'classnames';
import React, { useState } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators";
import { ArrangeFormFields, createField, FormButton, Input } from "../common/FormsControls/FormsControls";
import stylesFormsControls from '../common/FormsControls/FormsControls.module.css';
import ShadowSection from '../common/ShadowSection/ShadowSection';
import { login } from './../../redux/auth/authReducer';
import { getCaptchaUrl, getIsAuth } from './../../redux/auth/authSelectors';
import s from './Login.module.css';

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({ error, handleSubmit, captchaUrl, isFetchingLoggingIn }) => {
    return <form onSubmit={handleSubmit} className={cn(s.form, stylesFormsControls.form)}>
        <ShadowSection>
            <ArrangeFormFields>
                <h2 className={cn(s.title, stylesFormsControls.fullFiled)}>Login page</h2>
                {createField(Input, [required, maxLength30], 'email', {
                    placeholder: "Email",
                    label: 'Email',
                    type: 'email',
                })}
                {createField(Input, [required, maxLength30], 'password', {
                    placeholder: "Password",
                    label: 'Password',
                    type: 'password',
                })}
                {createField(Input, [], 'rememberMe', {
                    textAfter: ' remember me',
                    label: null,
                    type: 'checkbox',
                    checked: 'true',
                })}
                {
                    captchaUrl &&
                    <img src={captchaUrl} alt='captcha img'
                        className={cn(stylesFormsControls.fullFiled, stylesFormsControls.captchaImg)} />
                }
                {
                    captchaUrl &&
                    createField(Input, [required], 'captcha', {
                        placeholder: 'Symbols from image',
                        label: 'Captcha',
                        type: 'text',
                    })
                }
                {
                    error && <div className={cn(stylesFormsControls.commonError, stylesFormsControls.fullFiled)}>
                        {error}
                    </div>
                }
                <FormButton disabled={error || isFetchingLoggingIn}>Login</FormButton>
            </ArrangeFormFields>
        </ShadowSection>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ isAuth, captchaUrl, login }) => {
    const [isFetchingLoggingIn, toggleFetchingLoggingIn] = useState(null);

    if (isAuth) {
        return <Redirect to="/profile" />
    }

    const handleSubmit = (formData) => {
        toggleFetchingLoggingIn(true);
        Promise.all([login(formData)]).finally(() => toggleFetchingLoggingIn(false));
    };

    return <div>
        <LoginReduxForm onSubmit={handleSubmit} captchaUrl={captchaUrl}
            isFetchingLoggingIn={isFetchingLoggingIn} initialValues={{ rememberMe: true }} />
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state),
});

export default connect(mapStateToProps, { login })(Login);