const db = require("./db/index");

// db.user
// 	.add({ email: "jane.doe@gmail.com", name: "Jane Doe" })
// 	.then(d => {
// 		console.log("RESULT: ", d);
// 	})
// 	.catch(err => {
// 		console.error("ERROR IS: ", err.message);
// 	});

db.user
	.get({ email: "john.doe@gmail.com" })
	.then(d => {
		console.log("RESULT: ", d);
	})
	.catch(err => {
		console.error("ERROR IS: ", err.message);
	});
