import React, { Component }  from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../withAuthorization';
import { db } from '../../firebase';

class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: null
		};
	}

	componentDidMount() {
		const { onSetUsers } = this.props;

		db.onceGetUsers().then(snapshot =>
			onSetUsers(snapshot.val())
		);
	}

	render() {
		const { users } = this.props;

		return (
			<div className="testWrapper ">
				<div>
					<h1>Home</h1>
					<p>The Home Page is accessible by every signed in user.</p>

					{ !!users && <UserList users={users} /> }
				</div>
			</div>
		);
	}
}

const UserList = ({ users }) =>
<div>
	<h2>List of Usernames of Users</h2>
	<p>(Saved on Sign Up in Firebase Database)</p>

	{Object.keys(users).map(key =>
		<div key={key}>
			<span>{users[key].username}</span>:
			<span>{users[key].email}</span>
		</div>

	)}
</div>

const authCondition = (authUser) => !!authUser;

const mapStateToProps = (state) => ({
	users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
	onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps, mapDispatchToProps)
)(Test);
