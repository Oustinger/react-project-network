import React from 'react';
import { compose } from 'redux';
import s from './Settings.module.css';
import { withAuthRedirect } from './../common/HOC/withAuthRedirect';

const Settings = () => {
    return (
        <div>
            Settings
        </div>
    );
}

export default compose(
    withAuthRedirect
)(Settings);