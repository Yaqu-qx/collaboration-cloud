import React, { useState } from "react";
import { PersonalContinuousMessage, MessageInfo } from "@/typings/api/messages";
import "./index.scss";
import { formatTimestamp } from "@/utils/utils";
import { Popover, Dropdown, Menu, Space, Tooltip } from "antd";
import MessageContent from "./MessageContent";
import {
  SmileOutlined,
  MessageOutlined,
  MoreOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { getUserName } from "@/utils/globalState";
import FileViewer from "@/component/FileViewer";

interface IProps {
  messageInfo: PersonalContinuousMessage;
  date: string;
  index: number; // 消息列表中用户维度的索引
  onMessageListModify: (newPersonalMessage: PersonalContinuousMessage) => void;
}

export default function ListItem(props: IProps) {
  // const [userName, setUserName] = useState(messageInfo.userName);
  const { messageInfo, date, index } = props;
  const [messages, setMessages] = useState(messageInfo.messages);
  const [showActions, setShowActions] = useState(false);
  const [showReplyPicker, setShowReplyPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [fileViewUrl, setFileViewUrl] = useState("");
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [viewType, setViewType] = useState("");

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
    <>
      {showFilePreview && 
        <div className="file-viewer-mask" onClick={() => setShowFilePreview(false)}>
          <div
            className="file-viewer-container"
            onClick={(e) => e.stopPropagation()}
          >
            <FileViewer url={fileViewUrl} type={viewType} />
          </div>
        </div>
      }
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
                  onFileClick={() => setFileViewUrl}
                  onFilePreview={() => setShowFilePreview}
                  onFileViewType={() => setViewType}
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
                onFileClick={() => setFileViewUrl}
                onFilePreview={() => setShowFilePreview}
                onFileViewType={() => setViewType}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
