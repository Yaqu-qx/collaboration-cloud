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
  groupId: string;
}

const defaultData = {
  progressInfos: [
    {
      name: "项目1", 
      avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png",
      finishedNum: 18,
      taskNum: 30,
    },
    {
        name: "项目2", 
        avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar3.png",
        finishedNum: 5,
        taskNum: 12,
      },
      {
        name: "项目3", 
        avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar4.png",
        finishedNum: 2,
        taskNum: 10,
      },
      {
        name: "项目4", 
        avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar5.png",
        finishedNum: 5,
        taskNum: 30,
      },
      {
        name: "项目5", 
        avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar1.png",
        finishedNum: 1,
        taskNum: 15,
      },
  ],
};

const progressItem = (item: personalTasksInfo) => {
  const { name, avatar, finishedNum, taskNum } = item;
  const percentage = parseFloat(((finishedNum / taskNum) * 100).toFixed(1));

  return (
    <div className="progress-item">
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
        {taskNum}
      </span>
    </div>
  );
};

export default function GroupVisible(props: IProps) {
  const { groupId } = props;
  const score =  Math.floor(Math.random() * 100);
  return (
    <div className="progress-panel-group">
        <div style={{borderBottom: '1.5px dashed #333', margin: '0 -2rem', marginBottom: '1rem'}}/>
      
      <div>
        <span className="panel-title">项目组整体进度评分：</span>
        <span style={{color:'orange', fontSize:'1.2rem', fontWeight:'bold'}}>{score}</span>
      </div>
      
      <p className="panel-desc">项目组各项目任务分配与进度可视化</p>
      <div className="list-header">
        <span style={{ width: "5.5rem" }}>项目名</span>
        <span className="progress">进度（finished/assigned）</span>
        <span className="num-right title-finished">已完成</span>
        <span className="num-right title-assigned">总量</span>
      </div>
      <div className="progress-list">
        {defaultData.progressInfos.map((item, index) => progressItem(item))}
      </div>
    </div>
  );
}
