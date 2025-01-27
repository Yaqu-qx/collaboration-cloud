import React from "react";
import "./index.scss";
import { Progress } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { personalTasksInfo } from "@/typings/type";


interface IProps {
  totalTasks: number;
  progressInfos: personalTasksInfo[]; 
}

const progressItem = (item: personalTasksInfo) => {
    const  { name, avatar, finishedNum, taskNum } = item;
    const percentage = finishedNum / taskNum * 100;
  return (
    <div className="progress-item">
        <img src={avatar} alt={name} />
        <span className="name">{name}</span>
        <Progress percent={percentage} />
        <span>{percentage.toFixed(2)}</span>
        <span>{finishedNum}/{taskNum}</span>
    </div>
)};

export default function ProgressPanel(props: IProps) {
  
  return (
    <div className="progress-panel">
      <p>任务分配与进展</p>
      <p>项目组各成员任务分配与个人进度可视化</p>
      <div>
        <span>负责人</span>
        <span>个人进度（n/m）</span>
        <span>已完成（n）</span>
        <span>任务分配（m/total）</span>
      </div>
      <div className="progress-list">
        {props.progressInfos.map((item, index) => (
            progressItem(item)
        ))};
      </div>
      <div>
        <UserAddOutlined />
        <span>邀请新成员</span>
      </div>
    </div>
  );
}
