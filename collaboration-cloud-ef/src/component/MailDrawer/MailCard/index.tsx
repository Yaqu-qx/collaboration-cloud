import React, { useState } from "react";
import "./index.scss";
import { message, Tag } from "antd";
import { Approval } from "@mui/icons-material";
import { MailInfo } from "@/typings/type";
import { Button, Modal, Avatar, Space } from "antd";
import { tags } from "../const";
import MailSendPanel from "@/component/MailSendPanel";

interface Iprops {
  mailInfo: MailInfo;
  onMailDelete: (mailId: string) => void;
  onMailUpdate: (mailId: string, newType: number) => void;
}

export default function MailCard(props: Iprops) {
  const { mailInfo, onMailDelete, onMailUpdate } = props;
  const { messageId, fromName, fromAvater, fromId, content, tagType, time } =
    mailInfo;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [type, setType] = useState(tagType); // 0: 未处理 1: 已处理 2: 已拒绝
  const [showSendPanel, setShowSendPanel] = useState(false); // 初始状态改为关闭

  const handleMailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetail(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDeleteModal(true);
  };
  const handleAgree = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type > 1) return;
    if (type === 0) {
      onMailUpdate(messageId, 5);
      setType(5);
    }
    if (type === 1) {
      onMailUpdate(messageId, 6);
      setType(6);
    }
    message.success("处理成功");
  };

  const handleRefuse = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type > 1) return;
    if (type === 0) {
      onMailUpdate(messageId, 3);
      setType(3);
    }
    if (type === 1) {
      onMailUpdate(messageId, 4);
      setType(4);
    }
    message.success("处理成功");
  };

  return (
    <>
      <Modal
        title={"删除信件"}
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onOk={() => {
          onMailDelete(messageId);
          setOpenDeleteModal(false);
          message.success("删除成功");
        }}
        cancelText="取消"
        okText="确认"
      >
        <p>确认删除该私信吗？</p>
      </Modal>
      <Modal
        open={showDetail}
        onCancel={() => setShowDetail(false)}
        title="信件详情"
        footer={
          type !== 2 ? (
            <Space>
              <Button danger={true} disabled={type > 2} onClick={handleRefuse}>
                拒绝
              </Button>
              <Button
                type="primary"
                disabled={type > 2}
                style={{ background: "green" }}
                onClick={handleAgree}
              >
                {type === 0 ? "通过" : "同意"}
              </Button>
            </Space>
          ) : null
        }
        width={700}
        styles={{
          body: {
            minHeight: "20rem", // 添加最小高度
            display: "flex",
            flexDirection: "column",
          },
        }}
        className="mail-detail"
      >
        <div
          className="mail-card-head"
          style={{
            borderBottom: "1.5px solid #999",
            paddingBottom: "0.5rem",
            marginBottom: "0.8rem",
          }}
        >
          <Avatar src={fromAvater} />
          <span className="mail-card-head-name">{fromName}</span>
          <Tag color={tags[type].color} className="mail-tag">
            {tags[type].title}
          </Tag>
          <span className="mail-detail-time">{time}</span>
        </div>
        <div className="mail-detail-content">{content}</div>
      </Modal>

      <MailSendPanel
        isSomeOne={true}
        showSendPanel={showSendPanel}
        setShowSendPanel={setShowSendPanel} // 正确绑定自身状态
        toPersonName={fromName}
        toPersonAvater={fromAvater}
      />

      <div className="mail-card" onClick={handleMailClick}>
        <span className="mail-card-time">{time}</span>
        <div className="mail-card-head">
          <img src={fromAvater} className="mail-card-img" />
          <span className="mail-card-head-name">{fromName}</span>
          <Tag color={tags[type].color} className="mail-tag">
            {tags[type].title}
          </Tag>
        </div>
        <p className="mail-content">{content}</p>
        <div className="mail-card-opration">
          <Button
            variant="outlined"
            color="primary"
            className="mail-btn"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setShowSendPanel(true);
            }}
          >
            回复
          </Button>
          <Button
            variant="outlined"
            color="danger"
            className="mail-btn"
            size="small"
            onClick={handleDelete}
          >
            删除
          </Button>
        </div>
      </div>
    </>
  );
}
