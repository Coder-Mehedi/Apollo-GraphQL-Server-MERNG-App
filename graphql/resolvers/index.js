const postResolver = require("./post");
const userResolver = require("./user");
const commentResolver = require("./comments");
const rootResolver = {
	Query: {
		...postResolver.Query,
	},
	Mutation: {
		...userResolver.Mutation,
		...postResolver.Mutation,
		...commentResolver.Mutation,
	},
	Subscription: {
		...postResolver.Subscription,
	},
};

module.exports = rootResolver;
