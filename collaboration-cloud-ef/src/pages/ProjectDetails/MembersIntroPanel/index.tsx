import React, { useState, useEffect } from "react";
import defaultAvatar from "@/assets/defaultAvater.png";
import "./index.scss";
import { peopleInfoType } from "@/typings/type";
import { Chip, Avatar, colors } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import TextAreaPro from "../TextAreaPro";
import AddNewMember from "./AddNewMember";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface IProps {
  teachers: peopleInfoType[];
  members: peopleInfoType[];
  recordContent: string;
  onInvite: (value:boolean) => void;
}

const getAvatar = (avatar: string) => {
  return <Avatar src={avatar} sx={{ border: "1px solid #ccc" }} />;
};

const chipStyle = {
  gap: 1,
  margin: 1,
  padding: 0.5,
  fontSize: "0.8rem",
  height: "2.2rem",
};

export default function MembersIntroPanel(prop: IProps) {
  const { teachers, members, recordContent, onInvite } = prop;
  const navigate = useNavigate();

  const handleCommunicte = () => {
    console.log("handleCommunicte");
    // 跳转到聊天页面
  };

  const handleChipClick = (name:string, avatar:string) => {
    console.log("handleChipClick");
    // 跳转到个人主页
    navigate("/home/personal-center", { state: { name: name, avatarUrl: avatar, isOwner: false } });
  };

  const handleAddMember = () => {
    onInvite(true);
  };

  const getChip = (
    index: number,
    name: string,
    avatar: string,
    color: string
  ) => {
    return (
      <Chip
        className="member-chip"
        key={index}
        variant="outlined"
        avatar={getAvatar(avatar)}
        label={name}
        onDelete={handleCommunicte}
        onClick={() => handleChipClick(name, avatar)}
        deleteIcon={<ChatRoundedIcon />}
        color={color as any}
        sx={chipStyle}
      />
    );
  };

  return (
    <>
    <div className="panel-container">
      <div className="record-board">
        <TextAreaPro
          recordContent={recordContent}
          title="实时记录板"
          placeholder="实时记录todo、临时idea、备忘..."
        />
      </div>
      <div className="teacher-block">
        <p className="member-intro-title">指导老师</p>
        {teachers.map((teacher, index) =>
          getChip(
            index,
            teacher.name,
            teacher.avatar ?? defaultAvatar,
            "primary"
          )
        )}
        {/* 跳转项目组 【教师侧添加人 减少人】*/}
        <div className="teacher-intro"></div>
      </div>
      <div className="member-block">
        <p className="member-intro-title">小组成员</p>
        {members.map((member, index) =>
          getChip(
            index,
            member.name,
            member.avatar ?? defaultAvatar,
            "secondary"
          )
        )}
        <Chip
          onClick={handleAddMember}
          avatar={<AddCircleIcon />}
          label={"邀请成员"}
          sx={chipStyle}
        />
      </div>
    </div>
    </>
  );
}
