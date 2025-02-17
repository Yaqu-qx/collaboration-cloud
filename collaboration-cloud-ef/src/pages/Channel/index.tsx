import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChannelInfo } from "@/typings/api/channels";
import { getChannelInfo, getChannelMessages } from "@/utils/server";
import Loading from "@/component/Loading";
import Header from "./Header";
import "./index.scss";
import MessageInput from "./MessageInput";
import { MessageInfo, MessageList, PersonalContinuousMessage } from "@/typings/api/messages";
import ListItem from "./ListItem";
import { Button, Tabs } from "antd";
import {
  MessageFilled,
  SnippetsFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import ProjectorImg from "@/assets/Projector.png";
import { Divider, Chip } from "@mui/material";

export default function Channel() {
  const location = useLocation();
  console.log(location.state);
  const { channelId } = location.state;
  const [loading, setLoading] = useState(true);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(
    {} as ChannelInfo
  );
  const [messageList, setMessageList] = useState<MessageList[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 初始化时和消息更新时滚动
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const getCreactText = () => {
    return (
      "此频道由" +
      channelInfo.createBy +
      "于" +
      channelInfo.createdAt +
      "创建。" +
      (channelInfo.description ?? "")
    );
  };
  // 用户维度 消息列表变化
  const handleMessageListModify = (dailyIndex: number, personalIndex: number , newMessages: PersonalContinuousMessage) => {
    const newMessageList: MessageList[] = [...messageList];
    newMessageList[dailyIndex].messages[personalIndex] = newMessages;
    setMessageList(newMessageList);
  };
  // 新添加发送的消息
  const addMessage = (userName: string, date: string, messages: MessageInfo[]) => {
    // todo
  }

  const tabItems = [
    {
      key: "1",
      label: "消息",
      icon: <MessageFilled />,
      children: (
        <div className="message-container" ref={messageContainerRef}>
          <div className="message-list">
            <div className="start-block">
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img
                  src={ProjectorImg}
                  alt="small-icon"
                  style={{ height: "2rem", width: "2rem" }}
                />
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {"# " + channelInfo.channelName}
                </div>
              </div>
              <p className="instruction">{getCreactText()}</p>
              <Button icon={<UserAddOutlined />} style={{ width: "10rem" }}>
                添加新成员
              </Button>
            </div>
            {messageList.map((dailyItem, dailyIndex) => (
              <div className="message-item" key={dailyIndex}>
                {/* 按日期分 */}
                <Divider style={{ margin: "1rem 0" }}>
                  <Chip label={dailyItem.date} size="small" />
                </Divider>
                <div className="message-item-continuous">
                  {/* 按用户分 */}
                  {dailyItem.messages.map((personalItem, personalIndex) => (
                    <ListItem key={personalIndex} messageInfo={personalItem}  date={dailyItem.date} index={personalIndex} onMessageListModify={(newPersonalMessage: PersonalContinuousMessage) => handleMessageListModify(dailyIndex, personalIndex, newPersonalMessage)}/>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "画板",
      icon: <SnippetsFilled />,
      children: <div>画板</div>,
    },
  ];

  const handleSend = async (content: string, files: File[]) => {
    const formData = new FormData();
    formData.append("channelId", channelId);
    formData.append("content", content);
    files.forEach((file) => formData.append("files", file));


    // try {
    //   await fetch("/api/messages", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   // 处理发送成功后的逻辑
    // } catch (error) {
    //   console.error("发送失败:", error);
    // }
  };

  useEffect(() => {
    const fetchChannelInfo = getChannelInfo(channelId)
      .then((res) => res.json())
      .then((res) => {
        setChannelInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const fetchChannelMessages = getChannelMessages(channelId)
      .then((res) => res.json())
      .then((res) => {
        console.log("messageList", res.data);
        setMessageList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Promise.all([fetchChannelInfo, fetchChannelMessages]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="channel-info-container">
        <Header
          channelName={channelInfo.channelName}
          memberCount={channelInfo?.members?.length || 0}
        />
        <Tabs
          className="channel-tabs"
          items={tabItems}
          tabBarStyle={{
            margin: "-2rem",
            marginTop: "1.5rem",
            marginBottom: 0,
          }}
        />

        <MessageInput
          onSend={handleSend}
          members={[
            { id: "1", name: "张三", avatar: "..." },
            { id: "2", name: "李四" },
          ]}
        />
      </div>
    </>
  );
}
