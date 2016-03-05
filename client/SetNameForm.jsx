import React from 'react';

var SetNameForm = React.createClass({
	getInitialState: function () {
		return {newName: ''};
	},

	onKey: function (e) {
		this.setState({ newName : e.target.value });
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var newName = this.state.newName;
		this.props.onChangeName(newName);
		this.setState({ newName: '' });
	},

	render: function () {
		return(
			<div className='SetNameForm'>
				<h4> Change Your Name Homie </h4>
				<form onSubmit={this.handleSubmit}>
					<input
						className='form-control'
						onChange={this.onKey}
						value={this.state.newName}
					/>
				</form>
			</div>
		);
	}
});

export default SetNameForm;
