import "./feed.css";
import Share from "./../share/Share";
import Post from "./../post/Post";

const Feed = ({ loggedUser, posts, users, userProfile, home }) => {
	// if user is on home page, show only posts from followed users
	if (home) {
		posts = posts?.filter(
			(p) =>
				loggedUser.friends?.includes(p.userId) ||
				loggedUser.id === p.userId
		);
	}
	// sorting posts by date
	posts.sort((p1, p2) => new Date(p2.date) - new Date(p1.date));
	return (
		<div className="feed">
			<div className="feed_wrapper">
				{!userProfile ? (
					<Share loggedUser={loggedUser} />
				) : userProfile.id === loggedUser.id ? (
					<Share loggedUser={loggedUser} />
				) : (
					""
				)}
				{posts.map((p) => (
					<Post
						key={p.id}
						post={p}
						author={users.find((u) => u.id === p.userId)}
						loggedUser={loggedUser}
					/>
				))}
			</div>
		</div>
	);
};

export default Feed;
