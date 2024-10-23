import React, { useState } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = ({ post, loggedUser, author }) => {
	const [numOfReacts, setNumOfReacts] = useState(post?.reacts?.length);
	const [isLiked, setIsLiked] = useState(
		post?.reacts?.includes(loggedUser.id)
	);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const handlePostReact = async () => {
		// handle num of reacts and isLiked state
		setNumOfReacts(isLiked ? numOfReacts - 1 : numOfReacts + 1);
		setIsLiked(!isLiked);

		// update post reacts
		if (isLiked) {
			post.reacts = post.reacts.filter(
				(reactId) => reactId !== loggedUser.id
			);
		} else {
			post.reacts.push(loggedUser.id);
		}
		// update post in db
		try {
			axios.put("http://localhost:8000/posts/" + post.id, post);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="post">
			<div className="post_wrapper">
				<div className="post_top">
					<div className="post_top_left">
						<Link
							to={`/profile/${author?.id}?username=${author?.userName}`}
						>
							<img
								className="post_top_left_image"
								src={PF + author?.profilePicture}
								onError={(e) =>
									(e.target.src = PF + "/person/noAvatar.png")
								}
								alt=""
							/>
						</Link>
						<div className="post_info">
							<Link
								to={`/profile/${author?.id}?username=${author?.userName}`}
								style={{ textDecoration: "none" }}
								className="post_info_username"
							>
								{author?.displayName}
							</Link>
							<span className="post_info_time">
								{format(post.date)}
							</span>
						</div>
					</div>
					<div className="post_top_right">
						<MoreVertIcon />
					</div>
				</div>
				<div className="post_center">
					<span className="post_center_text">{post?.desc}</span>
					<img
						src={PF + post.photo}
						alt=""
						className="post_center_image"
						onDoubleClick={handlePostReact}
					/>
				</div>
				<div className="post_bottom">
					<div className="post_bottom_left">
						<span
							className="post_reacts_like"
							onClick={handlePostReact}
						>
							{isLiked ? (
								<i
									className="fa-solid fa-heart"
									style={{ color: "var(--primary-color)" }}
								></i>
							) : (
								<i className="fa-regular fa-heart"></i>
							)}
						</span>
						<span className="post_reacts_number">
							{numOfReacts}
						</span>
					</div>
					<div className="post_bottom_right">
						<span className="post_comments">
							{post.numOfComments} comments
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
