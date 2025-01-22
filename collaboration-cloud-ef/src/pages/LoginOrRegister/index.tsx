import React, { useState } from "react";
import "./index.scss";
import { TextListData } from "@/constant/const";
import { Box, Tab, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { FiberManualRecord } from "@mui/icons-material";
import PassageLogin from "./PasswordLogin";
import PhoneLogin from "./PhoneLogin";
import Register from "./Register";
import Logo from "@/assets/logo.png";
import VerificationInput from "react-verification-input";

export default function Start() {
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const [loginMode, setLoginMode] = useState("1");
  const [dailogOpen, setDailogOpen] = useState(false);

  const listItem = (item: string, index: number) => {
    return (
      <li key={index} className="intro-item">
        <FiberManualRecord />
        <span>{item}</span>
      </li>
    );
  };

  const handleLoginModeChange = (
    event: React.SyntheticEvent,
    newLoginMode: string
  ) => {
    setLoginMode(newLoginMode);
  };

  const handleLorRChange = (newLorR: string) => {
    console.log(newLorR);
    setLoginOrRegister(newLorR);
  };

  const handleDailogShowChange = (newShow: boolean) => {
    setDailogOpen(newShow);
  };

  return (
    <div className="login-page">
      <div className="branding-section">
        <img alt="logo" src={Logo} className="logo" />
        <div className="intro-list">
          <ul style={{ listStyleType: "none" }}>
            {TextListData.items.map((item, index) => listItem(item, index))}
          </ul>
        </div>
      </div>

      {loginOrRegister === "login" ? (
        <div className="login-container">
          <TabContext value={loginMode}>
            <Box
              sx={{ borderBottom: 2, borderColor: "divider" }}
              className="login-title-block"
            >
              {/* 切换登录方式 根据mode */}
              <TabList
                onChange={handleLoginModeChange}
                aria-label="lab API tabs example"
              >
                <Tab label="账号登录" value="1" />
                <Tab label="手机号登录" value="2" />
              </TabList>
            </Box>
            {/* 账号登录 */}
            <TabPanel value="1" className="intera-block">
              <PassageLogin onLorRChange={handleLorRChange} />
            </TabPanel>

            {/* 手机号注册 */}
            <TabPanel value="2" className="intera-block">
              <PhoneLogin onLorRChange={handleLorRChange} />
            </TabPanel>
          </TabContext>
        </div>
      ) : (
        <div className="register-container">
          <Register
            onLorRChange={handleLorRChange}
            onDailogShowChange={handleDailogShowChange}
          />
        </div>
      )}

      <Dialog
        open={dailogOpen}
        onClose={() => handleDailogShowChange(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleDailogShowChange(false);
          },
        }}
      >
        <DialogTitle>Verification Code</DialogTitle>
        <DialogContent sx={{ width: "30rem" }}>
          <DialogContentText>
            已发送验证码至您的手机，请注意查收。
            输入验证码以完成注册。（*5分钟后验证码自动失效！）
          </DialogContentText>
          <div className="test" style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            {/* https://gitcode.com/gh_mirrors/re/react-verification-input?utm_source=artical_gitcode&index=top&type=href&&isLogin=1 */}
            <VerificationInput
              autoFocus={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
