import { reset as resetForm } from 'redux-form';

const ADD_MESSAGE = 'network/dialogs/ADD-MESSAGE';
const SET_ACTIVE_DIALOG = 'network/dialogs/SET_ACTIVE_DIALOG';

const initialState = {
    activeDialogId: null,
    authors: [
        { id: 0, name: 'Me' },
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Dmitry' },
        { id: 3, name: 'Sophia' },
        { id: 4, name: 'Sergei' },
        { id: 5, name: 'Irina' },
    ],
    dialogs: [
        { id: 1, dialogName: 'Brother', companions: [1] },
        { id: 2, dialogName: 'Dmitry', companions: [2] },
        { id: 3, dialogName: 'Sophia', companions: [3] },
        { id: 4, dialogName: 'Sergei', companions: [4] },
        { id: 5, dialogName: 'Irina', companions: [5, 1] },
    ],
    messages: [
        { id: 1, dialogId: 1, authorId: 1, message: 'Hi' },
        { id: 2, dialogId: 1, authorId: 1, message: 'How are you?' },
        { id: 3, dialogId: 1, authorId: 0, message: 'Hi! I\'m OK!' },
        { id: 4, dialogId: 2, authorId: 2, message: 'Your profile page is awesome!' },
        { id: 5, dialogId: 2, authorId: 0, message: 'Thanks)' },
        { id: 6, dialogId: 3, authorId: 0, message: 'Hi! What\'s up?)' },
        { id: 7, dialogId: 4, authorId: 4, message: 'Hi' },
        { id: 8, dialogId: 4, authorId: 4, message: 'We are going to the lake tomorrow' },
        { id: 9, dialogId: 4, authorId: 4, message: 'Do you want to join us?' },
        { id: 10, dialogId: 4, authorId: 0, message: 'Hi!' },
        { id: 11, dialogId: 4, authorId: 0, message: 'Yeah, of course' },
        { id: 12, dialogId: 4, authorId: 0, message: 'It would be great)' },
        { id: 13, dialogId: 4, authorId: 4, message: 'Super!' },
        { id: 14, dialogId: 4, authorId: 4, message: 'Ok, see you at our house at 9:30 tomorrow' },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage = {
                id: state.messages.length + 1,
                ...action.payload,
            };

            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        case SET_ACTIVE_DIALOG: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
};

export const addMessage = ({ message, dialogId }) => ({
    type: ADD_MESSAGE,
    payload: {
        message,
        dialogId,
        authorId: 0,
    }
});
export const setActiveDialog = (activeDialogId) => ({ type: SET_ACTIVE_DIALOG, payload: { activeDialogId } });


export const resetDialogForm = () => (dispatch) => {
    dispatch(resetForm('dialog'));
};


export default dialogsReducer;