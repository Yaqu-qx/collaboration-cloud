import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  MenuItem,
  Button,
  Checkbox,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setGlobalUserInfo, getGlobalUserInfo } from "@/utils/globalState";

interface Props {
  onLorRChange: (newLorR: string) => void;
}

export default function PassageLogin(props: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [identity, setIdentity] = useState("");
  const [checked, setChecked] = useState(false);
  const [account, setAccount] = useState(""); // 账号
  const [password, setPassword] = useState(""); // 密码
  const [alertMessage, setAlertMessage] = useState({display: false, message: ""});
  const Navigate = useNavigate(); // 路由导航

  // 账号输入
  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(event.target.value);
  };
  // 密码输入
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // 复选框
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  // 选择身份
  const handleIdentityChange = (event: SelectChangeEvent) => {
    console.log("身份", event.target.value);
    setIdentity(event.target.value);
  };
  // 显示/隐藏密码
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // 阻止默认事件
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // 提交登录
  const handleLoginSubmit = () => {
    const data = {
      account: account,
      password: password,
      identity: identity,
    };
    // console.log(data.account, data.password, data.identity);
    const queryString = new URLSearchParams(data).toString();
    console.log(queryString);
    fetch(`http://localhost:4000/login?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === 1) {
          // 登录成功后，跳转到主页
          Navigate("/home", { state: { loginAlert: true } });
          localStorage.setItem("userInfo", data.data);
          setGlobalUserInfo(data.data);
          // console.log("???", getGlobalUserInfo());
        } else {
          // 登录失败后，提示错误信息
          console.log("登录失败，请检查账号或密码！");
          setAlertMessage({display: true, message: "登录失败，请检查账号或密码！"});
        }
      })
      .catch((error) => {
        console.error(error);
        setAlertMessage({display: true, message: error});
      });
  };

  return (
    <div className="login-block">
      {/* 账号 */}
      <FormControl sx={{ m: 0.5, width: "42ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-userId">
          <Person />
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-userId"
          type={"text"}
          label="uid"
          onChange={handleAccountChange}
        />
      </FormControl>
      {/* 密码 */}
      <FormControl sx={{ m: 0.5, width: "42ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          <Lock />
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="pw"
          onChange={handlePasswordChange}
        />
      </FormControl>
      {/* <div className="identity-selection">
        <span style={{ padding: "0.7rem 0" }}>请选择您的登录身份：</span>
        <FormControl variant="filled" sx={{ minWidth: 140 }}>
          <InputLabel id="demo-simple-select-filled-label">identity</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={identity}
            onChange={handleIdentityChange}
          >
            <MenuItem value={0}>学生</MenuItem>
            <MenuItem value={1}>教师</MenuItem>
          </Select>
        </FormControl>
      </div> */}

      {/* 复选框和忘记密码 */}
      <div className="login-help">
        <Checkbox
          checked={checked}
          onChange={handleCheckChange}
          inputProps={{ "aria-label": "7天内免登录" }}
        />
        <span className="remember-me">7天内免登录</span>
        <Button variant="text" className="forget-password-link">
          忘记密码
        </Button>
      </div>

      <Button
        variant="contained"
        className="login-btn"
        onClick={handleLoginSubmit}
      >
        登录
      </Button>
      {alertMessage.display && <Alert severity="error"> {alertMessage.message} </Alert>}

      <div className="goto-register">
        还没有账号？请
        <span
          className="register-link"
          onClick={() => props.onLorRChange("register")}
        >
          前往注册
        </span>
      </div>
    </div>
  );
}
