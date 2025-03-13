import React, { useState, useRef, useEffect } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { ChannelInfo } from "@/typings/api/channels";
import { getChannelInfo, getChannelMessages } from "@/utils/server";
import Loading from "@/component/Loading";
import Header from "./Header";
import "./index.scss";
import MessageInput from "./MessageInput";
import {
  MessageList,
  PersonalContinuousMessage,
} from "@/typings/api/messages";
import ListItem from "./ListItem";
import { Button, Tabs } from "antd";
import {
  MessageFilled,
  SnippetsFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import ProjectorImg from "@/assets/Projector.png";
import { Divider, Chip } from "@mui/material";
import CollaborationEditor from "./CollaborationEditor";
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import AddNewMember from "@/component/AddNewMember";
import { peopleInfoType } from "@/typings/type";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth", // 替换为你的认证端点
});
const { RoomProvider } = createRoomContext(client);

// 在组件内获取context
export default function Channel() {
  const { handleDeleteChannel } = useOutletContext<{
    handleDeleteChannel: (channelId: string) => void
  }>();
  const location = useLocation();
  console.log(location.state);
  const { channelId } = location.state;
  // const channelId = useParams<{ channelId: string }>().channelId ?? '0000000001';
  const [loading, setLoading] = useState(true);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(
    {} as ChannelInfo
  );
  const [messageList, setMessageList] = useState<MessageList[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [tabActiveKey, setTabActiveKey] = useState("MESSAGE_BLOCK"); // COLLABORATION_BLOCK || MESSAGE_BLOCK
  const [showAddNewMember, setShowAddNewMember] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [members, setMembers] = useState<peopleInfoType[]>([]);

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
  const handleMessageListModify = (
    dailyIndex: number,
    personalIndex: number,
    newMessages: PersonalContinuousMessage
  ) => {
    const newMessageList: MessageList[] = [...messageList];
    newMessageList[dailyIndex].messages[personalIndex] = newMessages;
    setMessageList(newMessageList);
  };

  const tabItems = [
    {
      key: "MESSAGE_BLOCK",
      label: "消息",
      icon: <MessageFilled />,
      children: (
        <div className="message-container" ref={messageContainerRef}>
          <div className="message-list">
            <div className="start-block">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
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
              <Button
                icon={<UserAddOutlined />}
                style={{ width: "10rem" }}
                onClick={() => setShowAddNewMember(true)}
              >
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
                    <ListItem
                      key={`${dailyItem.date}_${personalItem.userName}`}
                      messageInfo={personalItem}
                      date={dailyItem.date}
                      index={personalIndex}
                      onMessageListModify={(
                        newPersonalMessage: PersonalContinuousMessage
                      ) =>
                        handleMessageListModify(
                          dailyIndex,
                          personalIndex,
                          newPersonalMessage
                        )
                      }
                    />
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
      key: "COLLABORATION_BLOCK",
      label: "协作",
      icon: <SnippetsFilled />,
      children: (
        <div style={{ margin: "0 -2rem", position: "relative" }}>
          <RoomProvider
            id={channelId as string}
            initialPresence={{ cursor: null }}
            initialStorage={{ content: "" }}
          >
            <CollaborationEditor
              channelId={channelId as string}
              fileList={channelInfo.fileList}
            />

            {/* 实时显示其他用户 */}
            {/* <Cursors /> */}
          </RoomProvider>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchChannelInfo = getChannelInfo(channelId as string)
      .then((res) => res.json())
      .then((res) => {
        setChannelInfo(res.data);
        setMemberCount(res?.data?.members.length || 0);
        setMembers(res?.data?.members || []);
      })
      .catch((err) => {
        console.log(err);
      });

    const fetchChannelMessages = getChannelMessages(channelId as string)
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
  }, [ channelId]);

  // 修改消息更新回调函数
  const handleNewMessageList = (newList: MessageList[]) => {
    // 创建全新数组引用
    // const sortedList = [...newList].sort((a, b) =>
    //   new Date(a.date).getTime() - new Date(b.date).getTime()
    // );

    // 使用函数式更新保证状态同步
    setMessageList(newList);

    // 强制滚动到底部
    setTimeout(scrollToBottom, 100);
  };

  const handleInvite = (newMembers: string[]) => {
    setMemberCount(memberCount + newMembers.length);
    // setMembers([...members, ...newMembers]);
  };

  return (
    <>
      {loading && <Loading />}
      {showAddNewMember && (
        <AddNewMember
          onClose={() => setShowAddNewMember(false)}
          onInvite={handleInvite}
        />
      )}
      <div className="channel-info-container">
        <Header
          channelInfo={channelInfo}
          members={members}
          channelName={channelInfo.channelName}
          memberCount={memberCount}
          onAddNewMember={() => setShowAddNewMember(true)}
          handleDeleteChannel={handleDeleteChannel}
        />
        <Tabs
          activeKey={tabActiveKey}
          className="channel-tabs"
          items={tabItems}
          onTabClick={(key) => setTabActiveKey(key)}
          tabBarStyle={{
            margin: "-2rem",
            marginTop: "1.5rem",
            marginBottom: 0,
          }}
        />

        {tabActiveKey === "MESSAGE_BLOCK" && (
          <MessageInput
            // onSend={handleSend}
            channelId={channelId as string}
            updateMessageList={handleNewMessageList}
            members={[
              { id: "1", name: "张三", avatar: "..." },
              { id: "2", name: "李四" },
            ]}
          />
        )}
      </div>
    </>
  );
}
