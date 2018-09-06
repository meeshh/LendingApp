import React, { Component } from 'react';
import './LoanItem.css';
import moment from 'moment';
import {Icon} from 'react-fa';
import throttle from 'lodash/throttle';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as loanActions from '../../actions/loanActions';
import * as mainActions from '../../actions/mainActions';
import PropTypes from 'prop-types';

import {THROTTLE_NOTIF_THRESHOLD, INTEREST_CONFIG} from '../../CONFIGApp.js';

class LoanItem extends Component {
	constructor(props) {
		super(props);
		this.extendLoan = throttle(this.extendLoan.bind(this), THROTTLE_NOTIF_THRESHOLD);
		this.deleteLoan = throttle(this.deleteLoan.bind(this), THROTTLE_NOTIF_THRESHOLD);
	}

	deleteLoan(indexkey){
		if(window.confirm('Are you sure you want to delete the history of this loan?')) {
			this.props.loanActions.deleteLoan(indexkey);
			return this.props.mainActions.throttleNotification('Your loan has been deleted', 'Congratulations', 'success');
		} else {
			console.log('you canceled');
		}
	}

	extendLoan(indexkey){
		let newInterestRate = INTEREST_CONFIG.initial * INTEREST_CONFIG.extension_factor;
		let fees = parseInt(this.props.loans[indexkey].loan_value, 10) * newInterestRate;
		let reimburse = parseInt(this.props.loans[indexkey].loan_value, 10) + fees;
		let due_date = moment(this.props.loans[indexkey].due_date).add(1, 'week').format('YYYY-MM-DD');
		let extObj = {
			id: indexkey,
			obj: {
				due_date: due_date,
				fees: fees.toFixed(2),
				reimburse: reimburse
			}
		}

		if(window.confirm('You are attempting to extend your loan for 1 week.\nYour interest rate will increase by a factor of ' + INTEREST_CONFIG.extension_factor + ' and becomes '+ parseInt(INTEREST_CONFIG.initial * INTEREST_CONFIG.extension_factor * 100, 10) +'%. \nYou will have to reimburse ' + reimburse + '€ on ' + due_date + '.\n\nPress OK to proceed.')) {
			this.props.loanActions.extendLoan(extObj);
			return this.props.mainActions.throttleNotification('Your loan extension has been approved', 'Congratulations', 'success');
		} else {
			console.log('you canceled');
		}
	}

	render(){
		return(
			<tr>
				<td>{this.props.loan.loan_value}</td>
				<td>
					<div className={(this.props.loan.extension) ? 'striked' : '' }>{(INTEREST_CONFIG.initial).toFixed(2) * 100}%</div>
					<div>{(this.props.loan.extension) ? ((INTEREST_CONFIG.initial * INTEREST_CONFIG.extension_factor).toFixed(2) * 100)+ '%' : ''}</div>
				</td>
				<td>
					<div className={(this.props.loan.extension) ? 'striked' : '' }>{this.props.loan.fees }</div>
					<div>{(this.props.loan.extension) ? this.props.loan.extension.fees : '' }</div>
				</td>
				<td>
					<div className={(this.props.loan.extension) ? 'striked' : '' }>{this.props.loan.due_date}</div>
					<div>{(this.props.loan.extension) ? this.props.loan.extension.due_date : ''}</div>
				</td>
				<td>
					<div className={(this.props.loan.extension) ? 'striked' : '' }>{this.props.loan.reimburse }</div>
					<div>{(this.props.loan.extension) ? this.props.loan.extension.reimburse : '' }</div>
				</td>
				<td className="text-sm-right">
					<button className="btn btn-primary" onClick={() => this.extendLoan(this.props.id)} disabled={(this.props.loan.extension) ? true : false}>extend</button>
					<button className="btn btn-danger" onClick={() => this.deleteLoan(this.props.id)}><Icon name="trash" /></button>
				</td>
			</tr>
		);
	}
}

LoanItem.propTypes = {
	loanActions: PropTypes.object,
	mainActions: PropTypes.object
};

function mapStateToProps(state) {
	return {
		loans: state.loans
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loanActions: bindActionCreators(loanActions, dispatch),
		mainActions: bindActionCreators(mainActions, dispatch)
	};
}

// export default LoanItem;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoanItem);
