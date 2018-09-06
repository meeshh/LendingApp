import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NewLoanForm from './NewLoanForm/NewLoanForm';
import LoansTable from './LoansTable/LoansTable';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class App extends Component {
	render() {
		return (
			<div className="appWrapper">
				<NewLoanForm />

				<LoansTable />

				<NotificationContainer/>
			</div>
		);
	}
}

export default App;
