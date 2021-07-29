import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import s from './App.module.css';
import withSuspect from './components/common/HOC/withSuspect';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { initialize } from './redux/appReducer';
import store from './redux/reduxStore';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class AppComponent extends Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("Error occurred: " + promiseRejectionEvent.reason.message);
    }

    componentDidMount() {
        this.props.initialize();

        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.isInitialized)
            return <Preloader />;

        return (<div className={s.appWrapper}>
            <HeaderContainer />
            <Navbar />
            <div className={`${s.content} section`}>
                <Switch >
                    <Route exact path="/" render={() => <Redirect to="/profile" />} />
                    <Route path="/dialogs" render={withSuspect(DialogsContainer)} />
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route path="/news" render={() => <News />} />
                    <Route path="/music" render={() => <Music />} />
                    <Route path="/settings" render={() => <Settings />} />
                    <Route path="/login/facebook" render={() => <div>Facebook login page</div>} />
                    <Route path="/login" render={() => <Login />} />
                    <Route path="*" render={() => <div>404 Not found</div>} />
                </Switch>
            </div>
        </div >);
    }
}

const mapStateToProps = (state) => {
    return { isInitialized: state.app.isInitialized }
};

const AppComponentContainer = compose(
    connect(mapStateToProps, { initialize }),
    withRouter,
)(AppComponent);

const App = () => (
    <HashRouter>
        <Provider store={store}>
            <AppComponentContainer />
        </Provider>
    </HashRouter>
);

export default App;