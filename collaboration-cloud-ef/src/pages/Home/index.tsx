import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import "./index.scss";
import { Avatar, Modal, Breadcrumb, Layout, Menu, message, Input } from "antd";
import Logo from "@/assets/logo.png";
import { getGlobalUserInfo, getUserName, getUserPortrait } from "@/utils/globalState";
import LeftBar from "@/component/LeftBar";
import { mainRoutes } from "@/constant/const";
import {
  ProjectOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  IdcardOutlined,
  PlusSquareTwoTone,
  BorderlessTableOutlined,
} from "@ant-design/icons";
import logOutIcon from "@/assets/logout.png";
import IconButton from "@mui/material/IconButton";
import { getChannelList, addChannel } from "@/utils/server";
import MailDrawer from "@/component/MailDrawer";
import SelectInput from "@/component/SelectInput";
import type { SelectProps } from "antd";
import allMembers from "@/constant/allMembers.json";
import defaultAvater from "@/assets/defaultAvater.png";
import { generateId } from "@/utils/utils";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
interface MenuItem {
  key: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  popupClassName?: string;
}

type ChannelList = {
  id: string;
  name: string;
}[];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  popupClassName?: string
): MenuItem {
  return {
    key,
    label,
    icon,
    children,
    popupClassName,
  } as MenuItem;
}

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const userInfo = getGlobalUserInfo();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string[]>(["0"]);
  const [channelList, setChannelList] = useState<ChannelList>([]);

  const [open, setOpen] = useState(false);
  const [haveNoRead, setHaveNoRead] = useState(true);

  const [addChannelVisible, setAddChannelVisible] = useState(false);
  const [selectMembers, setSelectMembers] = useState<string[]>([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleDeleteChannel = (channelId: string) => {
    setChannelList(prev => prev.filter(item => item.id !== channelId));
    setSelectedKey(["2-0"]);
    navigate(`/home/discussion-center`, {
      state: { channelId: '0000000001'},
    });
    message.success('操作成功!');
  };

  const items: MenuItem[] = [
    getItem("项目中心", "0", <ProjectOutlined />),
    getItem("我的项目空间", "1", <UsergroupAddOutlined />),
    getItem(
      "交流中心",
      "2",
      <MessageOutlined />,
      channelList.map(
        (item, index): MenuItem => ({
          key: `2-${index}`,
          label: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="channel-menu-item"
            >
              {index === channelList.length - 1 ? (
                <div className="add-channel-btn" onClick={() => setAddChannelVisible(true)}>
                  <PlusSquareTwoTone style={{ fontSize: "1.2rem" }} />
                  <p style={{ color: "#333" }}>添加新频道</p>
                </div>
              ) : (
                <>
                  <BorderlessTableOutlined />
                  <a>{item.name}</a>
                </>
              )}
            </div>
          ),
        })
      ),
      "channel-menu-popup"
    ),
    getItem("个人中心", "3", <IdcardOutlined />),
  ];

  useEffect(() => {
    if (location.state?.loginAlert) {
      messageApi.open({
        type: "success",
        content: "登录成功！",
        duration: 1,
      });
    }
  }, [location.state]);

  useEffect(() => {
    // 获取频道列表
    getChannelList(userInfo?.id || "")
      .then((res) => res.json())
      .then((res) => {
        const newChannelList: ChannelList = [
          ...(res.data || []),
          {
            id: "add-channel",
            name: "添加频道",
          },
        ];
        // console.log("data", res.data, "newChannelList", newChannelList);
        setChannelList(newChannelList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMenuClick = (key: string) => {
    console.log("click ", key);
    // 内容框上方路径导航
    if (key.length === 1) {
      setSelectedKey([key]);
      navigate(`/home${mainRoutes[Number(key)]}`);
    } else {
      const keyArr = key.split("-");
      setSelectedKey([keyArr[0], keyArr[1]]);
      if (keyArr[1] === (channelList.length - 1).toString()) return;
      const stateItem = channelList[Number(keyArr[1])];
      console.log("????????", stateItem, "??");
      navigate(`/home${mainRoutes[Number(keyArr[0])]}`, {
        state: { channelId: stateItem.id },
      });
    }

    // // 跳转页面
    // navigate(`/home${mainRoutes[Number(key)]}`);
  };

  const getBreadcrumb = (items: MenuItem[]) => {
    const firstLevelItem = items.find((item) => item?.key === selectedKey[0]);
    return (
      <>
        {" "}
        {firstLevelItem && (
          <Breadcrumb.Item>当前位置：{firstLevelItem.label}</Breadcrumb.Item>
        )}{" "}
        {selectedKey.length > 1 &&
          Number(selectedKey[1]) < channelList.length - 1 && (
            <Breadcrumb.Item>
              {channelList[Number(selectedKey[1])].name}
            </Breadcrumb.Item>
          )}{" "}
      </>
    );
  };

  const options: SelectProps["options"] = allMembers.map((member) => ({
    ...member,
    avatar: member.avatar.trim() || defaultAvater, // 使用导入的默认头像
  }));

  const handleCreateNewC = async () => {
    console.log("handleCreateNewC");
    if (!newChannelName.trim()) {
      message.error('频道名称不能为空!');
      return;
    }
    const channelInfo = {
      channelId: generateId(),
      channelName: newChannelName,
      projectName: "",
      createBy: getUserName() ?? 'Yaqu',
      createdAt: new Date().getDate().toString(),
      theme: "软件开发",
      members: [{name: getUserName()?? 'Yaqu', avatar: getUserPortrait()}],
      teacher: [],
      filelist: [],
      description: textAreaValue
    }

    try {
      const res = await addChannel(channelInfo);
      if (res.success) {
        if(selectMembers.length > 0) {
          message.success("已向对应用户发送邀请!");
        }
        setChannelList(prev => [
          ...prev.slice(0, -1),
          { id: channelInfo.channelId, name: channelInfo.channelName },
          prev[prev.length - 1]
        ]);
        message.success("创建成功!");
        setSelectMembers([]);
        setNewChannelName("");
        setTextAreaValue("");
        setAddChannelVisible(false); 
        navigate(`/home/discussion-center`, {
          state: { channelId: channelInfo.channelId },
        });
      }
    } catch (error) {
      message.error('频道创建失败');
    }
  }

  return (
    <>
      {contextHolder}
      {/* <Modal 
      title="创建新频道"
      open={showDeleteConfirm}
      onCancel={() => setShowDeleteConfirm(false)}
      onOk={() => handleDelete()}
      okText="确定"
      cancelText="取消"
      >
        确定退出该频道？
      </Modal> */}
      <Modal
        title="创建新频道"
        open={addChannelVisible}
        onCancel={() => setAddChannelVisible(false)}
        onOk={() => handleCreateNewC()}
        okText="创建"
        cancelText="取消"
        width={800}
        styles={{
          body: {
            height: "25rem",
          },
        }}
      >
        <p>频道名称 <span style={{color: 'red'}}>*</span> ：</p>
        <Input
          allowClear
          placeholder="请输入频道名称"
          value={newChannelName} 
          onChange={(e:any) => setNewChannelName(e.target.value)}
          style={{ marginBottom: "1rem", width:"23rem" }}
        />
        <SelectInput
          
          value={selectMembers}
          onChange={(value: any) => setSelectMembers(value)}
          maxCount={10}
          required={false}
          mode="multiple"
          label="邀请成员："
          showSearch={true}
          placeholder="选择成员"
          width="23rem"
          options={options as any}
          faq="请选择邀请的成员，注意一次邀请最多不能超过10人，每个项目最多不能超过30人。"
        />

        <div style={{marginTop:'1rem'}}>
          <p>频道介绍</p>
          <TextArea
            showCount
            maxLength={100}
            value={textAreaValue}
            onChange={(e: any) => setTextAreaValue(e.target.value)}
            placeholder="简单介绍一下你的频道"
            style={{ marginTop: "0.2rem", height: "10rem" }}
          />
        </div>
      </Modal>
      <Layout style={{ height: "100vh" }}>
        <Header className="layout-header">
          <div className="logo-vertical">
            <img alt="logo" src={Logo} className="logo" />
            <span className="logo-name"> 协作云 </span>
          </div>

          <div className="left-top-block">
            <Avatar className="avatar" src={userInfo?.portrait} />
            <span className="hint-text"> Hello {userInfo?.name}! </span>
            <IconButton>
              <img
                alt="logout"
                src={logOutIcon}
                className="logout-btn"
                onClick={() => navigate("/login")}
              />
            </IconButton>
          </div>
        </Header>

        <Layout>
          <LeftBar onDrawerOpen={() => setOpen(true)} />
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={"16rem"}
            collapsedWidth={"1rem"}
            className="layout-sider"
          >
            <Menu
              defaultSelectedKeys={["0"]}
              selectedKeys={selectedKey}
              mode="inline"
              items={items as MenuItem[]}
              className="layout-menu"
              onClick={({ key }) => {handleMenuClick(key); setSelectedKey([key])}}
            />
          </Sider>

          <Layout className="inner-layout">
            <Content style={{ width: "90%", height: "auto" }}>
              <Breadcrumb style={{ margin: "1rem 0" }}>
                {getBreadcrumb(items)}
              </Breadcrumb>

              <div className="main-content">
                <Outlet context={{ handleDeleteChannel }} />
              </div>

              <Footer className="layout-footer">
                Graduation Project ©{new Date().getFullYear()} Created by Yaqu
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <MailDrawer
        open={open}
        onClose={() => setOpen(false)}
        haveNoRead={haveNoRead}
        onNoRead={() => setHaveNoRead(false)}
      />
    </>
  );
}
