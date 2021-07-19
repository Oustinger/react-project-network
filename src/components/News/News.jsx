import React from 'react';
import { compose } from 'redux';
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