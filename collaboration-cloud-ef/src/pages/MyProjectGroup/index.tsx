import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Row, Col, Input } from "antd";
import type { SearchProps } from "antd/lib/input";
import { SnippetsOutlined } from "@ant-design/icons";
import { projectInfo, groupInfo } from "@/typings/api/project_info";
import GroupCard from "@/component/GroupCard";
import { fetchGroups, fetchProjectsByUserName } from "@/utils/server";
import ProjectCard from "@/component/ProjectCard";
import { getUserName } from "@/utils/globalState";
import rise from "@/assets/rise.png";
import decline from "@/assets/decline.png";
import sort from "@/assets/sort.png";
import sun from "@/assets/sun.png";
import Loading from "@/component/Loading";
import IconButton from "@mui/material/IconButton";
import MyPlanning from "./MyPlanning";
import CreateGroup from "@/component/CreateGroup";

const sortIcon: string[] = [sort, rise, decline];
const { Search } = Input;
const UserName = getUserName() ?? "Yaqu";

export default function MyProjectGroup() {
  const [projectList, setProjectList] = useState([] as projectInfo[]);
  const [groups, setGroups] = useState([] as groupInfo[]);
  const [projectInputValue, setProjectInputValue] = useState("");
  const [groupInputValue, setGroupInputValue] = useState("");
  const [sortType, setSortType] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const [selectedGroups, setSelectedGroups] = useState(groups);
  const [selectedProjects, setSelectedProjects] = useState(projectList);

  const handleOpenSchedule = () => {
    setOpenSchedule(true);
  };

  const handleGroupSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setGroupInputValue(value);
    // todo 搜索项目组逻辑
  };

  const handleGroupCreate = (newGroupInfo: groupInfo) => {
    setGroups((prevGroups) => [...prevGroups, newGroupInfo]);
  }

  const handleProjectSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setProjectInputValue(value);
    // todo 搜索项目逻辑
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) {
      return "凌晨啦,又是努力的一天~";
    } else if (hour < 9) {
      return "早上好，" + UserName + "！";
    } else if (hour < 12) {
      return "上午好，" + UserName + "！";
    } else if (hour < 13) {
      return "中午好，" + UserName + "！";
    } else if (hour < 17) {
      return "下午好，" + UserName + "！";
    } else if (hour < 23) {
      return "晚上好，" + UserName + "！";
    } else {
      return "夜深啦，好好休息吧~";
    }
  };

  useEffect(() => {
    // 获取项目列表
    const getGroups = fetchGroups()
      .then((response) => response.json())
      .then((data) => {
        console.log("group_data", data);
        setGroups(data);
      })
      .catch((error) => {
        console.error(error);
      });

    const getProjects = fetchProjectsByUserName(UserName)
      .then((response) => response.json())
      .then((data) => {
        console.log("project_data", data);
        setProjectList(data);
      })
      .catch((error) => {
        console.error(error);
      });

    Promise.all([getGroups, getProjects]).then(() => setLoading(false));
  }, []);

  const handleSortModeChange = () => {
    setSortType((sortType + 1) % 3);
    // todo 排序逻辑
  };

  const handleDelete = (groupId: string) => {
    const modifiedGroups = groups.filter((group) => group.group_id !== groupId);
    setGroups(modifiedGroups);
    console.log('modifiedGroups', modifiedGroups);
  }

  useEffect(() => {
    if(groupInputValue.trim() === "") {
      setSelectedGroups(groups);
      return;
    }
    const groupsDisply = groups.filter((group) => {
      return group.group_name.includes(groupInputValue); 
    });
    setSelectedGroups(groupsDisply);
  }, [groupInputValue, groups]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openSchedule && (
            <MyPlanning onClose={() => setOpenSchedule(false)} />
          )}
          {showCreateGroup && (
            <div className="create-group-mask">
              <CreateGroup
                onPanelVisible={setShowCreateGroup}
                isFromNewItemPanel={false}
                onGroupCreate={handleGroupCreate}
              />
            </div>
          )}
          <div className="project-group-container">
            <div className="top-block">
              <div className="greeting">
                <span> {getGreeting()} </span>
                <img src={sun} alt="sun" className="sun-icon" />
              </div>
              <div>
                <IconButton onClick={handleOpenSchedule}>
                  <SnippetsOutlined
                    style={{ fontSize: "1.2rem", color: "#0b43bc" }}
                  />
                </IconButton>
                <span> 凡事预则立，在这里随时check你的计划~</span>
              </div>
            </div>

            <p className="title">项目组</p>
            <div className="operation-bar">
              <Search
                value={groupInputValue}
                onChange={(e) => {
                  setGroupInputValue(e.target.value);
                }}
                placeholder="搜索项目组"
                onSearch={handleGroupSearch}
                allowClear
                className="project-search"
              />
              <Button type="primary" onClick={() => setShowCreateGroup(true)}>
                创建项目组
              </Button>
            </div>

            <Row gutter={[20, 24]} className="group-row">
              {selectedGroups.map((group, index) => (
                <Col
                  span={6}
                  key={`group-${index}-${group.group_id}`}
                  className="group-col"
                >
                  <GroupCard group={group} onLeave={() => handleDelete(group.group_id)}/>
                </Col>
              ))}
            </Row>
            <p className="title">个人项目总览</p>
            <div className="project-container">
              <div className="item-block-header">
                <Search
                  value={projectInputValue}
                  onChange={(e) => {
                    setProjectInputValue(e.target.value);
                  }}
                  placeholder="搜索项目"
                  onSearch={handleProjectSearch}
                  allowClear
                  className="project-search"
                />

                <img
                  src={sortIcon[sortType]}
                  alt="排序"
                  onClick={handleSortModeChange}
                  className="sort-icon"
                />
              </div>

              <div className="project-list">
                {selectedProjects.map((project, index) => (
                  <ProjectCard
                    projectInfo={project}
                    key={`project-${project.project_id}`}
                    isEnd={index === selectedProjects.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
