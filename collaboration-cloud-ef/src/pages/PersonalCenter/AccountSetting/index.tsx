import React, { useState, useEffect } from "react";
import { Input, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import "./index.scss";
import { getUserAccount, getUserTelephone } from "@/utils/globalState";
import { Button } from "@mui/material";
import { getUserPassword } from "@/utils/globalState";

const correctPwd = getUserPassword() ?? "123456";
export default function AccountSetting() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    //后端获取密码 加密后再解密
    setIsOk(password === correctPwd);
    console.log(password, correctPwd);
  }, [password]);

  const handleConfirm = () => {
    message.success('密码修改成功！');
    setPassword('');
    setIsOk(false);
    setNewPassword('');
    setConfirmNewPassword('');
  }

  return (
    <div className="account-setting">
      <p style={{ fontSize: "1.2rem" }}>安全设置</p>
      <div className="account-info-top">
        <p>当前账号：{getUserAccount() || "170117120000"}</p>
        <p>绑定手机号：{getUserTelephone() || "13800138000"}</p>
      </div>

      <h4 style={{ marginTop: "2rem" }}>修改密码</h4>
      <p style={{ color: "#999", marginTop: "0.5rem" }}>
        当您更改密码时，我们会保持您登录到此设备，但可能会将您从其他设备上注销。
      </p>

      <div className="change-password-input">
        <p>
          当前密码<span className="required">*</span>：
        </p>
        <Input.Password
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="输入当前密码"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>

      <div className="change-password-input">
        <p>
          新密码<span className="required">*</span>：
        </p>
        <Input.Password
          className="password-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="输入新密码"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>

      <div className="change-password-input">
        <p>
          确认新密码<span className="required">*</span>：
        </p>
        <Input.Password
          className="password-input"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="再次输入新密码"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>

      <Button
        disabled={
          !isOk || newPassword !== confirmNewPassword || newPassword === ""
        }
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={handleConfirm}
      >
        确认修改
      </Button>
    </div>
  );
}
