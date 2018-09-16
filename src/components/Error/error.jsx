import React from 'react';
import './Error.css';


const Permission = () =>
<div className="errorContainer">
	<div className="errorWrapper text-center">
		<h1 className="text-uppercase">Meet Dikembe</h1>
		<img className="errorImage" alt="Dikembe" src={require('../../assets/dikembe.gif')} />
		<p className="errorMessage text-monospace">Please login before you can see this page.</p>
	</div>

</div>

export default Permission;
