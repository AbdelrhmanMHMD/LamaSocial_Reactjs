import "./friend.css";

const Friend = ({ friend }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<ul className="leftbar_friends_list">
			<li className="leftbar_friends_list_item">
				<img
					className="leftbar_friends_list_item_image"
					src={PF+friend.profilePicture}
					onError={(e) => e.target.src=PF+'/person/noAvatar.png'}
					alt="person"
				/>
				<span className="leftbar_friends_list_item_text">
					{friend.displayName}
				</span>
			</li>
		</ul>
	);
};

export default Friend;
