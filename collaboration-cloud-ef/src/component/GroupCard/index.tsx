import React from "react";
import "./index.scss";
import { groupInfo } from "@/typings/api/project_info";
import { Avatar, Button, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import leaveGroupIcon from "@/assets/leaveGroup.png";

interface Props {
  group: groupInfo;
}

export default function GroupCard(props: Props) {
  return (
    <div className="group-card">
      <div className="group-header">
        <img
          src={props.group.group_avatar}
          alt="group-avatar"
          className="group-avatar"
        />
        <div className="group-header-right">
          <div className="icon-container">
            <img
              src={leaveGroupIcon}
              alt="leave-group"
              className="leave-group-icon"
            />
          </div>

          <p>{props.group.group_name}</p>
        </div>
      </div>

      <div className="group-description">
        {
          "props.group.description 这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx"
        }
      </div>
      <Avatar.Group
        size="large"
        max={{
          count: 3,
          style: {
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            cursor: "pointer",
          },
          popover: { trigger: "click" },
        }}
      >
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: "#1677ff" }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
      <Button type="dashed" className="more-details-btn">
        ...
      </Button>
    </div>
  );
}
