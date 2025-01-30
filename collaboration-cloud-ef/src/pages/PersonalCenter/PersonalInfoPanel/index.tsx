import React, { useState, useEffect } from "react";
import "./index.scss";
import { Typography, DatePicker } from "antd";
import { PERSONAL_CENCRT_ICON_URL } from "../contant";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const {
  accountIcon,
  nameIcon,
  nicknameIcon,
  classIdIcon,
  genderIcon,
  calendarIcon,
  homeTownIcon,
} = PERSONAL_CENCRT_ICON_URL;

const getItem = (
  icon: string,
  title: string,
  value: string,
  editable: boolean,
  onChange?: (value: string) => void
) => {
  return (
    <div className="personal-info-item">
      <img src={icon} alt={title} className="personal-info-item-icon" />
      <span>{title}</span>
      {editable ? (
        <Paragraph
          style={{ marginLeft: "2rem" }}
          editable={{ onChange: onChange }}
        >
          {value}
        </Paragraph>
      ) : (
        <span style={{ marginLeft: "2rem" }}>{value}</span>
      )}
    </div>
  );
};

export default function PersonalInfoPanel() {
  const [name, setName] = useState("张三");
  const [nickname, setNickname] = useState("Yaqu");
  const [account, setAccount] = useState("1701010101");
  const [classId, setClassId] = useState("1701");
  const [gender, setGender] = useState("女");
  const [birthday, setBirthday] = useState("2000-01-01");
  const [homeTown, setHomeTown] = useState("杭州");
  const [birthdayEdit, setBirthdayEdit] = useState(false);
  const [tempBirthday, setTempBirthday] = useState<string | null>(birthday);

  useEffect(() => {
    // TODO: get personal info from server
    setNickname("Yaqu");
    setAccount("1701010101");
    setClassId("1701");
    setGender("女");
    setHomeTown("杭州");
    setBirthday("2000-01-01");
  }, []);

  // xx
  const handleBirthdayUpdate = () => {
    if (tempBirthday) {
      setBirthday(tempBirthday);
    }

    setBirthdayEdit(false);
  };

  return (
    <div className="personal-info-panel">
      <div className="personal-info-panel-left">
        <p style={{ fontSize: "1rem", fontWeight: "bold" }}>About You</p>
        <div className="personal-info-content personal-info-panel-left-content">
          <div className="personal-info-top">谁可以看见?</div>
          {/* <p>姓名: </p> */}
          {getItem(nameIcon, "姓名:", name, false)}
          {/* <p>学号: </p> */}
          {getItem(accountIcon, "学号:", account, false)}
          {/* <p>班级: </p> */}
          {getItem(nicknameIcon, "昵称:", nickname, true, setNickname)}
          {getItem(genderIcon, "性别:", gender, true, setGender)}
          {getItem(classIdIcon, "班级:", classId, true, setClassId)}
          {/* <div className="nickname">
            昵称:{" "}
            <Paragraph editable={{ onChange: setNickname }}>
              {nickname}
            </Paragraph>
          </div> */}
          {getItem(homeTownIcon, "家乡:", homeTown, true, setHomeTown)}
          <div
            className="personal-info-item"
            onClick={() => setBirthdayEdit(true)}
          >
            <img src={calendarIcon} className="personal-info-item-icon" />
            <span>{"出生日期:"}</span>
            {birthdayEdit ? (
              <>
                <DatePicker
                  onChange={(date) => { setTempBirthday(date ? date.format("YYYY-MM-DD") : null)}}
                />
                <CheckOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBirthdayUpdate()}}
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
              <span style={{ marginLeft: "2rem" }}>{birthday}</span>
            )}
          </div>
        </div>
      </div>

      <div className="personal-info-panel-right">
        <p>Contact</p>
        <div className="personal-info-content personal-info-panel-right-content"></div>
      </div>
    </div>
  );
}
