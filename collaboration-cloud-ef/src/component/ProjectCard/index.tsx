import React, { useState } from "react";
import "./index.scss";
import { projectInfo } from "@/typings/api/project_info";
import projectInco from "@/assets/projectIcon.png";
import { Tag, Button, Divider } from "antd";
import { tagColor } from "@/constant/const";

interface ProjectCardProps {
  projectInfo: projectInfo;
  isEnd: boolean;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { projectInfo, isEnd } = props;
  return (
    <>
      <div className="project-content">
        <img src={projectInco} alt="project-icon" className="project-icon" />

        <div className="main-info">
          <div className="top-line">
            <span>{projectInfo.project_name}</span>
            <div className="project-tags">
              {projectInfo.tags.map((tag) => (
                <Tag color={tagColor[tag]} key={tag}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          <p>{projectInfo.description}</p>
        </div>

        <div className="create-time"> {projectInfo.create_time} </div>

        <Button type="text" className="more-btn">
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
