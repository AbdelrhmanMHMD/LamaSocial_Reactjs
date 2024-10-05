import "./feed.css";
import Share from "./../share/Share";
import Post from "./../post/Post";

const Feed = ({ loggedUser, posts, users }) => {
	return (
		<div className="feed">
			<div className="feed_wrapper">
				<Share loggedUser={loggedUser} />
				{posts.map((p) => (
					<Post
						key={p.id}
						post={p}
						author={users.find((u) => u.id === p.userId)}
					/>
				))}
			</div>
		</div>
	);
};

export default Feed;
