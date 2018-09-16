import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './Navigation/Navigation';
import LandingPage from './Landing/Landing';
import SignUpPage from './SignUp/SignUp';
import SignInPage from './SignIn/SignIn';
import PasswordForgetPage from './PasswordForget/PasswordForget';
import PasswordChangePage from './PasswordChange/PasswordChange';
import HomePage from './Home/Home';
import AccountPage from './Account/Account';
import withAuthentication from './withAuthentication';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';

import * as routes from '../constants/routes';


class App extends Component {
	render() {
		return (
			<div className="appWrapper">
				<Router>
					<div>
						<Navigation />

						<Route
							exact path={routes.LANDING}
							component={LandingPage}
							/>
						<Route
							exact path={routes.SIGN_UP}
							component={SignUpPage}
							/>
						<Route
							exact path={routes.SIGN_IN}
							component={SignInPage}
							/>
						<Route
							exact path={routes.PASSWORD_FORGET}
							component={PasswordForgetPage}
							/>
							<Route
								exact path={routes.PASSWORD_CHANGE}
								component={PasswordChangePage}
								/>
						<Route
							exact path={routes.HOME}
							component={HomePage}
							/>
						<Route
							exact path={routes.ACCOUNT}
							component={AccountPage}
							/>
					</div>
				</Router>
				<NotificationContainer/>
			</div>
		);
	}
}

export default withAuthentication(App);
