import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Row, Col, Input, Tooltip, Modal } from "antd";
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
import GroupVisible from "./GroupVisible";
import { personalTasksInfo } from "@/typings/type";
import { group } from "console";

const sortIcon: string[] = [sort, rise, decline];
const { Search } = Input;
const UserName = getUserName() ?? "Yaqu";
const sortTip: string[] = ["当前默认排序", "当前按创建时间升序", "当前按创建时间降序"];

export default function MyProjectGroup() {
  const [projectList, setProjectList] = useState([] as projectInfo[]);
  const [joinedGroups, setJoinedGroups] = useState([] as groupInfo[]);
  const [managedGroups, setManagedGroups] = useState([] as groupInfo[]);
  const [projectInputValue, setProjectInputValue] = useState("");
  const [joinedGroupInputValue, setJoinedGroupInputValue] = useState("");
  const [managedGroupInputValue, setManagedGroupInputValue] = useState("");
  const [sortType, setSortType] = useState(0); // 0: 默认排序 1: 升序 2: 降序
  const [loading, setLoading] = useState(true);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const [selectedJoinedGroups, setSelectedJoinedGroups] = useState(joinedGroups);
  const [selectedManagedGroups, setSelectedManagedGroups] = useState(managedGroups);
  const [selectedProjects, setSelectedProjects] = useState(projectList);

  const [showPieChart, setShowPieChart] = useState(false);
  const [selectedGroup, setSelecedGroup] = useState("");
  const handleOpenSchedule = () => {
    setOpenSchedule(true);
  };

  const handleJoinedGroupSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setJoinedGroupInputValue(value);
    // todo 搜索项目组逻辑
  };

  const handleManagedGroupSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setManagedGroupInputValue(value);
    // todo 搜索项目组逻辑
  };

  const handleGroupCreate = (newGroupInfo: groupInfo) => {
    setManagedGroups((prevGroups) => [...prevGroups, newGroupInfo]);
  }

  const handleProjectSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setProjectInputValue(value);
    // todo 搜索项目逻辑
  };

  const handleMore = (groupId: string) => {
    setSelecedGroup(groupId);
    setShowPieChart(true);
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
        setJoinedGroups(data);
        setManagedGroups(data.filter((group:any) => group.manager === UserName));
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

  useEffect(() => {
    const sorted = [...selectedProjects].sort((a, b) => {
      if(sortType === 1) return a.create_time.localeCompare(b.create_time);
      if(sortType === 2) return b.create_time.localeCompare(a.create_time);
      return a.project_id.localeCompare(b.project_id);
    });
    setSelectedProjects(sorted);
  }, [sortType]);

  const handleSortModeChange = () => {
    setSortType((sortType + 1) % 3);
    // todo 排序逻辑
  };

  const handleJoinedDelete = (groupId: string) => {
    const modifiedGroups = joinedGroups.filter((group) => group.group_id !== groupId);
    setJoinedGroups(modifiedGroups);
    console.log('modifiedGroups', modifiedGroups);
  }

  const handleManagedDelete = (groupId: string) => {
    const modifiedGroups = managedGroups.filter((group) => group.group_id!== groupId);
    setManagedGroups(modifiedGroups);
    console.log('modifiedGroups', modifiedGroups);
  }

  useEffect(() => {
    if(joinedGroupInputValue.trim() === "") {
      setSelectedJoinedGroups(joinedGroups);
      return;
    }
    const groupsDisply = joinedGroups.filter((group) => {
      return group.group_name.includes(joinedGroupInputValue); 
    });
    setSelectedJoinedGroups(groupsDisply);
  }, [joinedGroupInputValue, joinedGroups]);

  useEffect(() => {
    if(managedGroupInputValue.trim() === "") {
      setSelectedManagedGroups(managedGroups);
      return;
    }
    const groupsDisply = managedGroups.filter((group) => {
      return group.group_name.includes(managedGroupInputValue);
    }); 
    setSelectedManagedGroups(groupsDisply);
  }, [managedGroupInputValue, managedGroups]);

  useEffect(() => {
    if(projectInputValue.trim() === "") {
      setSelectedProjects(projectList);
      return;
    }
    const projectsDisply = projectList.filter((project) => {
      return project.project_name.includes(projectInputValue); 
    });
    setSelectedProjects(projectsDisply);
  }, [projectList, projectInputValue])

  return (
    <>
      <Modal 
        title={`${selectedGroup}项目组`}
        open={showPieChart}
        onCancel={() => setShowPieChart(false)}
        centered
        footer={null}
        width={900}
        styles={
          {
            body: {
              height: '27rem'
            },
          }
        }
      >
        <GroupVisible groupId={selectedGroup} />
      </Modal>
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

            <p className="title">我参与的项目组</p>
            <div className="operation-bar">
              <Search
                value={joinedGroupInputValue}
                onChange={(e) => {
                  setJoinedGroupInputValue(e.target.value);
                }}
                placeholder="搜索项目组"
                onSearch={handleJoinedGroupSearch}
                allowClear
                className="project-search"
              />
              <Button type="primary" onClick={() => setShowCreateGroup(true)}>
                创建项目组
              </Button>
            </div>
            <Row gutter={[20, 24]} className="group-row">
              {selectedJoinedGroups.map((group, index) => (
                <Col
                  span={6}
                  key={`group-${index}-${group.group_id}`}
                  className="group-col"
                >
                  <GroupCard group={group} onLeave={() => handleJoinedDelete(group.group_id)}  type={'joinedGroup'} />
                </Col>
              ))}
            </Row>

            <p className="title">我管理的项目组</p>
            <div className="operation-bar">
              <Search
                value={managedGroupInputValue}
                onChange={(e) => {
                  setManagedGroupInputValue(e.target.value);
                }}
                placeholder="搜索项目组"
                onSearch={handleManagedGroupSearch}
                allowClear
                className="project-search"
              />
              <Button type="primary" onClick={() => setShowCreateGroup(true)}>
                创建项目组
              </Button>
            </div>

            <Row gutter={[20, 24]} className="group-row">
              {selectedManagedGroups.map((group, index) => (
                <Col
                  span={6}
                  key={`group-${index}-${group.group_id}`}
                  className="group-col"
                >
                  <GroupCard group={group} onLeave={() => handleManagedDelete(group.group_id)} type={'managedGroup'} onMore={(groupId: string) => handleMore(groupId)} />
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

                <Tooltip title={sortTip[sortType]}>
                  <img
                  src={sortIcon[sortType]}
                  alt="排序"
                  onClick={handleSortModeChange}
                  className="sort-icon"
                />
                </Tooltip>
                
              </div>

              <div className="project-list">
                {selectedProjects.map((project, index) => (
                  <ProjectCard
                    projectInfo={project}
                    key={`project-${project.project_id}`}
                    isEnd={index === selectedProjects.length - 1}
                    isMenaged={project.teacher === UserName}
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
