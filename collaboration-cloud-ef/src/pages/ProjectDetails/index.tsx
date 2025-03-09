import React, { useState, useEffect } from "react";
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
import Channel from "../Channel";
import { TABS_KEY } from "./constant";

export default function ProjectDetails() {
  const location = useLocation();
  const { projectId, projectName, projectAvatar, tags, channelId, isManager } = location.state;
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(TABS_KEY.Project_Summery as string);
  const [taskListFilter, setTaskListFilter] = useState({});

  const handleGotoTaskList = (filter: any) => {
    // 跳转到任务列表
    setActiveKey(TABS_KEY.Project_Tasks);
    setTaskListFilter(filter);
  };

  const tabsItem = [
    {
      title: "总览",
      icon: <GlobalOutlined />,
      chilren: <ProjectSummery projectId={projectId} onTaskList={handleGotoTaskList} isManager={isManager} />,
    },
    {
      title: "List",
      icon: <UnorderedListOutlined />,
      chilren: <TaskList filter={taskListFilter} isManager={isManager} />,
    },
    {
      title: "频道",
      icon: <MessageOutlined />,
      chilren: <Channel />,
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
      navigate("/home/discussion-center", {state: {channelId: channelId}});
    } else {
      setActiveKey(key);
    }
  };

  return (
    <>
      <Header title={projectName} imageUrl={projectAvatar} tags={tags} />
      <Tabs
        className="tabs"
        defaultActiveKey="1"
        activeKey={activeKey}
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
