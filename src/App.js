import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import UIkit from 'uikit';
import s from './App.module.css';
import withSuspect from './components/common/HOC/withSuspect';
import Preloader from './components/common/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import ModalNotifier from './components/ModalNotifier/ModalNotifier';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initialize } from './redux/app/appReducer';
import { getIsInitialized } from './redux/app/appSelectors';
import store from './redux/reduxStore';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class AppComponent extends Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        UIkit.notification({
            message: `Error occurred: ${promiseRejectionEvent.reason.message}`,
            status: 'danger',
            timeout: 5000000,
        });
        // alert("Error occurred: " + promiseRejectionEvent.reason.message);
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
            return <Preloader isAllBlockSize={true} position='relative' />;

        return (<div className={s.appWrapper}>
            <HeaderContainer />
            <Navbar />
            <div className={s.content}>
                <div className={s.contentWidthLimiter}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/profile" />} />
                        <Route path="/dialogs/:dialogId?" render={withSuspect(DialogsContainer)} />
                        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                        <Route path="/users" render={() => <UsersContainer />} />
                        <Route path="/login/facebook" render={() => <div>Facebook login page</div>} />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="*" render={() => <div><h1>404 Not found</h1></div>} />
                    </Switch>
                </div>
            </div>
            <Footer />
            <ModalNotifier />
        </div >);
    }
}

const mapStateToProps = (state) => ({ isInitialized: getIsInitialized(state) });

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