import React, { useState, useEffect } from "react";
import "./index.scss";
import PieChartPanel from "@/component/PieChartPanel";
import ProgressPanel from "@/component/ProgressPanel";
import { personalTasksInfo } from "@/typings/type";
import { getProjectSummery } from "./server";
import Loading from "@/component/Loading";

const data = [
  { type: "计划中", value: 27 },
  { type: "新创建", value: 25 },
  { type: "推进中", value: 18 },
  { type: "已停滞", value: 15 },
  { type: "已完成", value: 10 },
];

// const progressInfo: personalTasksInfo[] = [
//   {
//     name: '张三',
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     finishedNum: 10,
//     taskNum: 20,
//   }
// ];
type IProps = {
  projectId: string;
};

export default function ProjectSummery(props: IProps) {
  const [taskStatus, setTaskStatus] = useState(null);
  const [totTaskNum, setTotTaskNum] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [progressInfo, setProgressInfo] = useState<personalTasksInfo[]>([]);

  useEffect(() => {
    getProjectSummery(props.projectId)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const { taskStatus, totTaskNum, taskInfos } = res.data;
        setTaskStatus(taskStatus);
        setTotTaskNum(totTaskNum);
        setProgressInfo(taskInfos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="summery-container">
          <div className="state-block">
            <span>当前状态：</span>
            <span>进行中</span>
          </div>
          <div className="info-block">
            <p>这个项目主要是干啥的？</p>
            <text>xxxxxxx</text>
            <div className="teacher-block">
              <p>指导老师</p>
              <div className="teacher-intro"></div>
            </div>
            <div className="member-block">
              <div className="group-title">
                <span>项目组</span>
                <img /> {/* 跳转项目组 【教师侧添加人 减少人】*/}
              </div>
              <div className="members-intro">
                {/* 项目组成员列表 每个成员都能发私信/查看个人信息 小卡片？列表？*/}
              </div>
            </div>
            <PieChartPanel />
            <ProgressPanel totalTasks={totTaskNum} progressInfos={progressInfo} />
          </div>
        </div>
      )}
    </>
  );
}
