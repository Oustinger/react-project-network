import cn from 'classnames';
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators";
import { ArrangeFormFields, createField, FormButton, Input } from "../common/FormsControls/FormsControls";
import stylesFormControls from '../common/FormsControls/FormsControls.module.css';
import ShadowSection from '../common/ShadowSection/ShadowSection';
import { login } from './../../redux/authReducer';
import s from './Login.module.css';

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({ error, handleSubmit, captchaUrl }) => {
    if (!error) {
        (() => { })();
    };
    return <form onSubmit={handleSubmit} className={s.form}>
        <ShadowSection>
            <ArrangeFormFields>
                <h2 className={stylesFormControls.fullFiled}>Login page</h2>
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
                })}
                {
                    captchaUrl &&
                    <img src={captchaUrl} className={cn(stylesFormControls.fullFiled, stylesFormControls.captchaImg)} />
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
                    error && <div className={cn(stylesFormControls.commonError, stylesFormControls.fullFiled)}>
                        {error}
                    </div>
                }
                <FormButton>Login</FormButton>
            </ArrangeFormFields>
        </ShadowSection>
    </form>
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ isAuth, captchaUrl, login }) => {
    if (isAuth)
        return <Redirect to="/profile" />

    return <div>
        <LoginReduxForm onSubmit={(formData) => Promise.all[login(formData)]} captchaUrl={captchaUrl} />
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);