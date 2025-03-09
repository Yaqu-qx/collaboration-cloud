import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { projectInfo } from "@/typings/api/project_info";
import projectIcon from "@/assets/projectIcon.png";
import projectIconYl from "@/assets/project_yl.png";
import { Button, Divider, Tooltip } from "antd";
import ColoredTags from "@/component/ColoredTags";

interface ProjectCardProps {
  projectInfo: projectInfo;
  isEnd: boolean;
  isMenaged?: boolean;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { projectInfo, isEnd, isMenaged } = props;
  console.log('isM',isMenaged);
  const navigate = useNavigate();

  // 跳转详情页
  const handleDetailClick = (projectName: string) => {
    console.log("link click");
    // TODO: 获取对应项目数据

    // 获取到的项目数据
    let projectData = {
      projectName: projectName,
      projectAvatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png",
      group: "团队名称",
      peopleNum: 10,
      teacher: "指导老师",
      tags: ["课程设计", "学科竞赛"],
      create_time: "2022-01-01",
      description: "项目描述",
      channelId: "0000000001",
      isManager: isMenaged,
    };

    navigate("/home/project-detail", { state: projectData });
  };

  return (
    <>
      <div className="project-content">
      <Tooltip title={'黄色标注则为负责人'}><img src={isMenaged ? projectIconYl : projectIcon} alt="project-icon" className="project-icon" />
      </Tooltip>
        <div className="main-info">
          <div className="top-line">
            <span>{projectInfo.project_name}</span>
            <div className="project-tags">
              <ColoredTags tags={projectInfo.tags} />
            </div>
          </div>
          <p>{projectInfo.description}</p>
        </div>

        <div className="create-time"> {projectInfo.create_time} </div>

        <Button type="text" className="more-btn" onClick={() => handleDetailClick(projectInfo.project_name)} >
          详情
        </Button>
      </div>

      {!isEnd ? (
        <Divider className="divider" />
      ) : (
        <Divider plain className="divider">
          It is all, nothing more 🤐
        </Divider>
      )}
    </>
  );
}
