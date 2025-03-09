import React, { useState } from "react";
import "./index.scss";
import IconButton from "@mui/material/IconButton";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import applySuccessImg from "@/assets/application_success.png";
import { getUserAccount, getUserName } from "@/utils/globalState";
const { TextArea } = Input;

interface ApplyJoinProps {
  applyProject?: any;
  onClose: () => void; // 只需要关闭回调
}

export default function ApplyJoin({
  applyProject,
  onClose,
}: ApplyJoinProps) {
  const [applyText, setApplyText] = useState(""); // 文本状态内化
  const [applyFinish, setApplyFinish] = useState(false);

  // 内部处理文本变化
  const handleApplyText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApplyText(e.target.value);
  };

  // 提交时触发回调
  const handleApplySubmit = () => {
    setApplyFinish(true);
  };

  // 关闭时触发回调
  const handleFinishApply = () => {
    onClose();
    setApplyText("");
    setApplyFinish(false);
  };
  return (
    <div className="apply-panel-mask">
      {!applyFinish ? (
        <div className="apply-to-join">
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleFinishApply}
            className="apply-close-btn"
          >
            <CloseOutlined />
          </IconButton>
          <p className="title">申请加入</p>
          <div className="apply-info">
            <div className="apply-info-block">
              <p>申请人：{getUserName() ?? "Yaqu"} </p>
              <p>申请人账号：{getUserAccount() ?? "2021212205257"} </p>
            </div>
            <div className="apply-info-block">
              <p>项目名称：{applyProject?.name ?? ""} </p>
              <p>项目组：{applyProject?.group ?? ""} </p>
              <p>主指导老师：{applyProject?.teacher ?? ""} </p>
            </div>
          </div>
          <div className="apply-reason">
            <p>
              申请理由 <span style={{ color: "red" }}>*</span>
            </p>
            <TextArea
              placeholder="请输入申请理由"
              allowClear
              onChange={handleApplyText}
              value={applyText}
              className="reason-input"
            />
            <p style={{ color: "#999" }}>
              申请后将向项目的项目管理人（主指导老师）发送申请通知，审核通过方可加入。
            </p>
          </div>
          <button className="submit-btn" onClick={handleApplySubmit}>
            提交申请
          </button>
        </div>
      ) : (
        <div className="apply-success-popup">
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleFinishApply}
            className="apply-close-btn"
          >
            <CloseOutlined />
          </IconButton>
          <img src={applySuccessImg} className="apply-success-img" />
          <p className="apply-success-text">提交成功！待审核中...</p>
          <Button
            type="primary"
            className="finish-btn"
            onClick={handleFinishApply}
          >
            完成
          </Button>
        </div>
      )}
    </div>
  );
}
