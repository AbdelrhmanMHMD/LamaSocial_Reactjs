import "./share.css";
import FilterIcon from "@mui/icons-material/Filter";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useState } from "react";
import axios from "axios";

const Share = ({ loggedUser }) => {
	const [postText, setPostText] = useState("");
	const [postImages, setPostImages] = useState(null);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const handleShareSubmit = (e) => {
		e.preventDefault();
		console.log(postImages);
		// create post object
		const post = {
			userId: loggedUser.id,
			date: new Date(),
			desc: postText,
			photo: "/post/3.jpg",
			numOfComments: 0,
			reacts: [],
		};
		// send post to server
		try {
			axios.post("http://localhost:8000/posts", post);
		} catch (error) {
			console.log(error);
		}
		// reload page
		window.location.reload();
	};
	return (
		<div className="share">
			<div className="share_wrapper">
				<div className="share_top">
					<img
						className="share_top_image"
						src={PF + loggedUser?.profilePicture}
						onError={(e) =>
							(e.target.src = PF + "/person/noAvatar.png")
						}
						alt="Person"
					/>
					<input
						className="share_top_input"
						type="text"
						placeholder="What's in your mind?"
						value={postText}
						onChange={(e) => setPostText(e.target.value)}
					/>
				</div>
				<hr className="share_hr" />
				<form className="share_bottom" onSubmit={handleShareSubmit}>
					<div className="share_options">
						<label htmlFor="photo" className="share_option">
							<input
								type="file"
								className="share_option_file_input"
								id="photo"
								accept=".jpg,.png,.jpeg"
								onChange={(e) => setPostImages(e.target.files)}
								multiple
							/>
							<FilterIcon
								className="share_option_icon"
								htmlColor="tomato"
							/>
							<span className="share_option_text">
								Photo or Video
							</span>
						</label>
						<div className="share_option">
							<LabelIcon
								className="share_option_icon"
								htmlColor="green"
							/>
							<span className="share_option_text">Tag</span>
						</div>
						<div className="share_option">
							<LocationOnIcon
								className="share_option_icon"
								htmlColor="red"
							/>
							<span className="share_option_text">Location</span>
						</div>
						<div className="share_option">
							<EmojiEmotionsIcon
								className="share_option_icon"
								htmlColor="goldenrod"
							/>
							<span className="share_option_text">Feelings</span>
						</div>
					</div>
					<button className="share_button">Share</button>
				</form>
			</div>
		</div>
	);
};

export default Share;
