import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import "./index.scss";
import { Avatar, Button, Breadcrumb, Layout, Menu, message } from "antd";
import Logo from "@/assets/logo.png";
import { getGlobalUserInfo } from "@/utils/globalState";
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
import { getChannelList } from "@/utils/server";
import Channel from "@/pages/Channel";

const { Header, Content, Footer, Sider } = Layout;

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

// const channelTitles = [
//   "项目1频道交流群",
//   "项目2的频道",
//   "项目3频道交流群",
//   "添加频道",
// ];

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const userInfo = getGlobalUserInfo();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string[]>(["0"]);
  const [channelList, setChannelList] = useState<ChannelList>([]);
  // const [communicationList, setCommunicationList] =
  //   useState<string[]>(channelTitles);

  const items: MenuItem[] = [
    getItem("项目中心", "0", <ProjectOutlined />),
    getItem("我的项目组", "1", <UsergroupAddOutlined />),
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
                <div className="add-channel-btn">
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
        const newChannelList:ChannelList = [...(res.data || []), {
          id: "add-channel",
          name: "添加频道",
        }];
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
      navigate(`/home${mainRoutes[Number(keyArr[0])]}`, {
        state: { channelId: stateItem.id, channelName: stateItem.name },
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

  return (
    <>
      {contextHolder}
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
          <LeftBar />
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
              mode="inline"
              items={items as MenuItem[]}
              className="layout-menu"
              onClick={({ key }) => handleMenuClick(key)}
            />
          </Sider>

          <Layout className="inner-layout">
            <Content style={{ width: "90%", height: "auto" }}>
              <Breadcrumb style={{ margin: "1rem 0" }}>
                {getBreadcrumb(items)}
              </Breadcrumb>

              <div className="main-content">
                <Outlet />
              </div>

              <Footer className="layout-footer">
                Graduation Project ©{new Date().getFullYear()} Created by Yaqu
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
