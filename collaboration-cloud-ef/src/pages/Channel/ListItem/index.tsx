import React, { useState } from "react";
import { MessageInfo } from "@/typings/api/messages";
import "./index.scss";

export default function ListItem(messageInfo: MessageInfo) {
  const { messageId, userName, userAvatar, sendTime, content, files, images, isFirst } = messageInfo;

  return (
    <>
      {isFirst ? (
        <div className="message-list-item">
          <img src={userAvatar} alt="avatar" className="message-owner-avatar" />
          <div className="message-info-container">
            <div className="message-info-top">
              <span className="message-owner-name">{userName}</span>
              <span className="message-time">{sendTime}</span>
            </div>
            <div className="message-files-container">{/** 文件预览 */}</div>
            <div className="message-img-container">{/** 图片预览 */}</div>
            <div className="message-content">{content}</div>
          </div>
        </div>
      ) : (
        <div className="message-list-item-simple">
          <span className="message-send-time">{sendTime}</span>
          <div className="message-content">{content}</div>
        </div>
      )}
    </>
  );
}
