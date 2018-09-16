import React, { Component } from 'react';
import './NewLoanForm.css';
import { Alert } from 'reactstrap';
import {Icon} from 'react-fa';
import moment from 'moment';
import throttle from 'lodash/throttle';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loanActions from '../../actions/loanActions';
import * as mainActions from '../../actions/mainActions';
import PropTypes from 'prop-types';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import {THROTTLE_NOTIF_THRESHOLD, FORM_CONFIG, INTEREST_CONFIG} from '../../CONFIGApp.js';

// TODO: move timers to store

class NewLoanForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(),
			monthAhead: moment().add(FORM_CONFIG.RQST_WNDW_SPAN, FORM_CONFIG.RQST_WNDW_UNIT),
			fees: 0,
			initialAmount: 0,
			total: 0,
			timer: null,
			counter: 0,
			submitTimer: null,
			submitTimerCounter: 0,
			submitTrialsQueue: []
		};
		this.resetForm = this.resetForm.bind(this);

		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		this.pageLoadTimerTick = this.pageLoadTimerTick.bind(this);
		this.submitTimerTick = this.submitTimerTick.bind(this);
		this.isMaxAmntAlwd = this.isMaxAmntAlwd.bind(this);
		this.throttleNotif = throttle(this.throttleNotif.bind(this), THROTTLE_NOTIF_THRESHOLD);
	}

	componentDidMount() {
		let timer = setInterval(this.pageLoadTimerTick, 1000);
		this.setState({
			timer : timer
		});
	}

	componentWillUnmount(){
		clearInterval(this.state.timer);
		clearInterval(this.state.submitTimer);
	}

	pageLoadTimerTick() {
		this.setState({ counter: this.state.counter + 1 });
		if (this.state.counter > FORM_CONFIG.FRM_READY_TMFRM) {
			this.setState({submitAllowed: true});
			clearInterval(this.state.timer);
		}
	}

	submitTimerTick(){
		this.setState({submitTimerCounter: this.state.submitTimerCounter + 1});

		if(this.state.submitTimerCounter >= FORM_CONFIG.SUB_TMFRM){
			if(!this.state.submitTrialsQueue){
				this.setState({submitTimerCounter: 0});
				clearInterval(this.state.submitTimer);
			} else {
				this.state.submitTrialsQueue.shift();
				this.setState({submitTimerCounter: this.state.submitTrialsQueue[0]});
			}
		}
	}

	resetForm(){
		this.setState({
			initialAmount: FORM_CONFIG.MIN_AMNT_ALLOWED,
			dueDate: '',
			fees: 0,
			total: 0
		});
	}

	throttleNotif(message, title, type, notifTimeout){
		return this.props.mainActions.throttleNotification(message, title, type, notifTimeout);
	}

	isMaxAmntAlwd(){
		if(this.state.initialAmount > FORM_CONFIG.MIN_AMNT_ALLOWED && moment(this.state.dueDate).isValid()){
			return true;
		}
		this.throttleNotif('Please make sure your form is filled.', 'Warning!', 'warning');
	}

	handleAmountFocus(event) {
		event.target.select();
	}

	handleAmountChange(event) {
		let input = (event.target.value) ? event.target.value : FORM_CONFIG.MIN_AMNT_ALLOWED
		let fees;
		let total;
		fees = (input * INTEREST_CONFIG.initial).toFixed(2);
		total = parseFloat(input) + parseFloat(fees);

		if(input > FORM_CONFIG.MAX_AMNT_ALLOWED){
			this.throttleNotif('You cannot enter a value greater than '+ FORM_CONFIG.MAX_AMNT_ALLOWED + '.', 'Warning!', 'warning');
		} else {
			this.setState({
				initialAmount: parseInt(input, 10),
				fees: fees,
				total: total
			});
		}
	}

	handleDateChange(event){
		this.setState({dueDate: moment(event, 'MM-DD-YYYY').format('YYYY-MM-DD')})
		// this.setState({dueDate: event.target.value})
	}

	handleSubmitForm() {
		if(this.isMaxAmntAlwd()){
			if(!this.state.submitAllowed && this.state.initialAmount === FORM_CONFIG.MAX_AMNT_ALLOWED){
				this.throttleNotif('You are not allowed to request the maximum amount for the moment. Please wait '+ (FORM_CONFIG.FRM_READY_TMFRM - this.state.counter) +' seconds.', 'Warning!', 'warning', 1000);

			}

			let newLoan = {
				'loan_value': this.state.initialAmount,
				'fees': this.state.fees,
				'reimburse': this.state.total,
				'due_date': this.state.dueDate,
				'extension': false
			};
			if(this.state.submitTrialsQueue.length < FORM_CONFIG.MAX_SUBS_PER_TMFRM){
				if(window.confirm('Your loan summary:\n\nAmount:\t\t€ '+newLoan.loan_value+'\nFees: ('+ parseInt(INTEREST_CONFIG.initial * 100, 10) +'%)\t€ ' + newLoan.fees + '\nReimburse:\t€ ' + newLoan.reimburse + '\nDue:\t\t' + newLoan.due_date + '\n\nPress OK to proceed.')) {

					if(this.state.submitTrialsQueue.length === 0){
						let submitTimer = setInterval(this.submitTimerTick, 1000);
						this.setState({submitTimer : submitTimer});
					}
					this.state.submitTrialsQueue.push(this.state.submitTimerCounter);

					this.props.loanActions.addLoan(newLoan);


					this.setState({...this.resetForm()});
					this.throttleNotif('Your Loan has been approved.', 'Congratulations!', 'success');
					this.props.toggle();

				} else {
					console.log('you canceled');
				}
			} else {
				this.throttleNotif('You cannot request more than 3 Loans per minute. Please wait ' + (FORM_CONFIG.SUB_TMFRM - this.state.submitTimerCounter) + ' seconds till your next allowance.', 'Warning!', 'warning');
			}
		}
	}

	render(){
		return(
			<div className="formWrapper">

				<div className="formBody">
					<div className="formControlsWrapper">
						<div className="form-group">
							<label> Amount</label>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text"><Icon name="eur" /></span>
								</div>
								<input className="form-control" type="number" placeholder="Enter Amount" min={FORM_CONFIG.MIN_AMNT_ALLOWED} max={FORM_CONFIG.MAX_AMNT_ALLOWED} value={parseInt(this.state.initialAmount, 10)} onChange={this.handleAmountChange.bind(this)} onFocus={this.handleAmountFocus.bind(this)}  />
							</div>

						</div>
						<div className="form-group">
							<label>Reimbursement Date</label>

							<InfiniteCalendar
								displayOptions={{
									layout: 'portrait'
								}}
								width={472}
								height={300}
								min={moment(this.state.date, 'MM-DD-YYYY').endOf('month').toDate()}
								max={moment(this.state.date, 'MM-DD-YYYY').add('months', 1).endOf('month').toDate()}
								minDate={moment(this.state.date, 'MM-DD-YYYY').toDate()}
								maxDate={moment(this.state.monthAhead, 'MM-DD-YYYY').toDate()}
								selected={(this.state.dueDate) ? moment(this.state.dueDate).toDate() : ''}
								onSelect={this.handleDateChange.bind(this)}
								/>
						</div>

						<div className="center">
							<button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmitForm}>Submit</button>
						</div>
					</div>

					<Alert color="light" className="summaryWrapper">
						<div className="simulatorDisplay">Loan: <span className="simulatorValue">{ parseInt(this.state.initialAmount, 10) } €</span> </div>
						<div className="simulatorDisplay">Fees: <span className="simulatorValue">{this.state.fees} €</span></div>
						<div className="simulatorDisplay">Reimburse: <span className="simulatorValue">{this.state.total} €</span></div>
						<div className="simulatorDisplay">Due: <span className="simulatorValue">{this.state.dueDate}</span></div>
					</Alert>
				</div>
			</div>
		);
	}
}

NewLoanForm.propTypes = {
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewLoanForm);
