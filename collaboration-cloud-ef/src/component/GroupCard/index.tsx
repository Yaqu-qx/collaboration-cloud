import React, { useState } from "react";
import "./index.scss";
import { groupInfo } from "@/typings/api/project_info";
import { Avatar, Button, Tooltip, Modal } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import leaveGroupIcon from "@/assets/leaveGroup.png";
import dismissGroupIcon from "@/assets/dismiss.png";

interface Props {
  group: groupInfo;
  onLeave: () => void;
  type?: "joinedGroup" | "managedGroup";
  onMore?: (groupId: string) => void;
}

export default function GroupCard(props: Props) {
  const { group, onLeave, type, onMore } = props;
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  const handleLeave = () => {
    onLeave();
    setOpenLeaveModal(false);
  };

  return (
    <>
      <Modal
        title={`确认${type === "joinedGroup" ? "退出" : "解散"}该项目组？`}
        centered
        open={openLeaveModal}
        onOk={handleLeave}
        okText={"确认"}
        cancelText={"取消"}
        onCancel={() => setOpenLeaveModal(false)}
      />
      <div className="group-card">
        <div className="group-header">
          <img
            src={props.group.group_avatar}
            alt="group-avatar"
            className="group-avatar"
          />
          <div className="group-header-right">
            <div className="icon-container">
              <Tooltip
                placement="topRight"
                title={type === "managedGroup" ? "解散项目组" : "退出项目组"}
              >
                <img
                  src={
                    type === "managedGroup" ? dismissGroupIcon : leaveGroupIcon
                  }
                  alt="leave-group"
                  className="leave-group-icon"
                  onClick={() => setOpenLeaveModal(true)}
                />{" "}
              </Tooltip>
            </div>

            <p>{group.group_name}</p>
          </div>
        </div>

        <div className="group-description">
          {group.description ||
            "props.group.description 这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx这是一个xxx项目，负责人是xxx。主要研究方向是xxx"}
        </div>
        <Avatar.Group
          size="large"
          max={{
            count: 3,
            style: {
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
              marginBottom: "1rem",
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
        {type === "managedGroup" && (
          <Tooltip title={"查看整组项目进展"}>
            <Button
              type="dashed"
              className="more-details-btn"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onMore?.(group.group_id);
              }}
            >
              ...
            </Button>
          </Tooltip>
        )}
      </div>
    </>
  );
}
