import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './PasswordChange.css';
import withAuthorization from '../withAuthorization';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/authActions';

const PasswordChangePage = ({ history }) =>
<div>
	<PasswordChangeFormTemp history={history} />
</div>

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
};

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	componentDidMount(){
		this.props.authActions.setAuthError(null);
	}

	onSubmit = (event) => {
		const { passwordOne } = this.state;

		const {
			history,
		} = this.props;

		this.props.authActions.doPasswordUpdate(passwordOne, history);

		event.preventDefault();
	}

	render() {
		const {
			passwordOne,
			passwordTwo
		} = this.state;

		const { error } = this.props;

		const isInvalid =
		passwordOne !== passwordTwo ||
		passwordOne === '';

		return (
			<div className="contentContainer pwchange-wrapper text-center">
				<div className="bg-img">
					<div className="overlay"></div>
				</div>
				<form className="contentWrapper form-pwchange" onSubmit={this.onSubmit}>
					<img className="loginLogo mb-4" src={ require('../../assets/logo.png') } width="72" height="72" alt="" />
					<h1 className="h3 mb-3 font-weight-normal">Please type in your new password</h1>

					<input
						className="passwordInput form-control"
						value={passwordOne}
						onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
						type="password"
						placeholder="New Password"
						/>
					<input
						className="confPasswordInput form-control"
						value={passwordTwo}
						onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
						type="password"
						placeholder="Confirm New Password"
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



const authCondition = (authUser) => !!authUser;

const PasswordChangeFormTemp = connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordChangeForm);

PasswordChangePage.propTypes = {
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

export default withAuthorization(authCondition)(withRouter(PasswordChangePage));

export {
	PasswordChangeForm,
	PasswordChangeFormTemp
};
