import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/authActions';


const SignOut = ({ history }) =>
<div>
	<SignOutButtonAlt history={history} />
</div>

class SignOutButton extends Component{
	onSubmit = (event) => {

		const {
			history,
		} = this.props;

		this.props.authActions.doSignOut(history);

		event.preventDefault();
	}

	render(){
		return(
			<button
				className="btn btn-secondary"
				type="button"
				onClick={this.onSubmit}
				>
				Sign Out
			</button>
		)
	}

}

const SignOutButtonAlt = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignOutButton);

// export default withRouter(SignOut);
//
// export {SignOutButton};

SignOut.propTypes = {
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

export default withRouter(SignOut);

export {
	SignOutButton,
	SignOutButtonAlt
};
