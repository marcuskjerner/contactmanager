import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {
	state = {
		showContactInfo: false
	};

	onDeleteClick = async (id, dispatch) => {
		try {
			await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
			dispatch({ type: 'DELETE_CONTACT', payload: id });
		} catch (e) {
			console.log(e);
			dispatch({ type: 'DELETE_CONTACT', payload: id });
		}
	};

	render() {
		const { name, email, phone, id } = this.props.contact;
		const { showContactInfo } = this.state;

		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4
								className="ml-1"
								onClick={() => this.setState({ showContactInfo: !this.state.showContactInfo })}
								style={{ cursor: 'pointer' }}
							>
								{name}
								<div className="float-right">
									<i
										onClick={this.onDeleteClick.bind(this, id, dispatch)}
										className="fas fa-times mr-2"
										style={{ color: '#cc2223', cursor: 'pointer', fontSize: '1rem' }}
									/>
									<Link to={`contact/edit/${id}`}>
										<i
											className="far fa-edit"
											style={{ color: '#333', cursor: 'pointer', fontSize: '1rem' }}
										/>
									</Link>
								</div>
							</h4>
							{showContactInfo ? (
								<ul className="list-group">
									<li className="list-group-item">
										<b>
											Email:
											<span
												style={{
													textTransform: 'lowercase',
													fontWeight: 'normal',
													marginLeft: '5px'
												}}
											>
												{email}
											</span>
										</b>
									</li>
									<li className="list-group-item">
										<b>Phone:</b> {phone}
									</li>
								</ul>
							) : null}
						</div>
					);
				}}
			</Consumer>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired
};

export default Contact;
