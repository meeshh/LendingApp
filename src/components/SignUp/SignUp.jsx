import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';
import { SignInLink } from '../SignIn/SignIn';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/authActions';

import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) =>
<div>
	<SignUpFormAlt history={history} />
</div>

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	componentDidMount(){
		this.props.authActions.setAuthError(null);
	}

	onSubmit = (event) => {
		const {
			username,
			email,
			passwordOne,
		} = this.state;

		const {
			history,
		} = this.props;

		this.props.authActions.doCreateUser(email, passwordOne, username, history);

		event.preventDefault();
	}

	render() {
		const {
			username,
			email,
			passwordOne,
			passwordTwo,
		} = this.state;

		const { error } = this.props;

		const isInvalid =
		passwordOne !== passwordTwo ||
		passwordOne === '' ||
		email === '' ||
		username === '';

		return (
			<div className="contentContainer signup-wrapper text-center">
				<div className="bg-img">
					<div className="overlay"></div>
				</div>
				<form className="contentWrapper form-signup" onSubmit={this.onSubmit}>
					<img className="loginLogo mb-4" src={ require('../../assets/logo.png') } width="72" height="72" alt="" />
					<h1 className="h3 mb-3 font-weight-normal">Please create an account</h1>


					<div className="form-group">
						<input
							className="userNameInput form-control"
							value={username}
							onChange={event => this.setState(byPropKey('username', event.target.value))}
							type="text"
							placeholder="Username"
							/>

					</div>
					<div className="form-group">
						<input
							className="emailInput form-control"
							value={email}
							onChange={event => this.setState(byPropKey('email', event.target.value))}
							type="email"
							placeholder="Email Address"
							/>
					</div>


					<div className="form-group">
						<input
							className="passwordInput form-control"
							value={passwordOne}
							onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
							type="password"
							placeholder="Password"
							/>

						<input
							className="passwordInput form-control"
							value={passwordTwo}
							onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
							type="password"
							placeholder="Confirm Password"
							/>
					</div>

					{ error && <div className="alert alert-danger" role="alert">
							{error.message}
						</div>}

					<button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
						Sign Up
					</button>

					<div className="mt-5 mb-3 text-muted">
						<SignInLink />
					</div>
				</form>
			</div>
		);
	}
}

const SignUpFormAlt = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpForm);

const SignUpLink = () =>
<p>
	Don't have an account?
	{' '}
	<Link to={routes.SIGN_UP}>Sign Up</Link>
</p>

// export default withRouter(SignUpPage);
//
// export {
// 	SignUpForm,
// 	SignUpLink,
// };


SignUpPage.propTypes = {
	authActions: PropTypes.object
};

function mapStateToProps(state) {
	return {
		authUser: state.authUser,
		error: state.sessionState.error
	};
}

function mapDispatchToProps(dispatch) {
	return {
		authActions: bindActionCreators(authActions, dispatch)
	};
}

export default withRouter(SignUpPage);

export {
	SignUpForm,
	SignUpFormAlt,
	SignUpLink
};
