import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { login } from './../../redux/authReducer';
import Login from './Login';

const LoginContainer = (props) => {
    return <Login login={props.login} />
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { login })(LoginContainer);