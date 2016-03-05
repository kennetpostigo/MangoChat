import React from 'react';
import moment from 'moment';
import UserMessage from './UserMessage.jsx';

function MessageList (props) {
	var messages = props.messages.map((message, key) => {
		var now = moment().format('hh:mm:ss a');
			if(message.user === 'APPLICATION BOT'){
				return (
				<UserMessage className="bot"
					key={key}
					user={message.user}
					text={message.text}
					date={now}
				/>
			);
		} else{
			return (
				<UserMessage className="bot"
					key={key}
					user={message.user}
					text={message.text}
					date={now}
				/>
			);
		}


	})
	return (
		<div className='MessageList'>
			{messages}
		</div>
	);
};

export default MessageList;
