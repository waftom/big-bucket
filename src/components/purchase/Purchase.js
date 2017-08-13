"use strict";

import React from 'react';
import rp from 'request-promise';
import { apiUrl } from '../../../src/constants.js';
import Header from '../Header.js';

/**
 * Purchase Page
 */
var Purchase = React.createClass({
	getInitialState: function(props) {
        return {
            imgs: this.props.location.query.imgs, //Images ids from HomePage component
			images: [], //HTML elements to be rendered
			done: false //Flag to send user back to the HomePage after a successfull purchase
        };
    },
	componentDidMount: function() {
		//Redirect user if no images selected from HomePage
		if(this.state.imgs == null) {
			this.props.router.push('/home');
		}
		console.log('Purchase.js');
		var _this = this;

		//Call PHP API to get the selected images information from database
		rp({
			uri: apiUrl + '?imgs=' + this.state.imgs,
			json: true,
			qs: { action: 'getSelectedImages' } //Method to be accessed from API Class
		})
		.then(function(response) {
			var images_arr = [];

			//Fill the variable with the response from API
			for (var i = 0; i < response.length; i++) {
				images_arr[i] = (
					<div className="selected_imgs">
						<div><img src={response[i].path} alt={response[i].filename} title="You got me!" /></div>
						<div>{response[i].filename}</div>
					</div>
				);
			}

			//Set the new values to the properties
			_this.setState({
                images: images_arr
            });
		})
		.catch(function(error) {
			console.log(error);
		});
	},

	//Handle form verification for invalid values
	handleClick: function() {
		var _this = this;
		document.getElementById('msg').innerHTML = '';
		var form = document.getElementById('form_purchase');
		var msg = '';
		var flag = true;

		//Check all form elements if empty
		for(var i=0;i<form.elements.length-1;i++){
			if(form.elements[i].value.length == 0){
				msg = form.elements[i].getAttribute('data-text') + ' is mandatory!'; //Error message
				form.elements[i].focus();
				flag = false;
				break;
			}
		}

		if(flag) {
			var cc = document.getElementById('credit_card_num');
			var ed = document.getElementById('expiration_date');
			var cv = document.getElementById('cv_code');

			//Check if value is number using regular expression
			var isnum = function (n) {
				return /^\d+$/.test(n);
			};

			//Check if date is valid (Jan -Dec of 1900 to 2900)
			var checkDate = function (n) {
				if(n.length !== 7) return false;
				var d = n.split('/');
				if(d.length != 2) return false;
				if(!(/0[1-9]|1[0-2]/.test(d[0]))) return false;
				if(d[1] < 1900 || d[1] > 2900) return false;
				return true;
			};
			if(((cc.value).length < 14 || (cc.value).length > 16) || !isnum(cc.value)) { //Chack Credit Card number
				msg = cc.getAttribute('data-text') + ' has wrong<br />length or non-numbers!'; //Error message
				cc.focus();
				flag = false;
			} else if(!checkDate(ed.value)) { //Check date
				msg = ed.getAttribute('data-text') + ' has wrong data!'; //Error message
				ed.focus();
				flag = false;
			} else if(!isnum(cv.value)) { //Check Verification Code
				msg = cv.getAttribute('data-text') + ' has non-numbers!'; //Error message
				cv.focus();
				flag = false;
			}
		}

		if(flag) {
			//Call PHP API to update selected images as PURCHASED on database
			rp({
				uri: apiUrl + '?imgs=' + this.state.imgs,
				json: true,
				qs: { action: 'buyImages' }
			})
			.then(function(response) {
				console.log(response);
				if(response) {
					document.getElementById('err_msg').style.display = 'inline-block';
					document.getElementById('msg').innerHTML = 'Thank you for your purchase.'; //Successfull message
					document.getElementById('err_msg').style.marginLeft = '-' + document.getElementById('err_msg').offsetWidth/2 + 'px';
					_this.setState({ done: true });
				} else {
					msg = 'Something went wrong, please<br />contact the administrator.'; //Error message
				}
			})
			.catch(function(error) {
				console.log(error);
			});
		} else {
			//Show error popup message
			document.getElementById('err_msg').style.display = 'inline-block';
			document.getElementById('msg').innerHTML = msg;
			document.getElementById('err_msg').style.marginLeft = '-' + document.getElementById('err_msg').offsetWidth/2 + 'px';
		}
	},

	//Handle the error message close button
	handleClose: function() {
		document.getElementById('err_msg').style.display = 'none';
		if(this.state.done) { //If transaction successfull, redirect to HomePage
			this.props.router.push('/home');
		}
	},
	render: function() {
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>Purchase</h3>
							<br /><br />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div><span className="bold">Image(s) selected:</span></div>
							{this.state.images}
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div><span className="bold">Fill your information below to confirm your purchase:</span></div>
							<br />
							<form id="form_purchase">
								<div className="row">
								    <div className="form-group col-md-6">
										<label for="first_name">*First name</label>
    								    <input type="text" className="form-control" id="first_name" placeholder="Enter first name" data-text="First name" />
								    </div>
								    <div className="form-group col-md-6">
										<label for="last_name">*Last name</label>
    								    <input type="text" className="form-control" id="last_name" placeholder="Enter last name" data-text="Last name" />
								    </div>
								</div>
								<div className="form-group">
									<label for="address">*Address</label>
								    <input type="text" className="form-control" id="address" placeholder="Enter address" data-text="Address" />
								</div>
								<div className="row">
								    <div className="form-group col-md-6">
								      	<label for="credit_card_num" className="col-form-label">*Credit Card number</label>
								      	<input type="text" className="form-control" id="credit_card_num" placeholder="Only numbers" data-text="Credit Card number" />
										<small>(* Mandatory fields)</small>
								    </div>
								    <div className="form-group col-md-4">
								      	<label for="expiration_date" className="col-form-label">*Expiration date</label>
								      	<input type="text" className="form-control" id="expiration_date" placeholder="MM/YYYY" data-text="Expiration date" />
								    </div>
								    <div className="form-group col-md-2">
								      	<label for="cv_code" className="col-form-label">*CV code</label>
								      	<input type="text" className="form-control" id="cv_code" data-text="CV code" />
								    </div>
								</div>
								<button type="submit" className="btn btn-primary" onClick={this.handleClick}>Purchase</button>
							</form>
						</div>
					</div>
				</div>
				<div id="err_msg"><span id="msg"></span><br /><br /><button className="btn btn-primary" onClick={this.handleClose}>Close</button></div>
			</div>
		);
	}
});

export default Purchase;
