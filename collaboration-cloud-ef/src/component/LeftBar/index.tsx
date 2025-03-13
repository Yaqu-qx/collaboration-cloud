import React, {useState} from "react";
import "./index.scss";
import { HomeFilled, SettingFilled, MailFilled, QuestionCircleFilled } from "@ant-design/icons";


interface Iprops {
  onDrawerOpen: () => void; 
}

export default function LeftBar(props:Iprops) {
  const [activeIndex, setActiveIndex] = useState(0);

  const iconList = [
  {
    name: "Home",
    icon: <HomeFilled className='menu-icon' id='Home'/>,
  },
  {
    name: "Bell",
    icon: <MailFilled className='menu-icon' id='Bell' onClick={props.onDrawerOpen}/>,
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
