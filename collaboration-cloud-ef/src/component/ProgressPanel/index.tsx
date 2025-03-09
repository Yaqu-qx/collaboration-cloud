import React from "react";
import "./index.scss";
import { Progress } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { personalTasksInfo } from "@/typings/type";
import type { ProgressProps } from "antd";

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

interface IProps {
  totalTasks: number;
  progressInfos: personalTasksInfo[];
  onTaskList: (filter: Record<string, any>) => void;
  onInvite: (value:boolean) => void;
}

const progressItem = (item: personalTasksInfo, totalTasks: number, onTaskList: any) => {
  const { name, avatar, finishedNum, taskNum } = item;
  const percentage = parseFloat(((finishedNum / taskNum) * 100).toFixed(1));
  
  const handleProgressClick = () => {
    // 跳转到任务列表
    onTaskList({ 
      personName: name, 
    });
  };

  return (
    <div className="progress-item" onClick={handleProgressClick}>
      <div className="member-name">
        <img src={avatar} alt={name} className="avatar" />
        <span className="name">{name}</span>
      </div>

      <Progress
        percent={percentage}
        className="progress"
        strokeColor={twoColors}
      />
      <span className="num-right num-finished">{finishedNum}</span>
      <span className="num-right num-assigned">
        {taskNum}/{totalTasks}
      </span>
    </div>
  );
};

export default function ProgressPanel(props: IProps) {
  const { totalTasks, progressInfos, onTaskList, onInvite } = props;
  return (
    <div className="progress-panel">
      <p className="panel-title">任务分配与进展</p>
      <p className="panel-desc">项目组各成员任务分配与个人进度可视化</p>
      <div className="list-header">
        <span style={{ width: "5.5rem" }}>负责人</span>
        <span className="progress">个人进度（finished/assigned）</span>
        <span className="num-right title-finished">已完成</span>
        <span className="num-right title-assigned">分配量</span>
      </div>
      <div className="progress-list">
        {progressInfos.map((item, index) => progressItem(item, totalTasks, onTaskList))}
      </div>
      <div className="add-member" onClick={() => onInvite(true)}>
        <UserAddOutlined className="add-icon" />
        <span>邀请新成员</span>
      </div>
    </div>
  );
}
