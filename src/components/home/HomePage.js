"use strict";

import React from 'react';
import rp from 'request-promise';
import { apiUrl } from '../../../src/constants.js';
import Header from '../Header.js';

/**
 * Home Page
 */
var HomePage = React.createClass({
	getInitialState: function(props) {
        return {
            images: [], //HTML elements to be rendered
			img_qtt: 0 //Number of images available to purchase
        };
    },
	componentDidMount: function() {
		console.log('HomePage.js');
		var _this = this;

		//Call PHP API to get the images information from database
		rp({
			uri: apiUrl,
			json: true,
			qs: { action: 'getImages' } //Method to be accessed from API Class
		})
		.then(function(response) {
			var images_arr = [];
			var img_qtt = response.length;

			//Fill the variable with the response from API
			for (var i = 0; i < response.length; i++) {
				images_arr[i] = (
					<tr>
						<td><input type="checkbox" name={'img_' + i} id={'img_' + i} data-id={response[i].id} /></td>
						<td><img src={response[i].path} alt={response[i].filename} title="Buy ME!!!" /></td>
						<td><h4>{response[i].filename}</h4></td>
					</tr>
				);
			}

			//Set the new values to the properties
			_this.setState({
                images: images_arr,
				img_qtt: img_qtt
            });
		})
		.catch(function(error) {
			console.log(error);
		});
	},

	//Handle the Purchase button event
	handleClick: function() {
		var flag = false;
		var imgs = [];

		//Check if there's at least 1 image selected
		for(var i=0;i<=this.state.img_qtt-1;i++) {
			if(document.getElementById('img_' + i).checked == true) {
				flag = true;
				imgs.push(document.getElementById('img_' + i).getAttribute('data-id'));
			}
		}

		//IF there's at least 1 image selected redirect to purchase component
		if(flag) {
			this.props.router.push({pathname: '/purchase', query: {imgs: imgs}});
		} else {
			//If no images selected, trigger error with message
			document.getElementById('err_msg').style.display = 'inline-block';
			document.getElementById('err_msg').style.marginLeft = '-' + document.getElementById('err_msg').offsetWidth/2 + 'px';
		}
	},

	//Restore the Images to purchased = 0
	handleClickRestore: function() {
		var _this = this;
		rp({
			uri: apiUrl,
			json: true,
			qs: { action: 'restoreImages' }
		})
		.then(function(response) {
			console.log(response);
			_this.props.router.push('/purchase');
		})
		.catch(function(error) {
			console.log(error);
		});
	},

	//Handle the error message close button
	handleClose: function() {
		document.getElementById('err_msg').style.display = 'none';
	},
	render: function() {
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>Select images to buy:</h3>
							<br />
							<table className="table">
								<thead>
									<tr>
										<th></th>
										<th>Image</th>
										<th>Name</th>
									</tr>
								</thead>
								<tbody>
									{this.state.images}
								</tbody>
							</table>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<button className="btn btn-secondary" id="restore" onClick={this.handleClickRestore}>RESTORE IMAGES</button><button className="btn btn-primary" id="buy" onClick={this.handleClick}>BUY</button>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<br /><br /><br />
						</div>
					</div>
				</div>
				<div id="err_msg">Select at least 1 image!<br /><br /><button className="btn btn-primary" onClick={this.handleClose}>Close</button></div>
			</div>
		);
	}
});

export default HomePage;
