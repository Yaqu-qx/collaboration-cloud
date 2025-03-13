import React, { useState, useEffect } from "react";
import "./index.scss";
import PieChartPanel from "@/component/PieChartPanel";
import ProgressPanel from "@/component/ProgressPanel";
import { personalTasksInfo } from "@/typings/type";
import { getProjectSummery } from "./server";
import Loading from "@/component/Loading";
import robotIcon from "@/assets/robot.png";
import wuguiIcon from "@/assets/wugui.png";
import reportIcon from "@/assets/report.png";
import ProjectIntroduce from "../ProjectIntroduce";
import MembersIntroPanel from "../MembersIntroPanel";
import { peopleInfoType } from "@/typings/type";
import AddNewMember from "../../../component/AddNewMember";
import { message } from "antd";
// const data = [
//   { type: "计划中", value: 27 },
//   { type: "新创建", value: 25 },
//   { type: "推进中", value: 18 },
//   { type: "已停滞", value: 15 },
//   { type: "已完成", value: 10 },
// ];

// 细节 工具说明、实时记录后端实现和localstorage缓存、跳转（消息、list）
type IProps = {
  projectId: string;
  onTaskList: (filter: any) => void;
  isManager?: boolean;
};

export default function ProjectSummery(props: IProps) {
  const [taskStatus, setTaskStatus] = useState(null);
  const [totTaskNum, setTotTaskNum] = useState(-1);
  const [projectState, setProjectState] = useState("进行中");
  const [loading, setLoading] = useState(true);
  const [progressInfo, setProgressInfo] = useState<personalTasksInfo[]>([]);

  const [mainIntro, setMainIntro] = useState("");
  const [feature, setFeature] = useState("");
  const [goalsAndVision, setGoalsAndVision] = useState("");

  const [teachers, setTeachers] = useState<peopleInfoType[]>([]);
  const [members, setMembers] = useState<peopleInfoType[]>([]);
  const [recordContent, setRecordContent] = useState("");
  const [inviteMember, setInviteMember] = useState(false);

  useEffect(() => {
    getProjectSummery(props.projectId)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const {
          taskStatus,
          totTaskNum,
          taskInfos,
          projectState,
          mainIntro,
          feature,
          goalsAndVision,
          teachers,
          members,
          recordContent,
        } = res.data;
        setTaskStatus(taskStatus);
        setTotTaskNum(totTaskNum);
        setProgressInfo(taskInfos);
        setProjectState(projectState ?? "刚起步");
        setMainIntro(mainIntro);
        setFeature(feature);
        setGoalsAndVision(goalsAndVision);
        setTeachers(teachers);
        setMembers(members);
        setRecordContent(recordContent ?? "");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInvite = (members:string[]) => {
    // 邀请成员逻辑
    message.success('邀请成功!');
  }

  return (
    <>
      {inviteMember && <AddNewMember onClose={() => setInviteMember(false)} onInvite={handleInvite} />}
      {loading ? (
        <div className="position-correction">
          <Loading />
        </div>
      ) : (
        <div className="summery-container">
          <div className="state-block">
            <img src={robotIcon} alt="robot" className="top-icons" />
            <div className="state-intro">
              <span>项目当前阶段为：{projectState}</span>
              <img src={wuguiIcon} alt="wugui" className="wugui-icons" />
            </div>
            <img
              src={reportIcon}
              alt="report"
              className="top-icons report-icon"
            />
          </div>

          <div className="first-part">
            <ProjectIntroduce
              mainIntro={mainIntro}
              feature={feature}
              goalsAndVision={goalsAndVision}
              isManager={props.isManager}
            />
            <MembersIntroPanel
              recordContent={recordContent}
              teachers={teachers}
              members={members}
              onInvite={setInviteMember}
            />
          </div>

          <div className="chart-block">
            <PieChartPanel
              onTaskList={props.onTaskList}
            />
            <ProgressPanel
              totalTasks={totTaskNum}
              progressInfos={progressInfo}
              onTaskList={props.onTaskList}
              onInvite={setInviteMember}
            />
          </div>
        </div>
      )}
    </>
  );
}
