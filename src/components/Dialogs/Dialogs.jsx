import React from 'react';
import DialogForm from './DialogForm/DialogForm';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import MessageItem from './MessageItem/MessageItem';

const Dialogs = ({ dialogsPage, addMessage, resetDialogForm }) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {
                    dialogsPage.dialogs.map(({ id, name }) => (
                        <DialogItem name={name} id={id} key={id} />
                    ))
                }
            </div>
            <div className={s.messages}>
                <div>
                    {
                        dialogsPage.messages.map(({ id, message }) => (
                            <MessageItem message={message} key={id} />
                        ))
                    }
                </div>
                <div className={s.newMessageBlock}>
                    <DialogForm onSubmit={({ messageText }) => {
                        addMessage(messageText);
                        resetDialogForm();
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Dialogs;