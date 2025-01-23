import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Row, Col } from "antd";
import { projectInfo, groupInfo } from "@/typings/api/project_info";
import GroupCard from "@/component/GroupCard";
import { fetchGroups } from "@/utils/server";

export default function MyProjectGroup() {
  const [projectList, setProjectList] = useState([] as projectInfo[]);
  const [groups, setGroups] = useState([] as groupInfo[]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);

  useEffect(() => {
    // 获取项目列表
    fetchGroups().then((response) => response.json())
     .then((data) => {
      console.log("group_data", data);
        setGroups(data);
      })
     .catch((error) => {
        console.error(error);
      });

    setProjectList(projectList);
  }, []);

  return (
    <div>
      <p>项目组</p>
      <Row gutter={16}>
        {groups.map((group) => (
          <Col key={group.id} className="group-col">
            <div> col </div>
          </Col>
        ))}
      </Row>
      <p>我的项目</p>
    </div>
  );
}
