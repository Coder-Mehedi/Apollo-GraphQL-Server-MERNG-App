const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../utils/checkAuth");
const Post = require("../../models/Post");

module.exports = {
	Mutation: {
		createComment: async (_, { postId, body }, context) => {
			const { username } = checkAuth(context);
			if (body.trim() === "") {
				throw new UserInputError("Empty comment", {
					errors: {
						body: "Comment body must not empty",
					},
				});
			}

			const post = await Post.findById(postId);
			console.log(post.comments);

			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await post.save();
				return post;
			} else throw new UserInputError("Post not found");
		},
	},
};
