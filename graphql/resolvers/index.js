const postResolver = require("./post");
const userResolver = require("./user");

const rootResolver = {
	Query: {
		...postResolver.Query,
	},
	Mutation: {
		...userResolver.Mutation,
		...postResolver.Mutation,
	},
};

module.exports = rootResolver;
