import React, { useState, useEffect } from "react";
import "./index.scss";
import avatarExample from "@/assets/avatarExample.png";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PersonalInfoPanel from "./PersonalInfoPanel";
// import { getUserPortrait } from '@/utils/globalState';

interface IProps {
  name: string;
}

export default function PersonalCenter() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    // 获取用户信息
    // 设置用户信息
    // 设置用户头像
    // 设置用户名
  }, []);

  return (
    <div className="personal-center">
      <div className="top-background" />

      <div className="avatar-block">
        <img
          src={avatarUrl || avatarExample}
          alt="avatar"
          className="personal-avatar"
        />
        <span className="user-name">{name || "Yaqu"}</span>
      </div>

      <div className="personal-center-content">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="个人主页" value="1" />
              <Tab label="我的收藏" value="2" />
              <Tab label="账号管理" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"> <PersonalInfoPanel /> </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </div>
    </div>
  ); 
}
