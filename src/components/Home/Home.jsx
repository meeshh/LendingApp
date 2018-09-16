import React, { Component }  from 'react';
import './Home.css';
import LoansTable from '../LoansTable/LoansTable';
import { compose } from 'recompose';
import withAuthorization from '../withAuthorization';

class HomePage extends Component {
	render() {
		return (
			<div className="homeWrapper ">
				<LoansTable />
			</div>
		);
	}
}

const authCondition = (authUser) => !!authUser;
export default compose(
	withAuthorization(authCondition),
)(HomePage);
