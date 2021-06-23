import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import MessageItem from './MessageItem/MessageItem';

const Dialogs = (props) => {
    const dialogsElements = props.dialogsPage.dialogs.map(({ id, name }) => <DialogItem name={name} id={id} key={id} />);

    const messagesElements = props.dialogsPage.messages.map(({ id, message }) => <MessageItem message={message} key={id} />);

    const newMessageElement = React.createRef();

    const onAddMessage = () => {
        props.addMessage();
    };

    const onUpdateNewMessageText = () => {
        const newText = newMessageElement.current.value;
        props.updateNewMessageText(newText);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <div className={s.newMessageBlock}>
                    <div>
                        <textarea ref={newMessageElement}
                            onChange={onUpdateNewMessageText}
                            value={props.dialogsPage.newMessageText}
                            placeholder="Write a message" />
                    </div>
                    <div>
                        <button onClick={onAddMessage}>Write message</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;