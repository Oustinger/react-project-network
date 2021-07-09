import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { initialize } from './redux/appReducer';

class App extends React.Component {
    componentDidMount() {
        this.props.initialize();
    }

    render() {
        if (!this.props.isInitialized)
            return <Preloader />;

        return (<div className="app-wrapper">
            <HeaderContainer />
            <Navbar />
            <div className="app-wrapper_content">
                <Route path="/dialogs" render={() => <DialogsContainer />} />
                <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settings" render={() => <Settings />} />
                <Route path="/login" render={() => <Login />} />
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized,
});

export default compose(
    connect(mapStateToProps, { initialize }),
    withRouter,
)(App);