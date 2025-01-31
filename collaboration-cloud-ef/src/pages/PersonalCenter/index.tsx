import React, { useState, useEffect } from "react";
import "./index.scss";
import avatarExample from "@/assets/avatarExample.png";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PersonalInfoPanel from "./PersonalInfoPanel";
import Collection from "./Collection";
import AccountSetting from "./AccountSetting";
import { HighlightOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import BackgroundSwitcher from "@/component/BackgroundSwitcher";
// import { getUserPortrait } from '@/utils/globalState';

interface IProps {
  name: string;
}

export default function PersonalCenter() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [value, setValue] = React.useState("1");
  const [isColorsShow, setIsColorsShow] = useState(false);
  const [backGround, setBackGround] = useState('linear-gradient(137.56deg,rgb(167, 112, 239) 9.09%,rgb(207, 139, 243) 46.04%,rgb(253, 185, 155) 85.38%)');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const isImageUrl = (backGround: string) => backGround.startsWith('http');

  useEffect(() => {
    // 获取用户信息
    // 设置用户信息
    // 设置用户头像
    // 设置用户名
  }, []);

  return (
    <div className="personal-center">
      <div className="top-background" style={ isImageUrl(backGround) ? { backgroundImage: `url(${backGround})` } : { background: backGround } }>
        {" "}
        <Dropdown
          trigger={["click"]}
          dropdownRender={() => <BackgroundSwitcher setBackground={setBackGround} />}
        >
          <Button
            variant="solid"
            className="modify-background-btn"
            onClick={() => {
              setIsColorsShow(!isColorsShow);
            }}
          >
            <HighlightOutlined style={{ marginRight: "0.5rem" }} />
            修改个性背景
          </Button>
        </Dropdown>
      </div>

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
              <Tab label="个人信息" value="1" />
              <Tab label="我的收藏" value="2" />
              <Tab label="账号管理" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {" "}
            <PersonalInfoPanel />{" "}
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <Collection />{" "}
          </TabPanel>
          <TabPanel value="3">
            {" "}
            <AccountSetting />{" "}
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
