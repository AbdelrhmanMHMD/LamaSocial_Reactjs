import "./comment.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Comment = ({
	comment,
	loggedUser,
	handleCommentLike,
	setCommentIsLiked,
	activeLike,
	handleDeleteComment,
	author,
	post
}) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(comment.text);

	useEffect(() => {
		if (loggedUser) {
			comment?.reacts?.includes(loggedUser.id)
				? setCommentIsLiked(true)
				: setCommentIsLiked(false);
		}
	}, [loggedUser, comment]);

	const handleEditComment = async(e)=>{
		e.preventDefault();

		// display edited comment
		comment.text = editText;
		setIsEditing(false);
		
		// save changes to database
		try{
			await axios.put('http://localhost:8000/posts/'+post.id,post)
		}catch(err){
			console.log(err)
		}
	}

	return (
		<div className="comment">
			<div className="comment_left">
				<Link
					to={`/profile/${comment?.userId}?username=${comment?.userName}`}
				>
					<img
						src={PF + comment?.profilePicture}
						onError={(e) =>
							(e.target.src = PF + "/person/noAvatar.png")
						}
						alt=""
					/>
				</Link>
			</div>
			<div className="comment_right">
				<div className="comment_right_top">
					<div className="comment_content">
						<Link
							to={`/profile/${comment?.userId}?username=${comment?.userName}`}
							style={{
								textDecoration: "none",
							}}
						>
							<span className="name">{comment?.displayName}</span>
						</Link>
						{isEditing ? (
							<form className="comment_edit_form" onSubmit={handleEditComment}>
								<textarea
									name="comment"
									id="comment"
									className="comment_edit_input"
									value={editText}
									onChange={(e) =>
										setEditText(e.target.value)
									}
								></textarea>
								<button className="comment_edit_save">
									Save
								</button>
							</form>
						) : (
							<div className="comment_text">{comment?.text}</div>
						)}
					</div>
					{comment?.userId === loggedUser?.id ||
					author?.id === loggedUser?.id ? (
						<div
							className="comment_actions"
							style={
								isEditing
									? { paddingTop: "5.5%" }
									: { padding: "0" }
							}
						>
							<button
								className="comment_edit_button"
								onClick={() => setIsEditing(!isEditing)}
							>
								<i className="fa-regular fa-pen-to-square"></i>
							</button>
							<button
								className="comment_delete"
								onClick={() => handleDeleteComment(comment)}
							>
								<i className="fa-solid fa-trash-can"></i>
							</button>
						</div>
					) : (
						""
					)}
				</div>
				<div className="comment_right_bottom">
					<span className="comment_time">{format(comment.date)}</span>
					<div className="comment_reacts">
						{activeLike ? (
							<i
								className="fa-solid fa-heart"
								style={{ color: "var(--primary-color)" }}
								onClick={() => handleCommentLike(comment)}
							></i>
						) : (
							<i
								className="fa-regular fa-heart"
								onClick={() => handleCommentLike(comment)}
							></i>
						)}
						<span className="comment_reacts">
							{comment?.reacts?.length}
						</span>
					</div>
					<span className="comment_reply">Reply</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
