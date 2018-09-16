import React, { Component } from 'react';
import './SignIn.css';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { SignUpLink } from '../SignUp/SignUp';
import { PasswordForgetLink } from '../PasswordForget/PasswordForget';
import * as authActions from '../../actions/authActions';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
<div>
	<SignInFormAlt history={history} />
</div>

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

const INITIAL_STATE = {
	email: '',
	password: '',
	// error: null,
};



class SignInForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	componentDidMount(){
		this.props.authActions.setAuthError(null);
	}

	onSubmit = (event) => {
		const {
			email,
			password,
		} = this.state;

		const {
			history,
		} = this.props;

		this.props.authActions.doSignIn(email, password, history)
		event.preventDefault();
	}

	render() {
		const {
			email,
			password,
			// error,
		} = this.state;

		const { error } = this.props;

		const isInvalid =
		password === '' ||
		email === '';

		return (
			<div className="contentContainer signin-wrapper text-center">
				<div className="bg-img">
					<div className="overlay"></div>
				</div>
				<form className="contentWrapper form-signin" onSubmit={this.onSubmit}>

					<img className="loginLogo mb-4" src={ require('../../assets/logo.png') } width="72" height="72" alt="" />
					<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

					<input
						className="emailInput form-control"
						value={email}
						onChange={event => this.setState(byPropKey('email', event.target.value))}
						type="email"
						placeholder="Email Address"
						/>


					<input
						className="passwordInput form-control"
						value={password}
						onChange={event => this.setState(byPropKey('password', event.target.value))}
						type="password"
						placeholder="Password"
						/>

					{ error && <div className="alert alert-danger" role="alert">
							{error.message}
						</div>}


					<button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
						Sign In
					</button>



					<div className="mt-5 mb-3 text-muted">
						<PasswordForgetLink /> <SignUpLink />
					</div>
				</form>
			</div>
		);
	}
}

const SignInFormAlt = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignInForm);

const SignInLink = () =>
<p>
	Have an account?
	{' '}
	<Link to={routes.SIGN_IN}>Sign In</Link>
</p>


SignInPage.propTypes = {
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

export default withRouter(SignInPage);

export {
	SignInForm,
	SignInFormAlt,
	SignInLink
};
