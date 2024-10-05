import "./rightbar.css";
import OnlineFriends from "./onlineFriends/OnlineFriends";

const Rightbar = ({ profile, onlineFriends, users,userProfile }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const Rightbar_home = () => {
		return (
			<>
				<div className="rightbar_birthday_container">
					<img
						src={PF + "/gift.png"}
						alt="gift"
						className="rightbar_birthday_img"
					/>
					<span className="rightbar_birthday_text">
						<b>Mostafa Ahmed</b> and <b>3 others</b> have a birthday
						today
					</span>
				</div>
				<img
					src={PF + "/ad.jpg"}
					alt="ad image"
					className="rightbar_ad_image"
				/>
				<h4 className="rightbar_title">Online friends</h4>
				{onlineFriends.map((friend) => (
					<OnlineFriends key={friend.id} onlineFriend={friend} />
				))}
			</>
		);
	};
	const Rightbar_profile = () => {
		return (
			<>
				<h3 className="rightbar_title">User information</h3>
				<div className="rightbar_profile_info">
					<div className="profile_info_item">
						<span className="profile_info_key">City:</span>
						<span className="profile_info_value">{userProfile?.city}</span>
					</div>
					<div className="profile_info_item">
						<span className="profile_info_key">From:</span>
						<span className="profile_info_value">{userProfile?.from}</span>
					</div>
					<div className="profile_info_item">
						<span className="profile_info_key">Relationship:</span>
						<span className="profile_info_value">{userProfile?.relationship}</span>
					</div>
				</div>
				<h3 className="rightbar_title">User Friends</h3>
				<ul className="profile_following_list">
					{users.map((u) => (
						<li key={u?.id} className="profile_following_item">
							<img
								src={PF + u?.profilePicture}
								onError={(e) => e.target.src=PF+'/person/noAvatar.png'}
								alt=""
								className="profile_following_image"
							/>
							<span className="profile_following_name">
								{u?.displayName}
							</span>
						</li>
					))}
				</ul>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbar_wrapper">
				{profile ? <Rightbar_profile /> : <Rightbar_home />}
			</div>
		</div>
	);
};

export default Rightbar;
