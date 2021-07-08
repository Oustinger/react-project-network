import React from 'react';
import { compose } from 'redux';
import s from './Music.module.css';
import { withAuthRedirect } from './../common/HOC/withAuthRedirect';

const Music = () => {
    return (
        <div>
            Music
        </div>
    );
}

export default compose(
    withAuthRedirect,
)(Music);