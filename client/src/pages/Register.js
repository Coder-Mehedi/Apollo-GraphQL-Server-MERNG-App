import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Register = ({ history }) => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			console.log(proxy);
			history.push("/");
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.errors);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		addUser();
	};

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Register</h1>
				<Form.Input
					type="text"
					label="Username"
					placeholder="Username"
					name="username"
					value={values.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>

				<Form.Input
					type="email"
					label="Email"
					placeholder="Email"
					name="email"
					value={values.email}
					error={errors.email ? true : false}
					onChange={onChange}
				/>

				<Form.Input
					type="password"
					label="Password"
					placeholder="Password"
					name="password"
					value={values.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>

				<Form.Input
					type="password"
					label="Confirm Password"
					placeholder="Confirm Password"
					name="confirmPassword"
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={onChange}
				/>

				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
