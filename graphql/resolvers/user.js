const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { JWT_SECRET } = require("../../config");
const { registerValidator } = require("../../utils/validators");

module.exports = {
	Mutation: {
		async register(
			_,
			{ registerInput: { username, email, password, confirmPassword } },
			context,
			info
		) {
			// TODO Validate user data
			const { valid, errors } = registerValidator(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}
			// make sure user doesn't already exits
			const userName = await User.findOne({ username });
			if (userName)
				throw new UserInputError("Username is taken", {
					errors: {
						username: "This username is taken",
					},
				});
			const userEmail = await User.findOne({ email });
			if (userEmail) {
				throw new UserInputError("Account With this email already exits", {
					errors: {
						email: "This Email Already Registered",
					},
				});
			}
			// hash the password and create an auth token
			password = await bcrypt.hash(password, 12);
			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();
			const token = jwt.sign(
				{
					id: res.id,
					email: res.email,
					username: res.username,
				},
				JWT_SECRET,
				{ expiresIn: "1h" }
			);
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
