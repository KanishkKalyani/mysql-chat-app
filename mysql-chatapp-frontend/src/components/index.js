import React, { useState } from "react";
import cx from "classnames";
import { Conversation } from "./conversation";
import { ConversationList } from "./conversation_list";

export const WhatsappBody = () => {
	const [activeUser, setActiveUser] = useState(null);
	return (
		<div className="w-screen h-screen flex justify-center">
			<div
				className={cx(
					"w-screen max-w-5xl border border-solid bg-gray-400",
					"flex h-full w-full"
				)}>
				<div className="w-full max-w-xs bg-teal-700">
					<ConversationList onUserClick={setActiveUser} />
				</div>
				<div className="flex-grow">
					<Conversation user={activeUser} className="h-screen" />
				</div>
			</div>
		</div>
	);
};
