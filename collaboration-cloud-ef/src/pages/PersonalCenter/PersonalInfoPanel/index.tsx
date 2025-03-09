import React, { useState, useEffect } from "react";
import "./index.scss";
import { Typography, DatePicker, Input, Dropdown, Tooltip } from "antd";
import { PERSONAL_CENCRT_ICON_URL } from "../contant";
import {
  CheckOutlined,
  CloseOutlined,
  GlobalOutlined,
  TeamOutlined,
  LockOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Button } from "@mui/material";
import type { MenuProps } from "antd";

interface infoItemType {
  value: string;
  visiableMode: number;
}

// 添加 tooltip 组件

const { Paragraph } = Typography;
const {
  accountIcon,
  nameIcon,
  nicknameIcon,
  classIdIcon,
  genderIcon,
  calendarIcon,
  homeTownIcon,
  phoneIcon,
  emailIcon,
  wechatIcon,
  githubIcon,
  blogIcon,
} = PERSONAL_CENCRT_ICON_URL;

const Visiable: React.ReactNode[] = [
  <div className="visiable-select">
    <GlobalOutlined />
    <span style={{ marginLeft: "0.5rem" }}>所有人</span>
  </div>,
  <div className="visiable-select">
    <TeamOutlined />
    <span style={{ marginLeft: "0.5rem" }}>仅项目队友</span>
  </div>,
  <div className="visiable-select">
    <LockOutlined />
    <span style={{ marginLeft: "0.5rem" }}>仅自己</span>
  </div>,
];

const getMenu = (
  value: string,
  updateInfo: (value: infoItemType) => void
): MenuProps["items"] => {
  const handleMenuClick = (e: any) => {
    e.domEvent.stopPropagation();
    updateInfo({ value, visiableMode: Number(e.key) });
  };

  return [
    {
      key: "0",
      label: Visiable[0],
      onClick: handleMenuClick,
    },
    {
      key: "1",
      label: Visiable[1],
      onClick: handleMenuClick,
    },
    {
      key: "2",
      label: Visiable[2],
      onClick: handleMenuClick,
    },
  ];
};

const getItem = (
  icon: string,
  title: string,
  info: infoItemType,
  editable: boolean,
  updateInfo: (value: infoItemType) => void,
  isOwner: boolean
) => {
  const { value, visiableMode } = info;
  const items: MenuProps["items"] = getMenu(value, updateInfo);

  return (
    <div className="personal-info-item">
      <img src={icon} alt={title} className="personal-info-item-icon" />
      <span>{title}</span>
      {editable && isOwner ? (
        <>
          <Paragraph
            style={{ marginLeft: "2rem" }}
            editable={
              isOwner
                ? {
                    onChange: (newValue: string) =>
                      updateInfo({ value: newValue, visiableMode }),
                  }
                : false
            }
          >
            {value}
          </Paragraph>
          <Dropdown menu={{ items }}>{Visiable[visiableMode]}</Dropdown>
        </>
      ) : (
        uVisiable()
      )}
    </div>
  );
};

const getContactItem = (
  icon: string,
  title: string,
  info: infoItemType,
  isEdit: boolean,
  tempValue: string,
  setIsEdit: (value: boolean) => void,
  onChange: (value: string) => void,
  handleUpdate: () => void,
  setVisiableMode: (value: infoItemType) => void,
  isOwner: boolean
) => {
  const isPhoneNum = title === "手机号:";
  const contantItems: MenuProps["items"] = getMenu(info.value, setVisiableMode);
  return (
    <div className="personal-info-item">
      <img src={icon} alt={title} className="personal-info-item-icon" />
      <span>{title}</span>
      {isEdit ? (
        <>
          <Input
            placeholder="请输入内容"
            value={tempValue}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "15rem" }}
          />
          <CheckOutlined
            onClick={() => handleUpdate()}
            style={{
              color: "green",
              marginLeft: "auto",
              marginRight: "-2rem",
            }}
          />
        </>
      ) : (
        <>
          <span style={{ marginLeft: "2rem" }}>{info.value}</span>
          {isOwner && (
            <Button
              variant="text"
              className="edit-btn"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              {isPhoneNum ? "换绑" : "编辑"}
            </Button>
          )}
        </>
      )}
      {isOwner ? (
        <Dropdown menu={{ items: contantItems }}>
          {Visiable[info.visiableMode]}
        </Dropdown>
      ) : (
        uVisiable()
      )}
    </div>
  );
};

const uVisiable = () => {
  return (
    <div style={{ marginLeft: "auto", color: "#ccc" }}>
      <GlobalOutlined />
      <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}>所有人</span>
    </div>
  );
};

export default function PersonalInfoPanel(props: { isOwner: boolean }) {
  const { isOwner } = props;
  const [name, setName] = useState({} as infoItemType);
  const [nickname, setNickname] = useState({} as infoItemType);
  const [account, setAccount] = useState({} as infoItemType);
  const [classId, setClassId] = useState({} as infoItemType);
  const [gender, setGender] = useState({} as infoItemType);
  const [birthday, setBirthday] = useState({} as infoItemType);
  const [homeTown, setHomeTown] = useState({} as infoItemType);
  const [birthdayEdit, setBirthdayEdit] = useState(false);
  const [tempBirthday, setTempBirthday] = useState<string | null>(
    birthday.value
  );

  const [phoneNum, setPhoneNum] = useState({} as infoItemType);
  const [email, setEmail] = useState({} as infoItemType);
  const [wechat, setWechat] = useState({} as infoItemType);
  const [github, setGithub] = useState({} as infoItemType);
  const [blog, setBlog] = useState({} as infoItemType);

  const [tempPhone, setTempPhone] = useState(phoneNum.value);
  const [tempEmail, setTempEmail] = useState(email.value);
  const [tempWechat, setTempWechat] = useState(wechat.value);
  const [tempGithub, setTempGithub] = useState(github.value);
  const [tempBlog, setTempBlog] = useState(blog.value);

  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isWechatEdit, setIsWechatEdit] = useState(false);
  const [isGithubEdit, setIsGithubEdit] = useState(false);
  const [isBlogEdit, setIsBlogEdit] = useState(false);

  const handlePhoneUpdate = () => {
    // TODO: 跳转换绑页面
    // TODO: 发送验证码
    // if (tempPhone) {
    //   setPhoneNum(tempPhone);
    // }
    // // TODO: update phone number to server
    // setIsPhoneEdit(false);
  };
  const handleEmailUpdate = () => {
    setEmail({ value: tempEmail || " - ", visiableMode: email.visiableMode });
    // TODO: update email to server
    setIsEmailEdit(false);
  };
  const handleWechatUpdate = () => {
    setWechat({
      value: tempWechat || " - ",
      visiableMode: wechat.visiableMode,
    });
    // TODO: update wechat to server
    setIsWechatEdit(false);
  };
  const handleGithubUpdate = () => {
    setGithub({
      value: tempGithub || " - ",
      visiableMode: github.visiableMode,
    });
    // TODO: update github to server
    setIsGithubEdit(false);
  };
  const handleBlogUpdate = () => {
    setBlog({ value: tempBlog || " - ", visiableMode: blog.visiableMode });
    // TODO: update blog to server
    setIsBlogEdit(false);
  };

  useEffect(() => {
    // TODO: get personal info from server
    setName({ value: "张三", visiableMode: 0 });
    setNickname({ value: "Yaqu", visiableMode: 0 });
    setAccount({ value: "1701010101", visiableMode: 0 });
    setClassId({ value: "1701", visiableMode: 0 });
    setGender({ value: "女", visiableMode: 0 });
    setHomeTown({ value: "杭州", visiableMode: 0 });
    setBirthday({ value: "2000-01-01", visiableMode: 0 });
    setPhoneNum({ value: "17010101010", visiableMode: 0 });
    setEmail({ value: "yaqu@163.com", visiableMode: 0 });
    setWechat({ value: "yxqw123456", visiableMode: 0 });
    setGithub({ value: "https://github.com/yaqu-ll", visiableMode: 0 });
    setBlog({ value: " - ", visiableMode: 0 });
  }, []);

  // xx
  const handleBirthdayUpdate = () => {
    if (tempBirthday) {
      setBirthday({ value: tempBirthday, visiableMode: birthday.visiableMode });
    }

    setBirthdayEdit(false);
  };
  const birthdayItems: MenuProps["items"] = getMenu(
    birthday.value,
    setBirthday
  );
  return (
    <div className="personal-info-panel">
      <div className="personal-info-panel-left">
        <p className="personal-info-title">About You</p>
        <div className="personal-info-content personal-info-panel-left-content">
          <div className="personal-info-top">
            谁可以看见?{" "}
            <Tooltip title="根据可见设置，向其他人展示个人信息项">
              <InfoCircleFilled style={{ marginLeft: "0.5rem" }} />
            </Tooltip>
          </div>
          {getItem(nameIcon, "姓名:", name, false, setName, isOwner)}
          {getItem(accountIcon, "账号:", account, false, setAccount, isOwner)}
          {getItem(nicknameIcon, "昵称:", nickname, true, setNickname, isOwner)}
          {getItem(genderIcon, "性别:", gender, true, setGender, isOwner)}
          {getItem(classIdIcon, "班级:", classId, true, setClassId, isOwner)}
          {getItem(homeTownIcon, "家乡:", homeTown, true, setHomeTown, isOwner)}
          <div className="personal-info-item">
            <img src={calendarIcon} className="personal-info-item-icon" />
            <span>{"出生日期:"}</span>
            {birthdayEdit && isOwner ? (
              <>
                <DatePicker
                  onChange={(date) => {
                    setTempBirthday(date ? date.format("YYYY-MM-DD") : null);
                  }}
                />
                <CheckOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBirthdayUpdate();
                  }}
                  className="check-icon"
                />
                <CloseOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    setBirthdayEdit(false);
                  }}
                  className="check-icon"
                />
              </>
            ) : (
              <span
                style={{ marginLeft: "2rem" }}
                onClick={() => setBirthdayEdit(true)}
              >
                {birthday.value}
              </span>
            )}
            {isOwner ? (
              <Dropdown menu={{ items: birthdayItems }}>
                {Visiable[birthday.visiableMode]}
              </Dropdown>
            ) : (
              uVisiable()
            )}
          </div>
        </div>
      </div>

      <div className="personal-info-panel-right">
        <p className="personal-info-title">Contact</p>
        <div className="personal-info-content personal-info-panel-right-content">
          {getContactItem(
            phoneIcon,
            "手机号:",
            phoneNum,
            isPhoneEdit,
            tempPhone,
            // setIsPhoneEdit,
            // setTempPhone,
            handlePhoneUpdate,
            () => null,
            () => null,
            setPhoneNum,
            isOwner
          )}
          {getContactItem(
            emailIcon,
            "邮箱:",
            email || " - ",
            isEmailEdit,
            tempEmail,
            setIsEmailEdit,
            setTempEmail,
            handleEmailUpdate,
            setEmail,
            isOwner
          )}
          {getContactItem(
            wechatIcon,
            "微信:",
            wechat || " - ",
            isWechatEdit,
            tempWechat,
            setIsWechatEdit,
            setTempWechat,
            handleWechatUpdate,
            setWechat,
            isOwner
          )}
          {getContactItem(
            blogIcon,
            "博客:",
            blog || " - ",
            isBlogEdit,
            tempBlog,
            setIsBlogEdit,
            setTempBlog,
            handleBlogUpdate,
            setBlog,
            isOwner
          )}
          {getContactItem(
            githubIcon,
            "GitHub:",
            github || " - ",
            isGithubEdit,
            tempGithub,
            setIsGithubEdit,
            setTempGithub,
            handleGithubUpdate,
            setGithub,
            isOwner
          )}
        </div>
      </div>
    </div>
  );
}
