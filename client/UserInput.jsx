import React from 'react';

var UserInput = React.createClass({

	getInitialState: function () {
		return {text: ''};
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var message = {
			user : this.props.user,
			text : this.state.text
		}
		this.props.onMessageSubmit(message);
		this.setState({ text: '' });
	},

	changeHandler: function(e) {
		this.setState({ text : e.target.value });
	},

	render: function () {
		return(
			<div>
				<div className="input-group">
				<textarea className="UserInput form-control" placeholder="These Mangos are pretty sweet!" onChange={this.changeHandler} value={this.state.text}/>
					<span className="input-group-btn">
						<button className="btn btn-default TABTN" type="button" onClick={this.handleSubmit}>Submit</button>
					</span>
				</div>

			</div>
		);
	}
});

export default UserInput;
