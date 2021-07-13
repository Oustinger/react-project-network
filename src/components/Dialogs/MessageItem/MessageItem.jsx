import React from 'react';
import s from './../Dialogs.module.css';

const MessageItem = ({ message }) => {
    return (
        <div className={s.message}>{message}</div>
    );
};

export default MessageItem;