import React from 'react';

function UsersList (props) {
	var users = props.users.map((user, key) => {
			return (
				<li key={key}>
					{user}
				</li>
			);
		});

	return (
		<div className='users'>
			<h3> Online Users </h3>
			<ul>
				{users}
			</ul>
		</div>
	);
};

export default UsersList;
