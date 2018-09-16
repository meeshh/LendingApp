import React, { Component }  from 'react';
import './Landing.css';
import * as routes from '../../constants/routes';

class SignUpButton extends Component{
	onSubmit = (event) => {

		const {
			history,
		} = this.props;

		history.push(routes.SIGN_UP);

		event.preventDefault();
	}

	render(){
		return(
			<button
				className="btn btn-primary btn-lg"
				type="button"
				onClick={this.onSubmit}
				>
				Get Started!
			</button>
		)
	}

}

const LandingPage = ({ history }) =>
<div className="contentContainer homeWrapper">
	<div className="bg-img">
		<div className="overlay"></div>
	</div>

	<div className="contentWrapper">
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="home-content">
						<h2>Get up to 400€ as soon as</h2>
						<h1>Right now!</h1>
						<p>
							Apply today for a low rate short-term Personal Loan
						</p>
						<SignUpButton history={history} />
						<button className="btn btn-secondary btn-lg">Learn more</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

export {SignUpButton};
export default LandingPage;
