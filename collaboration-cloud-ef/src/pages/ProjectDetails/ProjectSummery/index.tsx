import React from "react";
import "./index.scss";

export default function ProjectSummery() {
  return (
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
          <div className="teacher-intro">

          </div>
        </div>

        <div className="member-block">
          <div className="group-title">
            <span>项目组</span>
            <img/> {/* 跳转项目组 【教师侧添加人 减少人】*/}
          </div>
          <div className="members-intro">
            {/* 项目组成员列表 每个成员都能发私信/查看个人信息 小卡片？列表？*/}
          </div>
        </div>
        
      </div>
    </div>
  );
}
