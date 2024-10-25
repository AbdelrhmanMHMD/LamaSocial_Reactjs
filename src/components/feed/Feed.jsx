import "./feed.css";
import Share from "./../share/Share";
import Post from "./../post/Post";
import { useEffect } from "react";
import axios from "axios";

const Feed = ({ loggedUser, posts, users, userProfile, home }) => {
	useEffect(() => {
		// if user is on home page, show only posts from followed users
		if (home) {
			posts = posts?.filter(
				(p) =>
					loggedUser.friends?.includes(p.userId) ||
					loggedUser.id === p.userId
			);
		}
	}, [posts]);

	// handle delete post
	const handleDeletePost = async (p) => {
		posts = posts.filter((post) => post.id !== p.id);
		console.log(posts);
		// delete post from server
		try {
			await axios.delete("http://localhost:8000/posts/" + p.id);
		} catch (err) {
			console.log(err);
		}
		// reload page
		window.location.reload();
	};
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
				{posts
					?.sort((p1, p2) => new Date(p2.date) - new Date(p1.date))
					.map((p) => (
						<Post
							key={p.id}
							post={p}
							author={users.find((u) => u.id === p.userId)}
							loggedUser={loggedUser}
							handleDeletePost={handleDeletePost}
						/>
					))}
			</div>
		</div>
	);
};

export default Feed;
