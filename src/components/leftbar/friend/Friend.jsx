import "./friend.css";
import { Link } from "react-router-dom";

const Friend = ({ friend }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<ul className="leftbar_friends_list">
			<Link
				to={`/profile/${friend.id}?username=${friend.userName}`}
				style={{ textDecoration: "none", color: "black" }}
			>
				<li className="leftbar_friends_list_item">
					<img
						className="leftbar_friends_list_item_image"
						src={PF + friend.profilePicture}
						onError={(e) =>
							(e.target.src = PF + "/person/noAvatar.png")
						}
						alt="person"
					/>
					<span className="leftbar_friends_list_item_text">
						{friend.displayName}
					</span>
				</li>
			</Link>
		</ul>
	);
};

export default Friend;
