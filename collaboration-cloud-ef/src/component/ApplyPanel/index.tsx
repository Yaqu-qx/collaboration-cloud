import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { CloseOutlined } from "@ant-design/icons";
import applicationSuccessImg from "@/assets/application_success.png";
import successIcon from "@/assets/successIcon.png";
import { Button } from "antd";
interface ApplyPanelProps {
  onPanelVisible: (visible: boolean) => void;
}

export default function ApplyPanel(props: ApplyPanelProps) {
  const { onPanelVisible } = props;

  return (
    <div className="panel-after-create">
      <div className="panel-header-2">
        <IconButton
          aria-label="close"
          size="small"
          onClick={() => onPanelVisible(false)}
          className="close-btn"
        >
          <CloseOutlined />
        </IconButton>
      </div>

      <img src={applicationSuccessImg} className="application-success-img" />
      <div className="success-tip-block">
        <img src={successIcon} className="success-icon" />
        <span className="success-tip">已向项目管理人发送申请！</span>
      </div>

      <p className="success-tip-more">
        您可以在 [消息]-{`>`}
        [我的申请] 中查看审核进度。也可以给对应导师发送反馈信息，提醒审核任务哦~
      </p>
      <div className="panel-footer">
        <Button
          type="primary"
          className="finish-btn"
          onClick={() => onPanelVisible(false)}
        >
          完成
        </Button>
      </div>
    </div>
  );
}
