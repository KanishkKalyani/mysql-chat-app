import React, { useState, useEffect } from "react";
import cx from "classnames";
import { getConversation } from "./api";
import { sendMessage } from "./api/index";

export const Conversation = ({ className, user }) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		user && getConversation(user.id).then(setMessages);
	}, [user?.id]);

	return (
		<div className={cx(className, "flex flex-col")}>
			<div className="flex p-3 bg-white">
				<div className="text-lg">{user ? user.name : "No User Selected"}</div>
			</div>
			<div
				className={cx("flex-grow", {
					"flex justify-center items-center": messages.length === 0,
				})}>
				{messages.length === 0 && (
					<div className="text-3xl">No Messages Found</div>
				)}

				<div className="p-5">
					{messages.map(({ from_id, from, to, content, type, time }, i) => (
						<div
							key={i}
							className={cx("flex", {
								"justify-start": from_id === user.id,
								"justify-end": from_id !== user.id,
							})}>
							<div
								className={cx("mt-3 p-3 text-white inline-block", {
									"bg-orange-600": from_id === user.id,
									"bg-teal-700": from_id !== user.id,
								})}>
								<div className="flex">
									<div className="font-bold flex-grow">{from}</div>
									<div className="ml-2 text-xs">{time}</div>
								</div>
								{content}
							</div>
						</div>
					))}
				</div>
			</div>
			{user && (
				<input
					type="text"
					className={cx(
						"outline-none border border-solid border-black",
						"p-3 resize-none w-full"
					)}
					onKeyUp={e => {
						const target = e.target;
						if (e.key === "Enter" && target.value.trim() !== "") {
							sendMessage({
								content: e.target.value,
								to_user: user._id,
							}).then(() => {
								target.value = "";
							});
						}
					}}></input>
			)}
		</div>
	);
};
