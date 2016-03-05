import React from 'react';
import marked from 'marked';

function UserMessage (props) {

	var rawMarkup = function () {
		var rawMarkup = marked(props.text.toString(), {sanitize: true});
		return { __html: rawMarkup };
	};

		return (
			<div className="UserMessage">
					<h5 className="messageAuthor">{props.user} <span className="messageDate">{props.date}</span></h5>
					<p className="sentMessage" dangerouslySetInnerHTML={rawMarkup()}></p>
			</div>
		);
};

export default UserMessage;
