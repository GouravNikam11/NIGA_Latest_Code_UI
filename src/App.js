import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../src/store';
import DefaultLayout from './components/DefaultLayout';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginComponent from './components/Login/LoginComponent';
import Forgotpassword from './components/ForgotPassword/ForgotpasswordComponent';
import AddUserComponent from './components/User/AddUserComponent';
import Notifier from './components/Notifications/notification';
// import { DiagnosisGroupMaster } from './components/DiagnosisGroupMaster'
import './App.scss';
import ProtectedRoute from './ProtectedRoute';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// const DefaultLayout = import('./components/DefaultLayout');


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Notifier />
        <Router>
          <Switch>
            <Route path='/Login' component={LoginComponent} />
            <Route path='/ForgotpasswordComponent' component={Forgotpassword}/>
            <Route path='/AddUser' component={AddUserComponent} />
            <ProtectedRoute path='/' component={DefaultLayout} />
            {/* <ProtectedRoute path="/" name="Home" render={props => <DefaultLayout {...props} />} /> */}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
