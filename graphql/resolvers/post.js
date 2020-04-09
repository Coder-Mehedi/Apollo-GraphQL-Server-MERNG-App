const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (error) {
				throw error;
			}
		},
		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error("Post not found");
				}
			} catch (error) {
				throw new Error("Post not found");
			}
		},
	},
	Mutation: {
		async createPost(_, { body }, context) {
			try {
				const user = checkAuth(context);
				console.log(user.username);
				const newPost = new Post({
					body,
					user: user.id,
					username: user.username,
					createdAt: new Date().toISOString(),
				});
				const post = await newPost.save();
				return post;
			} catch (error) {
				throw new Error(error);
			}
		},
	},
};
