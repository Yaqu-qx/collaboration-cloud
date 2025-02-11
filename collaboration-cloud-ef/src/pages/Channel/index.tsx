import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChannelInfo } from "@/typings/api/channels";
import { getChannelInfo, getChannelMessages } from "@/utils/server";
import Loading from "@/component/Loading";
import Header from "./Header";
import "./index.scss";
import MessageInput from "./MessageInput";
import { MessageInfo } from "@/typings/api/messages";
import ListItem from "./ListItem";
import { Tabs } from "antd";
import {
  MessageOutlined,
  MessageFilled,
  SnippetsFilled,
  SnippetsOutlined,
} from "@ant-design/icons";

export default function Channel() {
  const location = useLocation();
  console.log(location.state);
  const { channelId, channelName } = location.state;
  const [loading, setLoading] = useState(true);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(
    {} as ChannelInfo
  );
  const [messageList, setMessageList] = useState<MessageInfo[]>([]);

  const tabItems = [
    {
      key: "1",
      label: "消息",
      icon: <MessageFilled />,
      children: <div className="message-list">
      {messageList.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>,
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
    formData.append("content", content);
    files.forEach((file) => formData.append("files", file));

    try {
      await fetch("/api/messages", {
        method: "POST",
        body: formData,
      });
      // 处理发送成功后的逻辑
    } catch (error) {
      console.error("发送失败:", error);
    }
  };

  useEffect(() => {
    const fetchChannelInfo = getChannelInfo(channelId)
      .then((res) => res.json())
      .then((res) => {
        setChannelInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    
    const fetchChannelMessages = getChannelMessages(channelId)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setMessageList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    Promise.all([fetchChannelInfo, fetchChannelMessages]).then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="channel-info-container">
        <Header
          channelName={channelInfo.channelName}
          memberCount={channelInfo?.members?.length || 0}
        />
        <Tabs className="channel-tabs" items={tabItems} tabBarStyle={{margin: '-2rem', marginTop: '1.5rem', marginBottom: 0}}/>

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
