import React from 'react';
import { connect } from 'react-redux';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';

const withAuthentication = (Component) => {
	class WithAuthentication extends React.Component {

		constructor(props) {
			super(props);

			this.state = {
				authUser: null,
			};
		}

		componentDidMount() {
			const { onSetAuthUser } = this.props;

			firebase.auth.onAuthStateChanged(authUser => {
				authUser
				// ? this.setState({ authUser })
				// : this.setState({ authUser: null });
				? onSetAuthUser(authUser)
				: onSetAuthUser(null);
			});
		}

		render() {
			const { authUser } = this.state;

			return (
				<AuthUserContext.Provider value={authUser}>
				<Component />
				</AuthUserContext.Provider>
			);
		}
	}

	// return WithAuthentication;

	const mapDispatchToProps = (dispatch) => ({
		onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
	});

	return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;
