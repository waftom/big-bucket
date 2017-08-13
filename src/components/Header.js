"use strict";

import React from 'react';
import { Link, IndexLink } from 'react-router';
import style from '../style.css';

var activeClassName = 'active';

/**
 * Header navigation bar
 */
var Header = React.createClass({
	componentDidMount: function() {
		console.log('Header.js');
	},
	render: function() {
		return (
			<nav className="navbar navbar-light">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="navbar-header nav-float">
								<IndexLink to="/" activeClassName={activeClassName} className="navbar-brand">
									<span><img className={style.img} src="img/ifly.jpg" /></span>
								</IndexLink>
							</div>
							<div id="navbar" className="navbar-collapse nav-float">
								<ul className="nav navbar-nav">
									<li><Link to="/home" activeClassName={activeClassName}>Home</Link></li>
									<li><Link to="/about" activeClassName={activeClassName}>About</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
});

export default Header;
