"use strict";

import React from 'react';
import Header from '../Header.js';

/**
 * About Page
 */
var AboutPage = React.createClass({
	componentDidMount: function() {
		console.log('AboutPage.js');
	},
	render: function() {
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>About</h3>
							<br /><br />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div><span className="bold">Developer:</span> Wellington Fernandes</div>
							<div><span className="bold">Tecnologies used:</span></div>
							<ul>
								<li>Back-End: PHP</li>
								<li>Front-End: React / Webpack</li>
								<li>CSS: Bootstrap (Mobile responsive)</li>
								<li>Database: MySQL</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default AboutPage;
