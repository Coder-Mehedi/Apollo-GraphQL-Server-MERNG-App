const postResolver = require("./post");
const userResolver = require("./user");

const rootResolver = {
	Query: {
		...postResolver.Query,
	},
};

module.exports = rootResolver;
