import React, {useState} from "react";
import "./index.scss";
import { HomeFilled, SettingFilled, BellFilled, QuestionCircleFilled } from "@ant-design/icons";

const iconList = [
  {
    name: "Home",
    icon: <HomeFilled className='menu-icon' id='Home'/>,
  },
  {
    name: "Bell",
    icon: <BellFilled className='menu-icon' id='Bell'/>,
  },
  {
    name: "Settings",
    icon: <SettingFilled className='menu-icon' id="Settings"/>,
  },
  {
    name: "Question",
    icon: <QuestionCircleFilled className='menu-icon' id="Question"/>
  }
];

export default function LeftBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index: number) => {
    setActiveIndex(index);

    // TODO: 页面跳转逻辑
  };

  return (
    <div className="container">
      <ul className="list-block">
        {iconList.map((item, index) => (
          <li key={index} className={`list-item ${activeIndex === index? "active" : ""}`} onClick={() => handleOnClick(index)}>
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
}
