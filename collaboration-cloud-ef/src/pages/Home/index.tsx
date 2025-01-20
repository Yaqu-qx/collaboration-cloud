import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import "./index.scss";
import ItemCenter from "../../component/ItemCenter";
import { Avatar, Button, Breadcrumb, Layout, Menu, theme, message } from "antd";
import Logo from "../../assets/logo.png";
import { getGlobalUserInfo } from "../../utils/globalState";
import LeftBar from "../../component/LeftBar";
import { mainRoutes } from "../../constant/const";
import {
  ProjectOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    icon,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("项目中心", "0", <ProjectOutlined />),
  getItem("我的项目组", "1", <UsergroupAddOutlined />),
  getItem("交流中心", "2", <MessageOutlined />, [
    getItem("消息私信", "2-0"),
    getItem("交流群", "2-1"),
    getItem("关注列表", "2-2"),
  ]),
  getItem("个人中心", "3", <IdcardOutlined />, [
    getItem("个人主页", "3-0"),
    getItem("我的收藏", "3-1"),
    getItem("账号管理", "3-2"),
  ]),
];

export default function Home3() {
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const userInfo = getGlobalUserInfo();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string[]>(["0"]);

  useEffect(() => {
    if (location.state?.loginAlert) {
      messageApi.open({
        type: "success",
        content: "登录成功！",
        duration: 1,
      });
    }
  }, [location.state]);

  const handleMenuClick = (key: string) => {
    console.log("click ", key);
    // 内容框上方路径导航
    if (key.length === 1) {
      setSelectedKey([key]);
      navigate(`/home${mainRoutes[Number(key)]}`);
    } else {
      const keyArr = key.split("-");
      setSelectedKey([keyArr[0], keyArr[1]]);
      navigate(`/home${mainRoutes[Number(keyArr[0])]}`);
    }

    // // 跳转页面
    // navigate(`/home${mainRoutes[Number(key)]}`);

  };

  const getBreadcrumb = (items: MenuItem[]) => {
    const firstLevelItem = items.find((item) => item?.key === selectedKey[0]);
    const secondLevelItem = firstLevelItem?.children?.find(
      (item) => item.key === `${selectedKey[0]}-${selectedKey[1]}`
    );
    return (
      <>
        {" "}
        {firstLevelItem && (
          <Breadcrumb.Item>当前位置：{firstLevelItem.label}</Breadcrumb.Item>
        )}{" "}
        {secondLevelItem && (
          <Breadcrumb.Item>{secondLevelItem.label}</Breadcrumb.Item>
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
            <Button
              type="primary"
              ghost
              className="logout-btn"
              onClick={() => navigate("/login")}
            >
              Log out
            </Button>
          </div>
        </Header>

        <Layout>
          <LeftBar />
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={"15rem"}
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
            <Content style={{ margin: "0 5rem", height: "auto" }}>
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
