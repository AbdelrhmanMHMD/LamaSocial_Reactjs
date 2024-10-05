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
					<input type="text" placeholder="Search..." />
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
					>
						Timeline
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
					to={`/profile/:${loggedUser.userName}`}
					style={{ textDecoration: "none" }}
				>
					<img
						src={PF + loggedUser?.profilePicture}
						onError={(e) => {
							e.target.src = PF + "/noAvatar.png";
						}}
						className="topbarImage"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
