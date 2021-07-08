import { reset as resetForm } from 'redux-form';

const ADD_MESSAGE = 'ADD-MESSAGE';

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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage = {
                id: state.messages.length + 1,
                message: action.text,
            };

            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        default:
            return state;
    }
};

export const addMessage = (text) => ({ type: ADD_MESSAGE, text });


export const resetDialogForm = () => (dispatch) => {
    dispatch(resetForm('dialog'));
};


export default dialogsReducer;