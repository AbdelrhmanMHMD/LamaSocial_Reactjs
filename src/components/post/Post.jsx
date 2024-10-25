import React, { useState } from "react";
import "./post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";

const Post = ({ post, loggedUser, author, handleDeletePost }) => {
	const [numOfReacts, setNumOfReacts] = useState(post?.reacts?.length);
	const [isLiked, setIsLiked] = useState(
		post?.reacts?.includes(loggedUser.id)
	);
	const [commentIsLiked, setCommentIsLiked] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(post?.desc);
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

	//===================================================================================
	// handle comment form and comment

	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState(post?.comments);

	const handleCommentForm = async (e) => {
		e.preventDefault();

		// check if comment text is empty
		if (commentText.length === 0) {
			return;
		}

		// create comment object
		const comment = {
			userId: loggedUser.id,
			displayName: loggedUser.displayName,
			profilePicture: loggedUser.profilePicture,
			userName: loggedUser.userName,
			text: commentText,
			commentId: Math.random().toString(36).substr(2, 9),
			date: Date.now(),
			reacts: [],
		};

		// add comment to post
		post.comments.push(comment);
		setCommentText("");

		// send comment to db
		try {
			axios.put("http://localhost:8000/posts/" + post.id, post);
		} catch (err) {
			console.log(err);
		}
	};

	const handleCommentLike = async (c) => {
		// handle comment like and isLiked state
		setCommentIsLiked(!commentIsLiked);

		// update comment reacts
		if (commentIsLiked) {
			c.reacts = c.reacts.filter((reactId) => reactId !== loggedUser.id);
		} else {
			c.reacts.push(loggedUser.id);
		}
		// update comment in db
		try {
			axios.put("http://localhost:8000/posts/" + post.id, post);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteComment = async (c) => {
		post.comments = post.comments.filter(
			(comment) => comment.commentId !== c.commentId
		);
		// delete comment from ui
		setComments(post.comments);

		// update post in db
		try {
			axios.put("http://localhost:8000/posts/" + post.id, post);
		} catch (err) {
			console.log(err);
		}
	};


	const handleSaveEdit = async (e) => {
		e.preventDefault();
		setIsEditing(false);

		// display edit
		post.desc = editText;

		// save changes to db
		try{
			await axios.put("http://localhost:8000/posts/" + post.id, post)
		}catch(err){
			console.log(err)
		}
	}

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
						{author?.id === loggedUser?.id && (
							<>
								<button
									className="post_edit"
									onClick={() => setIsEditing(!isEditing)}
								>
									<i className="fa-regular fa-pen-to-square"></i>
								</button>
								<button
									className="post_delete"
									onClick={() => handleDeletePost(post)}
								>
									<i className="fa-solid fa-trash-can"></i>
								</button>
							</>
						)}
					</div>
				</div>
				<div className="post_center">
					{isEditing ? (
						<form className="post_edit" onSubmit={handleSaveEdit}>
							<textarea type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="post_edit_input"></textarea>
							<button className="post_edit_button">
								Save
							</button>
						</form>
					) : (
						<span className="post_center_text">{post?.desc}</span>
					)}

					<img
						src={post.photo}
						alt=""
						className="post_center_image"
						onDoubleClick={handlePostReact}
						onError={(e) => (e.target.src = PF + post.photo)}
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
							{comments?.length} comments
						</span>
					</div>
				</div>

				<div className="comment_section">
					<form
						className="comment_input"
						onSubmit={handleCommentForm}
						autoComplete="off"
					>
						<Link
							to={`/profile/${loggedUser.id}?username=${loggedUser.userName}`}
						>
							<img
								src={PF + loggedUser.profilePicture}
								onError={(e) =>
									(e.target.src = PF + "/person/noAvatar.png")
								}
								alt=""
							/>
						</Link>
						<input
							type="text"
							name="comment"
							id="comment"
							placeholder="Add a comment"
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
						/>
						<button type="submit">Post</button>
					</form>
					<div className="comments">
						{comments
							?.sort(
								(a, b) => new Date(b.date) - new Date(a.date)
							)
							.map((comment) => (
								<Comment
									key={comment.commentId}
									comment={comment}
									loggedUser={loggedUser}
									handleCommentLike={handleCommentLike}
									setCommentIsLiked={setCommentIsLiked}
									activeLike={comment.reacts.includes(
										loggedUser.id
									)}
									handleDeleteComment={handleDeleteComment}
									author={author}
									post={post}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
