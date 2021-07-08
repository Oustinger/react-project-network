import React from 'react';
import { compose } from 'redux';
import s from './News.module.css';
import { withAuthRedirect } from './../common/HOC/withAuthRedirect';

const News = () => {
    return (
        <div>
            News
        </div>
    );
}

export default compose(
    withAuthRedirect,
)(News);