import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUsers } from "./api/index";
import cx from "classnames";

export const ConversationList = ({ onUserClick }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers().then(d => {
			setUsers(d);
		});
	}, []);
	return (
		<div className="text-white">
			<div className="text-3xl p-3">Conversation List</div>

			{users
				.filter(user => user.id !== 1)
				.map(user => {
					return (
						<div
							key={user.id}
							className={cx(
								"p-3 cursor-pointer",
								"hover:bg-gray-400 hover:text-teal-700"
							)}
							onClick={e => onUserClick(user)}>
							{user.name}
						</div>
					);
				})}
		</div>
	);
};
