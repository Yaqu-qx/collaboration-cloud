import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { Button, Tabs } from "antd";
import Header from "./Header";
import {
  GlobalOutlined,
  MessageOutlined,
  ProfileOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import ProjectSummery from "./ProjectSummery";
import ProjectCalendar from "./ProjectCalendar";


export default function ProjectDetails() {
  const location = useLocation();
  const { projectName, projectAvatar, tags } = location.state;
  const navigate = useNavigate();

  const tabsItem = [
    {
      title: "总览",
      icon: <GlobalOutlined />,
      chilren: <ProjectSummery />,
    },
    {
      title: "List",
      icon: <UnorderedListOutlined />,
      chilren: <ProjectSummery />,
    },
    {
      title: "频道",
      icon: <MessageOutlined />,
      chilren: <ProjectSummery />,
    },
    {
      title: "资料库",
      icon: <ProfileOutlined />,
      chilren: <ProjectSummery />,
    },
    {
      title: "日历",
      icon: <CalendarOutlined />,
      chilren: <ProjectCalendar />,
    },
  ];

  const handleTabClick = (key: string, event: any) => {
    const selectedTab = tabsItem[parseInt(key) - 1];
    if (selectedTab.title === "频道") {
      navigate("/home");
    }

    if (selectedTab.title === "资料库") {
      navigate("/home");
    }
  };

  return (
    <>
      <Header title={projectName} imageUrl={projectAvatar} tags={tags} />
      <Tabs
        className="tabs"
        defaultActiveKey="2"
        onTabClick={handleTabClick}
        items={tabsItem.map((item, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: item.title,
            children: item.chilren,
            icon: item.icon,
          };
        })}
      />
    </>
  );
}
