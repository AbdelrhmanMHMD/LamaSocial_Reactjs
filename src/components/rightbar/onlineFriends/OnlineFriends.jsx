import "./onlineFriends.css";
import { Link } from "react-router-dom";
const OnlineFriends = ({ onlineFriend }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div>
			<ul className="rightbar_friendslist">
				<li>
					<Link
						className="rightbar_friend"
						style={{ textDecoration: "none" }}
						to={`/profile/${onlineFriend.id}?username=${onlineFriend.userName}`}
					>
						<div className="rightbar_friend_image_container">
							<img
								src={PF + onlineFriend.profilePicture}
								onError={(e) =>
									(e.target.src = PF + "/person/noAvatar.png")
								}
								alt=""
								className="rightbar_friend_image"
							/>
							<span className="rightbar_friend_image_online_badge"></span>
						</div>
						<span className="rightbar_friend_name">
							{onlineFriend.displayName}
						</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default OnlineFriends;
