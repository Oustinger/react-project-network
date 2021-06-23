const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const initialState = {
    dialogs: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Dmitry' },
        { id: 3, name: 'Sophia' },
        { id: 4, name: 'Sergei' },
        { id: 5, name: 'Irina' },
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Hi! I\'m OK!' },
    ],
    newMessageText: '',
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage = {
                id: state.messages.length + 1,
                message: state.newMessageText,
            };

            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: '',
            };
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newText,
            };
        }
        default:
            return state;
    }
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageTextActionCreator = (newText) => (
    { type: UPDATE_NEW_MESSAGE_TEXT, newText }
);

export default dialogsReducer;