import "./topbar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link, NavLink } from "react-router-dom";

const Topbar = ({ loggedUser }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [isSearching, setIsSearching] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);

	// load users data from server
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get("http://localhost:8000/users");
			setUsers(data);
		};
		fetchUsers();
	}, []);

	const handleLogout = async () => {
		//removing loggedUser from server
		try {
			await axios.put("http://localhost:3000/loggedUser", {});
		} catch (err) {
			console.log(err);
		}

		// reload
		window.location.reload();
	};

	const handleResearch = async (e) => {
		const searchText = e.target.value;
		if (searchText.trim() !== "") {
			setFilteredUsers(
				users.filter((u) =>
					u.displayName
						.toLowerCase()
						.includes(searchText.toLowerCase())
				)
			);
		}
	};
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="topbarLogo">Lamasocial</span>
				</Link>
			</div>
			<div className="topbarCenter">
				<div className="topbarSearch">
					<SearchIcon className="topbarSearchIcon" />
					<input
						type="text"
						placeholder="Search..."
						onChange={(e) => handleResearch(e)}
						onFocus={() => setIsSearching(true)}
						onBlur={() => setTimeout(() => setIsSearching(false),200)}
					/>
					{isSearching && (
						<div className="search_suggestions">
							{filteredUsers.map((user) => (
								<Link
									to={`/profile/${user.id}?username=${user.userName}`}
									style={{
										textDecoration: "none",
										color: "black",
									}}
									key={user.id}
								>
									<div className="suggestion">
										<img
											className="suggestion_image"
											src={PF + user.profilePicture}
											onError={(e) => {
												e.target.src =
													PF + "/person/noAvatar.png";
											}}
											alt=""
										/>
										<span className="suggestion_name">
											{user.displayName}
										</span>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="topbarRight">
				<div className="topbarLinks">
					<NavLink
						to="/"
						className="topbarLink"
						style={{ textDecoration: "none" }}
					>
						Home
					</NavLink>
					<NavLink
						to="/"
						className="topbarLink"
						style={{ textDecoration: "none" }}
						onClick={handleLogout}
					>
						Log out
					</NavLink>
				</div>
				<div className="topbarIcons">
					<div className="topbarIconsItem">
						<PersonIcon />
						{loggedUser.numOfFriendRequests ? (
							<span className="topbarIconsItemBadge">
								{loggedUser.numOfFriendRequests}
							</span>
						) : (
							""
						)}
					</div>
					<div className="topbarIconsItem">
						<ChatOutlinedIcon />
						{loggedUser.numOfMsgs ? (
							<span className="topbarIconsItemBadge">
								{loggedUser.numOfMsgs}
							</span>
						) : (
							""
						)}
					</div>
					<div className="topbarIconsItem">
						<NotificationsOutlinedIcon />
						{loggedUser.numOfNotifications ? (
							<span className="topbarIconsItemBadge">
								{loggedUser.numOfNotifications}
							</span>
						) : (
							""
						)}
					</div>
				</div>
				<Link
					to={`/profile/${loggedUser.id}?username=${loggedUser.userName}`}
					style={{ textDecoration: "none" }}
				>
					<img
						src={PF + loggedUser?.profilePicture}
						onError={(e) => {
							e.target.src = PF + "/person/noAvatar.png";
						}}
						className="topbarImage"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
