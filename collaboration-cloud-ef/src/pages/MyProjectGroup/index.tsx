import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Row, Col, Input } from "antd";
import type { SearchProps } from "antd/lib/input";
import { projectInfo, groupInfo } from "@/typings/api/project_info";
import GroupCard from "@/component/GroupCard";
import { fetchGroups, fetchProjectsByUserName } from "@/utils/server";
import ProjectCard from "@/component/ProjectCard";
import { getUserName } from "@/utils/globalState";
import rise from "@/assets/rise.png";
import decline from "@/assets/decline.png";
import sort from "@/assets/sort.png";

const sortIcon: string[] = [sort, rise, decline];
const { Search } = Input;

export default function MyProjectGroup() {
  const [projectList, setProjectList] = useState([] as projectInfo[]);
  const [groups, setGroups] = useState([] as groupInfo[]);
  const [currentProject, setCurrentProject] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");
  const [sortType, setSortType] = useState(0);

  const onGroupSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setCurrentGroup(value);
  };

  useEffect(() => {
    // 获取项目列表
    fetchGroups()
      .then((response) => response.json())
      .then((data) => {
        console.log("group_data", data);
        setGroups(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetchProjectsByUserName(getUserName() ?? "")
      .then((response) => response.json())
      .then((data) => {
        console.log("project_data", data);
        setProjectList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSortModeChange = () => {
    setSortType((sortType + 1) % 3);
    // todo 排序逻辑
  };

  return (
    <div className="project-group-container">
      <p className="title">项目组</p>
      <div className="operation-bar">
        <Search
          value={currentGroup}
          onChange={(e) => {
            setCurrentGroup(e.target.value);
          }}
          placeholder="搜索项目组"
          onSearch={onGroupSearch}
          allowClear
          className="project-search"
        />
        <Button type="primary">创建项目组</Button>
      </div>

      <Row gutter={[20, 24]} className="group-row">
        {groups.map((group) => (
          <Col span={6} key={group.group_id} className="group-col">
            <GroupCard group={group} />
          </Col>
        ))}
      </Row>
      <p className="title">个人项目总览</p>
      <div className="project-container">
        <div className="item-block-header">
          <Search
            value={currentGroup}
            onChange={(e) => {
              setCurrentGroup(e.target.value);
            }}
            placeholder="搜索项目"
            onSearch={onGroupSearch}
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
          {projectList.map((project, index) => (
            <ProjectCard
              projectInfo={project}
              key={project.project_id}
              isEnd={index === projectList.length - 1}
            />
          ))}
        </div>
      </div>

      {/* <Table<DataType>
          columns={columns}
          dataSource={projectData}
          className="item-table"
          tableLayout="auto"
          pagination={{ position: ["bottomCenter"] }}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
              ) : (
                <PushpinOutlined onClick={(e) => onExpand(record, e)} />
              ),
          }}
        /> */}
    </div>
  );
}
