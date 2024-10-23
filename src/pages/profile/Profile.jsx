import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./profile.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
	const userProfileId = useParams().id;
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [loggedUser, setLoggedUser] = useState({});
	const [isFriend, setIsFriend] = useState(false);

	// add friend function
	const handleAddFriend = async () => {
		if (isFriend) {
			loggedUser.friends = loggedUser.friends?.filter(
				(f) => f !== +userProfileId
			);
			setIsFriend(false);
		} else {
			loggedUser.friends?.push(+userProfileId);
			setIsFriend(true);
		}
		// update loggedUser in loggedUser
		await axios.put("http://localhost:8000/loggedUser", loggedUser);
		// update the loggeduser in users
		await axios.put(
			`http://localhost:8000/users/${loggedUser.id}`,
			loggedUser
		);
	};

	// check if loggedUser is friend
	useEffect(() => {
		if (loggedUser.friends?.includes(+userProfileId)) {
			setIsFriend(true);
		} else {
			setIsFriend(false);
		}
	}, [loggedUser, userProfileId]);

	// fetch loggedUser
	useEffect(() => {
		const fetchLoggedUser = async () => {
			const { data } = await axios.get(
				"http://localhost:8000/loggedUser"
			);
			setLoggedUser(data);
		};
		fetchLoggedUser();
	}, []);

	// fetch users
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get("http://localhost:8000/users");
			setUsers(data);
		};
		fetchUsers();
	}, []);

	//fetch userProfile
	const [userProfile, setUserProfile] = useState({});
	useEffect(() => {
		const fetchUserProfile = async () => {
			const { data } = await axios.get(
				`http://localhost:8000/users/${userProfileId}`
			);
			setUserProfile(data);
		};
		fetchUserProfile();
	}, [userProfileId]);

	// fetch posts
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const { data } = await axios.get(`http://localhost:8000/posts`);
			setPosts(data.filter((d) => d.userId === +userProfileId));
		};
		fetchPosts();
	}, [userProfileId]);
	return (
		<>
			<Topbar loggedUser={loggedUser} />
			<div className="profile">
				<div className="profile_left">
					<Leftbar users={users} />
				</div>
				<div className="profile_right">
					<div className="profile_top">
						<div className="profile_cover">
							<img
								src={PF + userProfile?.coverImage}
								onError={(e) => {
									e.target.src = PF + "/cover/noCover.png";
								}}
								alt=""
								className="profile_cover_image"
							/>
							<img
								src={PF + userProfile?.profilePicture}
								onError={(e) => {
									e.target.src = PF + "/person/noAvatar.png";
									e.target.style.background = "white";
								}}
								alt=""
								className="profile_Image"
							/>
						</div>
						<div className="profile_info">
							<span className="profile_info_name">
								{userProfile?.displayName}
							</span>
							<span className="profiel_info_nickname">
								{userProfile.nickName
									? userProfile.nickName
									: ""}
							</span>
						</div>
					</div>
					<div className="profile_bottom">
						<div className="profile_bottom_left">
							<Feed
								loggedUser={loggedUser}
								posts={posts}
								users={users}
								userProfile={userProfile}
							/>
						</div>
						<div className="profile_bottom_right">
							<div className="profile_add">
								<button
									className="profile_add_button"
									onClick={handleAddFriend}
								>
									{isFriend ? (
										<span>
											Remove Friend{" "}
											<i className="fa-solid fa-user-minus"></i>
										</span>
									) : (
										<span>
											Add Friend
											<i className="fa-solid fa-user-plus"></i>
										</span>
									)}
								</button>
							</div>
							<Rightbar
								profile
								users={users.filter((u) =>
									userProfile?.friends?.includes(u.id)
								)}
								userProfile={userProfile}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
