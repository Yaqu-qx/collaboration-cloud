import React, { useState } from "react";
import "./index.scss";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Input,
} from "@mui/material";
import { Smartphone, GppGood, Lock } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Vcode from "react-vcode";
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  onLorRChange: (newLorR: string) => void,
}

export default function PhoneLogin(props: Props) {
  const [identity, setIdentity] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState('60');
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  function handleClick() {
    setLoading(true);
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setIdentity(event.target.value);
    console.log("身份：",identity);
  };

  const handleLoginSubmit = () => {

  }

  return (
    <div className="login-block">
      {/* 手机号 */}
      <FormControl sx={{ m: 0.5, width: "42ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-userId">
          <Smartphone />
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-userId"
          type={"text"}
          label="uid"
        />
      </FormControl>

      {/* 验证码 */}
      <div className="vcode-block">
        <GppGood />
        <Input placeholder="请输入验证码" />
        {/* https://github.com/javaLuo/react-vcode */}
        <Vcode style={{marginLeft: "auto"}}/>
      </div>

      {/* 手机验证码 */}
      <div className="phone-vcode-block">
        <Lock />
        <Input placeholder="请输入短信验证码" />
        <LoadingButton
          onClick={handleClick}
          loading={loading}
          loadingIndicator= {count}
          variant="outlined"
          sx={{ ml: "auto" }}
        >
          发送验证码
        </LoadingButton>
      </div>

      <div className="identity-selection">
        <span style={{ padding: "0.7rem 0" }}>请选择您的登录身份：</span>
        <FormControl variant="filled" sx={{ minWidth: 140, ml: "auto" }}>
          <InputLabel id="demo-simple-select-filled-label">identity</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={identity}
            onChange={handleSelectChange}
          >
            <MenuItem value={10}>学生</MenuItem>
            <MenuItem value={20}>教师</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button 
        variant="contained" 
        className="login-button">
        登录
      </Button>

      <div className="goto-register">
        还没有账号？请 
        <span 
          className="register-link"
          onClick={() => props.onLorRChange("register")}>
           前往注册
        </span>
      </div>
    </div>
  );
}
