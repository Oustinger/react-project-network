import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import dialogsReducer from "./dialogs/dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

window.state = () => store.getState();

export default store;