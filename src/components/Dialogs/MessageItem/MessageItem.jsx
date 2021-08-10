import s from './../Dialogs.module.css';
import userImg from '../../../assets/imgs/user.png';

const MessageItem = ({ message, author, photoMe }) => {
    return (
        <div className={s.message}>
            {
                author.id === 0 ?
                    <div className={s.message__me}>
                        <span>{message}</span>
                        <img src={photoMe} />
                    </div>
                    : <div className={s.message__companion}>
                        <div className={s.message__imgContainer}>
                            <img src={userImg} />
                        </div>
                        <span>{message}</span>
                    </div>
            }
        </div>
    );
};

export default MessageItem;