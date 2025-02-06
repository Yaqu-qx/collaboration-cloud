import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { Tabs } from "antd";
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
import TaskList from "./TaskList";
import DataWareHouse from "./FilesWareHouse";

export default function ProjectDetails() {
  const location = useLocation();
  const { projectId, projectName, projectAvatar, tags } = location.state;
  const navigate = useNavigate();

  const tabsItem = [
    {
      title: "总览",
      icon: <GlobalOutlined />,
      chilren: <ProjectSummery projectId={projectId} />,
    },
    {
      title: "List",
      icon: <UnorderedListOutlined />,
      chilren: <TaskList />,
    },
    {
      title: "频道",
      icon: <MessageOutlined />,
      chilren: <ProjectSummery projectId={projectId} />,
    },
    {
      title: "资料库",
      icon: <ProfileOutlined />,
      chilren: <DataWareHouse projectName={projectName} />,
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
  };

  return (
    <>
      <Header title={projectName} imageUrl={projectAvatar} tags={tags} />
      <Tabs
        className="tabs"
        defaultActiveKey="1"
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
