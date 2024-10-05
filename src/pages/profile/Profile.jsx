import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./profile.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const [loggedUser, setLoggedUser] = useState({});
	useEffect(() => {
		const fetchLoggedUser = async () => {
			const { data } = await axios.get(
				"http://localhost:8000/loggedUser"
			);
			setLoggedUser(data);
		};
		fetchLoggedUser();
	}, []);

	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get("http://localhost:8000/users");
			setUsers(data);
		};
		fetchUsers();
	}, []);

	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const { data } = await axios.get("http://localhost:8000/posts");
			setPosts(data);
		};
		fetchPosts();
	}, []);
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
								src={PF + "/post/3.jpg"}
								alt=""
								className="profile_cover_image"
							/>
							<img
								src={PF + loggedUser?.profilePicture}
								onError={(e) => {
									e.target.src = PF + "/noAvatar.png";
									e.target.style.background = "white";
								}}
								alt=""
								className="profile_Image"
							/>
						</div>
						<div className="profile_info">
							<span className="profile_info_name">
								{loggedUser?.userName}
							</span>
							<span className="profiel_info_nickname">
								({loggedUser?.nickName})
							</span>
						</div>
					</div>
					<div className="profile_bottom">
						<Feed
							loggedUser={loggedUser}
							posts={posts}
							users={users}
						/>
						<Rightbar profile users={users} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
