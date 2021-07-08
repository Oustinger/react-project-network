import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import MessageItem from './MessageItem/MessageItem';
import DialogForm from './DialogForm/DialogForm';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {
                    props.dialogsPage.dialogs.map(({ id, name }) => (
                        <DialogItem name={name} id={id} key={id} />
                    ))
                }
            </div>
            <div className={s.messages}>
                <div>
                    {
                        props.dialogsPage.messages.map(({ id, message }) => (
                            <MessageItem message={message} key={id} />
                        ))
                    }
                </div>
                <div className={s.newMessageBlock}>
                    <DialogForm onSubmit={({ messageText }) => {
                        props.addMessage(messageText);
                        props.resetDialogForm();
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Dialogs;