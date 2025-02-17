import React, { useState } from "react";
import { PersonalContinuousMessage, MessageInfo } from "@/typings/api/messages";
import "./index.scss";
import { formatTimestamp } from "@/utils/utils";
import { Popover, Dropdown, Menu, Space, Tooltip } from "antd";
import {
  SmileOutlined,
  MessageOutlined,
  MoreOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { getUserName } from "@/utils/globalState";
import { fileTypes } from "@/constant/const";
import mdIcon from "@/assets/fileIcons/mdIcon.png";
import pdfIcon from "@/assets/fileIcons/pdfIcon.png";
import wordIcon from "@/assets/fileIcons/wordIcon.png";
import xlsxIcon from "@/assets/fileIcons/xlsxIcon.png";
import pptIcon from "@/assets/fileIcons/pptIcon.png";
import txtIcon from "@/assets/fileIcons/txtIcon.png";
import unknowFileIcon from "@/assets/fileIcons/unknowFileIcon.png";
import { formatSize } from "@/utils/utils"

interface IProps {
  messageInfo: PersonalContinuousMessage;
  date: string;
  index: number; // 消息列表中用户维度的索引
  onMessageListModify: (newPersonalMessage: PersonalContinuousMessage) => void;
}

interface MessageContentProps {
  isFile: boolean;
  isImage: boolean;
  content?: string;
  fileInfo?: any;
  imageUrl?: string;
}

export function MessageContent(props: MessageContentProps) {
  const { isFile, isImage, content, fileInfo, imageUrl } = props;
  if (!isFile && !isImage) {
    console.log("content", content, isFile, isImage);
    return <div className="message-content">{content}</div>;
  }

  if (isFile) {
    let fileIcon: React.ReactNode = null;
    const fileType = fileInfo.key.split(".").pop() || "";
    // console.log("fileType", fileType);
    switch (fileType) {
      case "pdf":
        fileIcon = <img src={pdfIcon} className="file-icon" />;
        break;
      case "doc":
      case "docx":
        fileIcon = <img src={wordIcon} className="file-icon" />;
        break;
      case "xls":
      case "xlsx":
        fileIcon = <img src={xlsxIcon} className="file-icon" />;
        break;
      case "ppt":
      case "pptx":
        fileIcon = <img src={pptIcon} className="file-icon" />;
        break;
      case "txt":
        fileIcon = <img src={txtIcon} className="file-icon" />;
        break;
      case "md":
        fileIcon = <img src={mdIcon} className="file-icon" />;
        break;
      default:
        fileIcon = <img src={unknowFileIcon} className="file-icon" />;
    }
    return (
      <div className="message-content">
        <div className="file-info-container">
          {fileIcon}
          <div className="file-title-size">
            <span style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{fileInfo?.title || 'xxx.docx'}</span>
            <span style={{color: '#999', fontWeight: 'bold'}}>{formatSize(fileInfo?.size) || '20KB'}</span>
          </div>
        </div>
      </div>
    );
  }

  if (isImage) {
    return <img src={imageUrl} alt="图片" className="message-content" />;
  }
  return null;
}

export default function ListItem(props: IProps) {
  // const [userName, setUserName] = useState(messageInfo.userName);
  const { messageInfo, date, index } = props;
  const [messages, setMessages] = useState(messageInfo.messages);
  const [showActions, setShowActions] = useState(false);
  const [showReplyPicker, setShowReplyPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleQuote = () => {
    // setShowReplyPicker(true);
  };
  const handleRecall = () => {
    // 撤回消息
    // onMessageListModify(newPersonalMessage);
  };

  // 操作菜单
  const actionMenu = (
    <Menu>
      <Menu.Item key="quote" onClick={handleQuote}>
        引用
      </Menu.Item>
      {messageInfo.userName === getUserName() && (
        <Menu.Item key="recall" danger onClick={handleRecall}>
          撤回
        </Menu.Item>
      )}
    </Menu>
  );

  // 处理表情选择
  const handleEmojiSelect = (emoji: any) => {
    // 发送表情回复到服务器
    // addReaction(messageInfo.messageId, emoji.emoji);
    setSelectedEmoji(emoji.emoji);
  };

  // 处理引用
  // function handleQuote(message: MessageInfo) {
  //   // 需要将引用内容传递给父组件
  //   message.onQuote?.({
  //     id: messageInfo.messageId,
  //     content: messageInfo.content
  //   });
  // }

  return (
    <div className="message-continuous-container">
      {messages.map((item, index) => {
        // console.log("item", item);
        const {
          userName,
          userAvatar,
          sendTime,
          content,
          isFile,
          isImage,
          fileInfo,
          imageUrl,
        } = item;
        const { date, timeFrame, time } = formatTimestamp(sendTime);
        return index === 0 ? (
          <div className="message-list-item">
            <img
              src={userAvatar}
              alt="avatar"
              className="message-owner-avatar"
            />
            <div className="message-info-container">
              <div className="message-info-top">
                <span className="message-owner-name">{userName}</span>
                <Tooltip title={new Date(sendTime).toString()}>
                  <span className="message-time">{`${timeFrame} ${time}`}</span>
                </Tooltip>
              </div>
              <MessageContent
                isFile={isFile}
                isImage={isImage}
                content={content}
                fileInfo={fileInfo}
                imageUrl={imageUrl}
              />
            </div>
          </div>
        ) : (
          <div className="message-list-item-simple">
            <Tooltip title={new Date(sendTime).toString()}>
              <span className="message-send-time">{`${time}`}</span>
            </Tooltip>
            <MessageContent
              isFile={isFile}
              isImage={isImage}
              content={content}
              fileInfo={fileInfo}
              imageUrl={imageUrl}
            />
          </div>
        );
      })}
    </div>
  );
}
