const { executeQuery } = require("./bootstrap");

// Create user or get user information

const user = {
	add({ email, name }) {
		const query = `
         INSERT INTO whatsapp_clone.user
            (email_id,name)
         VALUES
         (
            "${email}",
            "${name}"
         );
      `;
		const getInsertedId = `
         select LAST_INSERT_ID();
      `;
		return executeQuery(query).then(d => executeQuery(getInsertedId));
	},
	get({ email }) {
		const query = `
         SELECT * 
         from 
            user
         where 
            email_id="${email}"
      `;
		return executeQuery(query);
	},
	getAll() {
		const query = `
         SELECT * 
         from 
            user
      `;
		return executeQuery(query);
	},
};

// Conversations Part

const conversation = {
	addMessage({ content, type = "TEXT", from_user, to_user }) {
		const query = `
         START TRANSACTION;

         INSERT INTO whatsapp_clone.message(
            type,
            content
         )
         VALUES(
            "${type}",
            "${content}"
         );
         
         INSERT INTO whatsapp_clone.conversation(
            message_id,
            from_user,
            to_user
         )
         VALUES(
            last_insert_id(),
            "${from_user}",
            "${to_user}"
         );
         
         COMMIT;
      `;
		return executeQuery(query);
	},
	get({ user1, user2, offset = 0, limit = 20 }) {
		const query = `
         SELECT
            from_user,
            (select name from user where id = from_user) as from_user, 
            (select name from user where id = from_user) as from_user,  
            content, type, date_format(time, "%D %b %Y, %r")
         from
            conversation, message
         where
            (from_user = ${user1} and to_user = ${user2} or
            from_user = ${user2} and to_user = ${user1}) and
            conversation.message_id = message.id
         ORDER by
            time desc
         LIMIT
            ${offset}, ${limit};
      `;
		return executeQuery(query);
	},
};

module.exports = { user, conversation };
