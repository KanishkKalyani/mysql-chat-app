export const getUsers = () => {
	return fetch("http://localhost:2222/api/user/getList")
		.then(d => d.json())
		.then(d => d.data);
};

export const getConversation = userId => {
	return fetch(
		`http://localhost:2222/api/conversation/get?user1=${1}&user2=${userId}`
	)
		.then(d => d.json())
		.then(d => d.data);
};

export const sendMessage = ({ content, to_user }) => {
	return fetch(`http://localhost:2222/api/conversation/addMessage`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			content,
			from_user: 1,
			to_user,
		}),
	})
		.then(d => d.json())
		.then(d => d.data);
};
