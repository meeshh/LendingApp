import React, { Component } from 'react';
import './LoansTable.css';
import {Icon} from 'react-fa';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import NewLoanForm from '../NewLoanForm/NewLoanForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanActions from '../../actions/loanActions';
import PropTypes from 'prop-types';

import LoanItem from '../LoanItem/LoanItem';

class LoansTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			modal: false
		};

		this.renderTable = this.renderTable.bind(this);
		this.renderLoadingData = this.renderLoadingData.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentWillMount(){
		this.props.loanActions.fetchLoans();
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	renderTable(){
		return (
			<div className="table-responsive-lg">
				<table className="table">
					<thead>
						<tr>
							<th scope="col"><span className="currency"><Icon name="euro" /></span> Loan</th>
							<th scope="col">Rate</th>
							<th scope="col"><span className="currency"><Icon name="euro" /></span> Fees</th>
							<th scope="col">Due</th>
							<th scope="col"><span className="currency"><Icon name="euro" /></span> Reimburse</th>
							<th scope="col" className="text-sm-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							Object.keys(this.props.loans).map(
								(key) => (
									<LoanItem key={key} id={key} loan={this.props.loans[key]} />
								)
							)
						}
					</tbody>
				</table>
			</div>
		)

	}
	renderLoadingData(){
		return(
			<div>Loading</div>
		)
	}

	render(){
		return(
			<div className="loansTableWrapper">
				<div className="tableRow row sectionHeader">

						<div className="tableLoanCellHeader col-sm-8">Loan History</div>
						<div className="tableLoanCellHeader col-sm-4 text-right">
							<button className="btn btn-secondary" onClick={this.toggle}>Request Loan</button>
							<Modal isOpen={this.state.modal}  className="newLoanModal">
								<ModalHeader toggle={this.toggle}>Request a Loan</ModalHeader>
								<ModalBody>
									<NewLoanForm toggle={this.toggle} />
								</ModalBody>
							</Modal>
						</div>
				</div>

				{ this.renderTable() }

			</div>
		);
	}
}

LoansTable.propTypes = {
	loanActions: PropTypes.object
};

function mapStateToProps(state) {
	return {
		loans: state.loans
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loanActions: bindActionCreators(loanActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoansTable);
