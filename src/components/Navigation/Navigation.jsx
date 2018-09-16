import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignOut from '../SignOut/SignOut';
import * as routes from '../../constants/routes';

const Navigation = ({authUser}) =>
<div>
	{ authUser
		? <NavigationAuth />
	: <NavigationNonAuth />
}
</div>

const NavigationAuth = () =>

<nav className="mainNavbar navbar navbar-expand-lg navbar-dark bg-dark">
	<Link className="navbar-brand" to={routes.HOME}><img className="menuLogo" src={ require('../../assets/logo.png') } alt="Logo" /></Link>
	<div className="navbar-collapse">
		<ul className="navbar-nav mr-auto">
			<li className="nav-item"><Link className="nav-link" to={routes.HOME}>Home</Link></li>
			<li className="nav-item"><Link className="nav-link" to={routes.ACCOUNT}>Account</Link></li>
		</ul>
		<div className="my-2 my-lg-0">
			<SignOut />
		</div>
	</div>
</nav>

const NavigationNonAuth = () =>
<nav className="mainNavbar navbar navbar-expand-lg navbar-dark bg-dark">
	<Link className="navbar-brand" to={routes.LANDING}><img className="menuLogo" src={ require('../../assets/logo.png') } alt="Logo" /></Link>
	<div className="navbar-collapse">
		<ul className="navbar-nav mr-auto">
			<li className="nav-item"><Link className="nav-link" to={routes.LANDING}>Landing</Link></li>
		</ul>
		<div className="navbar-nav my-2 my-lg-10">
			<div className="nav-item"><Link className="nav-link" to={routes.SIGN_IN}>Sign In</Link></div>
		</div>
	</div>
</nav>


const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
