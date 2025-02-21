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
import { sendMessageExtraInfo } from "@/typings/api/messages";
import Item from "antd/es/list/Item";

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
  const handleMessageListModify = (dailyIndex: number, personalIndex: number, newMessages: PersonalContinuousMessage) => {
    const newMessageList: MessageList[] = [...messageList];
    newMessageList[dailyIndex].messages[personalIndex] = newMessages;
    setMessageList(newMessageList);
  };
  // 新添加发送的消息
  // const addMessage = (userName: string, date: string, messages: sendMessageInfo[]) => {
    
  //   // 向服务端发送消息后 服务端返回新的messageList Todo

  //   // 这边就先前端自己处理一下：
  //   const newMessages = messages.map((item, index): MessageInfo => {
  //     return ({
  //       messageId: '00000001',
  //         userName: item.userName,
  //         userAvatar: 'https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg', //默认的个人头像
  //         sendTime: item.sendTime,
  //         content: item.content,
  //         isFile: item.isFile,
  //         isImage: item.isImage,
  //         fileInfo: undefined, //todo
  //         imageUrl: '', // todo
  //         isFirst: item.isFirst,
  //     })
  //   });
  //   const newMessageList: MessageList[] = [...messageList];
  //   const dailyMessageExist = newMessageList.find(
  //     (dailyItem) => dailyItem.date === date
  //   );
  //   if (dailyMessageExist) {
  //     // 日期存在 
  //     const personalMessageExist = dailyMessageExist.messages.find(
  //       (personalItem) => personalItem.userName === userName
  //     );
  //     if (personalMessageExist) {
  //       // 个人消息存在
  //       personalMessageExist.messages = [...personalMessageExist.messages, ...newMessages];
  //     } else {
  //       // 个人消息不存在
  //       dailyMessageExist.messages.push({
  //         userName: userName,
  //         messages: newMessages,
  //       });
  //     }
  //   }
  //   else {
  //     // 日期不存在
  //     newMessageList.push({
  //       date: date,
  //       messages: [
  //         {
  //           userName: userName,
  //           messages: newMessages,
  //         },
  //       ],
  //     });
  //   }
  //   setMessageList(newMessageList);
  // }
  // }
  // const newDailyMessage: MessageList = {
  //   date: date,
  //   messages: [
  //     {
  //       userName: userName,
  //       messages: messages,
  //     },
  //   ],
  // };


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
                    <ListItem key={personalIndex} messageInfo={personalItem} date={dailyItem.date} index={personalIndex} onMessageListModify={(newPersonalMessage: PersonalContinuousMessage) => handleMessageListModify(dailyIndex, personalIndex, newPersonalMessage)} />
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
          // onSend={handleSend}
          channelId={channelId}
          messageList={messageList}
          updateMessageList={() => setMessageList}
          members={[
            { id: "1", name: "张三", avatar: "..." },
            { id: "2", name: "李四" },
          ]}
        />
      </div>
    </>
  );
}
