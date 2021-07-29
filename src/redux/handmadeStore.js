import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

const store = {
    _state: {
        profilePage: {
            posts: [
                { id: '1', message: 'Hi! Like this post!', likesCount: '25' },
                { id: '2', message: 'Hello, friends!!!', likesCount: '12' },
                { id: '3', message: 'My first post! :)', likesCount: '10' },
            ],
            newPostText: '',
        },
        dialogsPage: {
            dialogs: [
                { id: '1', name: 'Alex' },
                { id: '2', name: 'Dmitry' },
                { id: '3', name: 'Sophia' },
                { id: '4', name: 'Sergei' },
                { id: '5', name: 'Irina' },
            ],
            messages: [
                { id: '1', message: 'Hi' },
                { id: '2', message: 'How are you?' },
                { id: '3', message: 'Hi! I\'m OK!' },
            ],
            newMessageText: '',
        },
    },
    _callSubscriber() { },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);

        this._callSubscriber(this._state);
    },
};

export default store;