import "./share.css";
import FilterIcon from "@mui/icons-material/Filter";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Share = ({ loggedUser }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className="share">
			<div className="share_wrapper">
				<div className="share_top">
					<img
						className="share_top_image"
						src={PF + loggedUser?.profilePicture}
						onError={(e) => (e.target.src = PF + "/person/noAvatar.png")}
						alt="Person"
					/>
					<input
						className="share_top_input"
						type="text"
						placeholder="What's in your mind?"
					/>
				</div>
				<hr className="share_hr" />
				<div className="share_bottom">
					<div className="share_options">
						<div className="share_option">
							<FilterIcon
								className="share_option_icon"
								htmlColor="tomato"
							/>
							<span className="share_option_text">
								Photo or Video
							</span>
						</div>
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
				</div>
			</div>
		</div>
	);
};

export default Share;
