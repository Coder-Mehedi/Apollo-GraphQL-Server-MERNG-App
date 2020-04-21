import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Button, Card, Image, Icon, Label, Grid } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const { data } = useQuery(FETCH_POSTS_QUERY, { variables: { postId } });

	function deletePostCallback() {
		props.history.push("/");
	}

	let postMarkup;
	if (!data) {
		postMarkup = <p>Loading Post...</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount,
		} = data.getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width="2">
						<Image
							floated="right"
							size="mini"
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
						/>
					</Grid.Column>
					<Grid.Column width="10">
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likeCount, likes }} />
								<Button
									as="div"
									labelPosition="right"
									onClick={() => console.log("comment on post")}
								>
									<Button basic color="blue">
										<Icon name="comments" />
									</Button>
									<Label basic color="blue" pointing="left">
										{commentCount}
									</Label>
								</Button>
								{user && user.username === username && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return postMarkup;
};

const FETCH_POSTS_QUERY = gql`
	query getPost($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			username
			likeCount
			commentCount
			likes {
				username
			}
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

export default SinglePost;
