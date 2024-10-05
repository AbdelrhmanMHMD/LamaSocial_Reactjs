import React, { useState } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Post = ({ post, author }) => {
	const [numOfReacts, setNumOfReacts] = useState(post.numOfReacts);
	const [isLiked, setIsLiked] = useState(false);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const handlePostReact = () => {
		setNumOfReacts(isLiked ? numOfReacts - 1 : numOfReacts + 1);
		setIsLiked(!isLiked);
	};
	return (
		<div className="post">
			<div className="post_wrapper">
				<div className="post_top">
					<div className="post_top_left">
						<Link
							to={`/profile/${author.id}?username=${author.userName}`}
						>
							<img
								className="post_top_left_image"
								src={PF + author.profilePicture}
								onError={(e) =>
									(e.target.src = PF + "/person/noAvatar.png")
								}
								alt=""
							/>
						</Link>
						<div className="post_info">
							<Link
								to={`/profile/${author.id}?username=${author.userName}`}
								style={{textDecoration:'none'}}
								className="post_info_username"
							>
									{author.displayName}
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
					/>
				</div>
				<div className="post_bottom">
					<div className="post_bottom_left">
						<img
							src={PF + "/like.png"}
							alt="like"
							onClick={handlePostReact}
							className="post_reacts_image"
						/>
						<img
							src={PF + "/love.png"}
							alt="love"
							onClick={handlePostReact}
							className="post_reacts_image"
						/>
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
