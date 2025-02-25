import React from "react";
import "./index.scss";
import { Dropdown } from "antd";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import MoreOutlined from "@mui/icons-material/MoreOutlined";
import type { MenuProps } from "antd";

interface IHeaderProps {
  channelName: string;
  memberCount: number;
}

// 频道更多
const items: MenuProps["items"] = [
  { key: "1", label: <div className="channel-detail">频道详情</div> },
  { key: "2", label: <div className="channel-quit">退出频道</div> },
];

const Header = (props: IHeaderProps) => {
  const { channelName, memberCount } = props;

  return (
    <div className="channel-header">
      <p>{"#" + channelName}</p>
      <div className="channel-actions">
        <div className="inquire-members">
          <PeopleOutlineSharpIcon className="members-icon" />
          <span>{memberCount}</span>
        </div>
        <Dropdown menu={{ items }} overlayStyle={{zIndex: 100000}}>
          <MoreOutlined />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
