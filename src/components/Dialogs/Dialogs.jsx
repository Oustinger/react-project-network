import React from 'react';
import DialogForm from './DialogForm/DialogForm';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import MessageItem from './MessageItem/MessageItem';
import ShadowSection from '../common/ShadowSection/ShadowSection';

const Dialogs = ({ dialogs, findCompanion, messages, onFormSubmit, photoMe, activeDialogId }) => {
    const companionName = activeDialogId && findCompanion(
        dialogs.find(
            ({ id }) => id === activeDialogId
        ).companions[0]
    ).name;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <ShadowSection>
                    {
                        dialogs.map(({ id, dialogName }) => (
                            <DialogItem name={dialogName} id={id} key={id} activeId={activeDialogId} />
                        ))
                    }
                </ShadowSection>
            </div>
            <div className={s.messages}>
                <ShadowSection padding=".9rem">
                    {
                        activeDialogId ?
                            <>
                                <div className={s.messages__head}>
                                    <h2><b>Dialog with {companionName}</b></h2>
                                    <hr></hr>
                                </div>
                                <div className={s.messages__itemsList}>
                                    {
                                        messages.map(({ id, authorId, message }) => (
                                            <MessageItem message={message} key={id} photoMe={photoMe}
                                                author={findCompanion(authorId)} />
                                        ))
                                    }
                                </div>
                                <div className={s.newMessageBlock}>
                                    <DialogForm onSubmit={onFormSubmit} />
                                </div>
                            </>
                            : <div><b>Chose the dialog</b></div>
                    }
                </ShadowSection>
            </div>
        </div>
    );
}

export default Dialogs;