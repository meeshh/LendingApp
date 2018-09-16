import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../withAuthorization';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

import TestComponent from '../TestComponent/TestComponent'

const AccountPage = ({ authUser }) =>
<div>
	{ authUser
		? <div className="container">
			<h1>Account: {authUser.email}</h1>
			<PasswordChangeLink />

			<TestComponent />
		</div>
		: null
	}
</div>

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps)
)(AccountPage);

const PasswordChangeLink = () =>
<div>
	<Link to={routes.PASSWORD_CHANGE}>Change your Password</Link>
</div>
