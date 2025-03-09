import React, { useState } from "react";
import "./index.scss";
import {
  Divider,
  Button,
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  VisibilityOff,
  Visibility,
  GppGood,
  Lock,
  LockTwoTone,
} from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Vcode from "react-vcode";
import EndAdornment from "../EndAdornment";
import { message } from "antd";

interface Props {
  onLorRChange: (newLorR: string) => void;
  onDailogShowChange: (newShow: boolean) => void;
}

export default function Register(props: Props) {
  const [showPasswordF, setShowPasswordF] = useState(false);
  const [showPasswordS, setShowPasswordS] = useState(false);

  const handleClickShowPasswordF = () => {
    setShowPasswordF(!showPasswordF);
  };

  const handleClickShowPasswordS = () => {
    setShowPasswordS(!showPasswordS);
  };

  return (
    <div className="register-block">
      <Divider sx={{ mb: 2, mt: 1 }} className="register-title">
        新用户注册
      </Divider>
      {/* 手机号 */}
      <TextField
        label="*手机号"
        id="outlined-start-adornment"
        sx={{ m: 0.5, width: "42ch" }}
        size="medium"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start"> +86 </InputAdornment>
            ),
          },
        }}
      />
      {/* 用户名 */}
      <TextField
        label="*请设置用户名"
        id="outlined-start-adornment"
        sx={{ m: 0.5, width: "42ch" }}
        size="medium"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ padding: "0.1rem 0" }} />
              </InputAdornment>
            ),
          },
        }}
      />
      {/* 设置密码 */}
      <TextField
        label="*请输入密码"
        id="outlined-start-adornment"
        sx={{ m: 0.5, width: "42ch" }}
        size="medium"
        type={showPasswordF ? "text" : "password"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ padding: "0.1rem" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <EndAdornment showPassword={showPasswordF} handleClickShowPassword={handleClickShowPasswordF} />
            ),
          },
        }}
      />
      {/* 确认密码 */}
      <TextField
        label="*请确认密码"
        id="outlined-start-adornment"
        sx={{ m: 0.5, width: "42ch" }}
        size="medium"
        type={showPasswordS ? "text" : "password"}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockTwoTone sx={{ padding: "0.1rem" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <EndAdornment showPassword={showPasswordS} handleClickShowPassword={handleClickShowPasswordS} />
            ),
          },
        }}
      />

      {/* 验证码 */}
      <div className="vcode-block">
        <GppGood />
        <Input placeholder="请输入验证码" />
        {/* https://github.com/javaLuo/react-vcode */}
        <Vcode style={{ marginLeft: "auto" }} />
      </div>

      {/* 选择身份 */}
      <div className="identity-selection">
        <span style={{ padding: "0.7rem 0" }}>您注册的身份是：</span>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className="identity-radio"
        >
          <FormControlLabel value="female" control={<Radio />} label="学生" />
          <FormControlLabel value="male" control={<Radio />} label="教师" />
        </RadioGroup>
      </div>
      <Button 
        variant="contained" 
        className="login-button"
        /* onClick={() => props.onDailogShowChange(true)}*/
        onClick={() => message.success("注册成功！")}>
        注册
      </Button>

      <div className="goto-register">
        已有账号？
        <span
          className="register-link"
          onClick={() => props.onLorRChange("login")}
        >
          立即登录
        </span>
      </div>
    </div>
  );
}
