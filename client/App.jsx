import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
// const socket = io(`http://198.199.65.121:3000`);
const socket = io(`http://localhost:3000`);
import UsersList from './UsersList.jsx';
import MessageList from './MessageList.jsx';
import UserInput from './UserInput.jsx';
import SetNameForm from './SetNameForm.jsx';

var App = React.createClass({

	getInitialState: function () {
		return {
      users: [],
      messages:[],
      text: ''
    };
	},

	componentDidMount: function () {
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageRecieve);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
	},

	_initialize: function (data) {
		var {users, name} = data;
		this.setState({users, user: name});
	},

	_messageRecieve: function (message) {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
	},

	_userJoined: function (data) {
		var {users, messages} = this.state;
		var {name} = data;
		users.push(name);
		messages.push({
			user: 'APPLICATION BOT',
			text : name +' Joined'
		});
		this.setState({users, messages});
	},

	_userLeft: function (data) {
		var {users, messages} = this.state;
		var {name} = data;
		var index = users.indexOf(name);
		users.splice(index, 1);
		messages.push({
			user: 'APPLICATION BOT',
			text : name +' Left'
		});
		this.setState({users, messages});
	},

	_userChangedName: function (data) {
		var {oldName, newName} = data;
		var {users, messages} = this.state;
		var index = users.indexOf(oldName);
		users.splice(index, 1, newName);
		messages.push({
			user: 'APPLICATION BOT',
			text : 'Change Name : ' + oldName + ' is know going by '+ newName
		});
		this.setState({users, messages});
	},

	handleMessageSubmit: function (message) {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
		socket.emit('send:message', message);
	},

	handleChangeName: function (newName) {
		var oldName = this.state.user;
		socket.emit('change:name', { name : newName}, (result) => {
			if(!result) {
				return alert('There was an error changing your name');
			}
			var {users} = this.state;
			var index = users.indexOf(oldName);
			users.splice(index, 1, newName);
			this.setState({users, user: newName});
		});
	},

	render: function () {
		return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 online">
					<UsersList users={this.state.users}/>
					<SetNameForm onChangeName={this.handleChangeName}/>
				</div>
				<div className="col-sm-9 messaging noPadding">
					<MessageList messages={this.state.messages} />
					<UserInput onMessageSubmit={this.handleMessageSubmit} user={this.state.user}/>
				</div>
			</div>
		</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));
