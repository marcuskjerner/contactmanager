import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

import axios from 'axios';
import classnames from 'classnames';

class AddContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {
			name: '',
			email: '',
			phone: ''
		},
		showAddContactBody: true
	};

	onChange = (e) =>
		this.setState({
			[e.target.name]: e.target.value
		});

	onSubmit = async (dispatch, e) => {
		e.preventDefault();

		const { name, email, phone } = this.state;

		// Check for Errors
		if (name === '') {
			this.setState({ errors: { name: 'Name is Required' } });
			return;
		}

		if (email === '') {
			this.setState({ errors: { email: 'Email is Required' } });
			return;
		}

		if (phone === '') {
			this.setState({ errors: { phone: 'Phone Number is Required' } });
			return;
		}

		const newContact = {
			name,
			email,
			phone
		};

		const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);

		dispatch({ type: 'ADD_CONTACT', payload: res.data });

		// Clear State
		this.setState({
			name: '',
			email: '',
			phone: '',
			showAddContactBody: true
		});

		this.props.history.push('/');
	};

	render() {
		const { name, email, phone, errors, showAddContactBody } = this.state;

		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className="card mb-3 ">
							<div
								className="card-header"
								onClick={() => this.setState({ showAddContactBody: !this.state.showAddContactBody })}
							>
								<b>Add Contact</b>
								<i
									className={classnames('float-right fa', {
										'fa-sort-up mt-1': showAddContactBody,
										'fa-sort-down mb-1': !showAddContactBody
									})}
								/>
							</div>
							<div
								className={classnames('card-body', {
									'hide-element': !showAddContactBody
								})}
							>
								<form onSubmit={this.onSubmit.bind(this, dispatch)}>
									<TextInputGroup
										label="Name"
										name="name"
										placeholder="Enter Name.."
										value={name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<div
										style={{
											display: 'grid',
											gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
											gridColumnGap: '2%',
											maxWidth: '100%'
										}}
									>
										<TextInputGroup
											label="Email"
											name="email"
											placeholder="Enter Email.."
											type="email"
											value={email}
											onChange={this.onChange}
											error={errors.email}
										/>

										<TextInputGroup
											label="Phone Number"
											name="phone"
											placeholder="Enter Phone Number..."
											value={phone}
											onChange={this.onChange}
											error={errors.phone}
										/>
									</div>
									<input type="submit" value="Add Contact" className="btn btn-block btn-light" />
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default AddContact;
