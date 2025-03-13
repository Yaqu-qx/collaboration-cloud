import React, { useState } from "react";
import "./index.scss";
import { Dropdown, Modal } from "antd";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import MoreOutlined from "@mui/icons-material/MoreOutlined";
import type { MenuProps } from "antd";
import { peopleInfoType } from "@/typings/type";
import defaultAvatar from "@/assets/avatarExample.png";
import { Chip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import MailSendPanel from "@/component/MailSendPanel";
import { getUserName } from "@/utils/globalState";

interface IHeaderProps {
  channelInfo: any;
  members: peopleInfoType[];
  channelName: string;
  memberCount: number;
  onAddNewMember?: () => void;
  handleDeleteChannel: (channelId:string) => void;
}

const chipStyle = {
  gap: 1,
  margin: 1,
  padding: 0.5,
  fontSize: "0.8rem",
  height: "2.2rem",
};

const Header = (props: IHeaderProps) => {
  const { channelInfo, members, channelName, memberCount, onAddNewMember, handleDeleteChannel } =
    props;
  const [showSendPanel, setShowSendPanel] = useState(false); // 初始状态改为关闭
  const [clickName, setClickName] = useState("");
  const [clickAvatar, setClickAvatar] = useState("");
  const navigate = useNavigate();
  const handleCommunicte = (name: string, avatar: string) => {
    console.log("handleCommunicte");
    setShowSendPanel(true);
    setClickName(name);
    setClickAvatar(avatar ?? defaultAvatar);
  };
  const isManager = channelInfo.createBy === getUserName(); // 初始状态为非管理员
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // 频道更多
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="channel-detail" onClick={onAddNewMember}>
          添加成员
        </div>
      ),
    },
    {
      key: "2",
      label: <div className="channel-quit" onClick={() => setShowDeleteConfirm(true)}>{!isManager ? "退出频道" : ""}</div>,
    },
  ];

  const handleChipClick = (name: string, avatar: string) => {
    console.log("handleChipClick");
    // 跳转到个人主页
    navigate("/home/personal-center", {
      state: { name: name, avatarUrl: avatar, isOwner: false },
    });
  };

  const memberItems = () => {
    return (
      <div className="channel-member">
        {members.map((member, index) => (
          <Chip
            className="member-chip"
            key={index}
            variant="outlined"
            avatar={
              <Avatar src={member.avatar} sx={{ border: "1px solid #ccc" }} />
            }
            label={member.name}
            onDelete={() => handleCommunicte(member.name, member.avatar)}
            onClick={() => handleChipClick(member.name, member.avatar)}
            deleteIcon={<EmailIcon />}
            sx={chipStyle}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Modal
        title={isManager ? "解散频道" : "退出频道"}
        open={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onOk={() => {setShowDeleteConfirm(false); handleDeleteChannel(channelInfo.channelId);}}
        okText="确定"
        cancelText="取消"
      >
        <p>{isManager ? "您确定要解散该频道吗？" : "您确定要退出该频道吗？"}</p>
      </Modal>
      <MailSendPanel
        isSomeOne={true}
        showSendPanel={showSendPanel}
        setShowSendPanel={setShowSendPanel}
        toPersonName={clickName}
        toPersonAvater={clickAvatar}
      />
      <div className="channel-header">
        <p>{"#" + channelName}</p>
        <div className="channel-actions">
          <Dropdown
            placement="bottomRight"
            dropdownRender={memberItems}
            overlayStyle={{ zIndex: 100000 }}
          >
            <div className="inquire-members">
              <PeopleOutlineSharpIcon className="members-icon" />
              <span>{memberCount}</span>
            </div>
          </Dropdown>
          <Dropdown menu={{ items }} overlayStyle={{ zIndex: 100000 }}>
            <MoreOutlined />
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
