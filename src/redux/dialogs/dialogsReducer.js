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
        { id: 5, dialogName: 'Irina', companions: [5] },
    ],
    messages: [
        { id: 1, dialogId: 1, authorId: 1, message: 'Hi' },
        { id: 2, dialogId: 1, authorId: 1, message: 'How are you?' },
        { id: 3, dialogId: 1, authorId: 0, message: 'Hi! I\'m OK!' },
    ],
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage = {
                id: state.messages.length + 1,
                authorId: 0,
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
                activeDialogId: action.payload,
            };
        }
        default:
            return state;
    }
};

export const addMessage = (payload) => ({ type: ADD_MESSAGE, payload });
export const setActiveDialog = (payload) => ({ type: SET_ACTIVE_DIALOG, payload });


export const resetDialogForm = () => (dispatch) => {
    dispatch(resetForm('dialog'));
};


export default dialogsReducer;