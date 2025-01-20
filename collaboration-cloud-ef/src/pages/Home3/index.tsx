import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Breadcrumb, Layout, Menu, theme, message } from "antd";
import Logo from "../../assets/logo.png";
import { getGlobalUserInfo } from "../../utils/globalState";
import { menuTitleList } from "../../constant/const";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    className: "menu-item",
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("项目中心", "1", <PieChartOutlined className="menu-item-icon" />),
  getItem("我的项目组", "sub1", <TeamOutlined className="menu-item-icon" />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("交流中心", "sub2", <TeamOutlined className="menu-item-icon" />, [
    getItem("Tom", "6"),
    getItem("Bill", "7"),
    getItem("Alex", "8"),
  ]),
  getItem("收件箱", "sub3", <FileOutlined className="menu-item-icon" />, [
    getItem("Team 1", "9"),
    getItem("Team 2", "10"),
  ]),
  getItem("个人中心", "11", <UserOutlined className="menu-item-icon" />),
];

export default function Home3() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const userInfo = getGlobalUserInfo();
  const Navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string>("1");

  useEffect(() => {
    if (location.state?.loginAlert) {
      messageApi.open({
        type: "success",
        content: "登录成功！",
        duration: 1,
      });
    }
  }, [location.state]);

  return (
    <>
      {contextHolder}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={"20rem"}
          collapsedWidth={"10rem"}
          className="layout-sider"
        >
          <div className="logo-vertical">
            <img alt="logo" src={Logo} className="logo" />
            <span className="logo-name"> 协作云 </span>
          </div>
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            className="layout-menu"
          />
        </Sider>
        <Layout>
          <Header className="layout-header">
            <div className="left-top-block">
              <Avatar
                className="avatar"
                src={userInfo?.portrait}
              />
              <span className="hint-text"> Hello {userInfo?.name}! </span>
              <Button type="primary" ghost className="logout-btn" onClick={() => Navigate("/login")}>
                Log out
              </Button>
            </div>
          </Header>

          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>当前位置：{ menuTitleList[Number(selectedKey) - 1] }</Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Graduation Project ©{new Date().getFullYear()} Created by Yaqu
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
