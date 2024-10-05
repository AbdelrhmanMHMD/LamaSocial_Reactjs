import "./leftbar.css";

import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

import Friend from "./friend/Friend";

const Leftbar = ({ users }) => {
	return (
		<div className="leftbar">
			<div className="leftbar_wrapper">
				<ul className="leftbar_list">
					<li className="leftbar_list_item">
						<RssFeedIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">Feed</span>
					</li>
					<li className="leftbar_list_item">
						<ChatOutlinedIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">Chats</span>
					</li>
					<li className="leftbar_list_item">
						<PlayCircleIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">Videos</span>
					</li>
					<li className="leftbar_list_item">
						<GroupIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">Groups</span>
					</li>
					<li className="leftbar_list_item">
						<BookmarkIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">
							Bookmarks
						</span>
					</li>
					<li className="leftbar_list_item">
						<HelpOutlineIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">
							Questions
						</span>
					</li>
					<li className="leftbar_list_item">
						<WorkOutlineIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">Jobs</span>
					</li>
					<li className="leftbar_list_item">
						<EventIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">Events</span>
					</li>
					<li className="leftbar_list_item">
						<SchoolIcon className="leftbar_list_item_icon" />
						<span className="leftbar_list_item_text">Courses</span>
					</li>
				</ul>
				<button className="leftbar_btn_showmore">Show more</button>
				<hr className="leftbar_hr" />
				<ul className="leftbar_friends_list">
					{users.map((u) => (
						<Friend friend={u} key={u.id} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Leftbar;
