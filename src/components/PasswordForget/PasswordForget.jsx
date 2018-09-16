import React, { Component } from 'react';
import './PasswordForget.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/authActions';
import * as routes from '../../constants/routes';

const PasswordForgetPage = ({history}) =>
<div>
	<PasswordForgetFormTemp history={history} />
</div>

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

const INITIAL_STATE = {
	email: '',
};

class PasswordForgetForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	componentDidMount(){
		this.props.authActions.setAuthError(null);
	}

	onSubmit = (event) => {
		const { email } = this.state;

		const {
			history,
		} = this.props;

		this.props.authActions.doPasswordReset(email, history);

		event.preventDefault();
	}

	render() {
		const {
			email,
		} = this.state;

		const { error } = this.props;

		const isInvalid = email === '';

		return (
			<div className="contentContainer pwforget-wrapper text-center">
				<div className="bg-img">
					<div className="overlay"></div>
				</div>
				<form className="contentWrapper form-pwforget" onSubmit={this.onSubmit}>
					<img className="loginLogo mb-4" src={ require('../../assets/logo.png') } width="72" height="72" alt="" />
					<h1 className="h3 mb-3 font-weight-normal">Forgot your password?</h1>

					<input
						className="form-control"
						value={this.state.email}
						onChange={event => this.setState(byPropKey('email', event.target.value))}
						type="text"
						placeholder="Email Address"
						/>

					{ error && <div className="alert alert-danger" role="alert">
						{error.message}
					</div>}

					<button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
						Reset My Password
					</button>
				</form>
			</div>

		);
	}
}

const PasswordForgetFormTemp = connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordForgetForm);

const PasswordForgetLink = () =>
<p>
	<Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
</p>


PasswordForgetPage.propTypes = {
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

export default PasswordForgetPage;

export {
	PasswordForgetForm,
	PasswordForgetFormTemp,
	PasswordForgetLink,
};
