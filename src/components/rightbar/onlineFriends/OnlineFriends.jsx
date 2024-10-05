import "./onlineFriends.css";
const OnlineFriends = ({ onlineFriend }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div>
			<ul className="rightbar_friendslist">
				<li className="rightbar_friend">
					<div className="rightbar_friend_image_container">
						<img
							src={PF + onlineFriend.profilePicture}
							alt=""
							className="rightbar_friend_image"
						/>
						<span className="rightbar_friend_image_online_badge"></span>
					</div>
					<span className="rightbar_friend_name">
						{onlineFriend.userName}
					</span>
				</li>
			</ul>
		</div>
	);
};

export default OnlineFriends;
