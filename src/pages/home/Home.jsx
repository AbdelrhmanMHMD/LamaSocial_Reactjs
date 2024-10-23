import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";

import "./home.css";
import axios from "axios";

const Home = () => {
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

	const [friends, setFriends] = useState([]);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get("http://localhost:3000/users");
			setUsers(data);
			const friendsList = data.filter(
				(user) =>
					loggedUser?.friends?.includes(user.id) ||
					user.id === loggedUser.id
			);
			setFriends(friendsList);
		};
		fetchUsers();
	}, [loggedUser]);

	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const { data } = await axios.get("http://localhost:8000/posts");
			setPosts(data);
		};
		fetchPosts();
	}, []);
	return (
		<div>
			<Topbar loggedUser={loggedUser} />

			<div className="homeContainer">
				<Leftbar users={friends} />
				<Feed
					loggedUser={loggedUser}
					posts={posts}
					users={users}
					home
				/>
				<Rightbar onlineFriends={friends.filter((u) => u.online)} />
			</div>
		</div>
	);
};

export default Home;
