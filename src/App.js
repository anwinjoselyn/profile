import React, { useState, useEffect } from "react";
import { Layout, Menu, Tooltip } from "antd";

import {
  HomeOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
  DashboardOutlined,
  SnippetsOutlined,
  FileOutlined,
  ShakeOutlined,
  ThunderboltOutlined,
  BulbOutlined
} from "@ant-design/icons";

import Home from "./Containers/Home/Home";
import About from "./Containers/About/About";
import Skills from "./Containers/Skills/Skills";
import Experience from "./Containers/Experience/Experience";
import Resume from "./Containers/Resume/Resume";
import Showcase from "./Containers/Showcase/Showcase";
import Contact from "./Containers/Contact/Contact";

import "./App.css";

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setColapse] = useState(true);
  const [darkTheme, setTheme] = useState(false);
  const [themeClasses, setClasses] = useState({});
  const [selectedKey, setSelectedKey] = useState("7");

  console.log("selectedKey", selectedKey);
  useEffect(() => {
    //console.log("props.theme", props.theme);

    if (darkTheme) {
      setClasses({
        theme: "dark",
        ThemeDiv: "ThemeDivD",
        layout: "InnerContainerD",
        content: "ContentContainerD",
        sidebar: "MainSidebarD",
        sidebarC: "MainSidebarDC",
        menu: "MainMenuD",
        menuItem: "MainMenuItemD",
        menuItemS: "MainMenuItemDS"
      });
    } else {
      setClasses({
        theme: "light",
        ThemeDiv: "ThemeDiv",
        layout: "InnerContainer",
        content: "ContentContainer",
        sidebar: "MainSidebar",
        sidebarC: "MainSidebarC",
        menu: "MainMenu",
        menuItem: "MainMenuItem",
        menuItemS: "MainMenuItemS"
      });
    }
  }, [darkTheme]);

  return (
    <Layout className="OuterContainer">
      <Sider
        className={!collapsed ? themeClasses.sidebar : themeClasses.sidebarC}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setColapse(!collapsed)}
        theme={themeClasses.theme}
      >
        <div
          className={themeClasses.ThemeDiv}
          onClick={() => setTheme(!darkTheme)}
        >
          {darkTheme ? (
            <Tooltip title="Dark Mode" placement="right">
              <ThunderboltOutlined className="PBRed" />
            </Tooltip>
          ) : (
            <Tooltip title="Light Mode" placement="right">
              <BulbOutlined className="PBCyan" />
            </Tooltip>
          )}
        </div>
        <Menu
          theme={themeClasses.theme}
          className={themeClasses.menu}
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          onSelect={item => {
            setSelectedKey(item.key);
          }}
        >
          <Menu.Item
            key={"1"}
            icon={<HomeOutlined />}
            className={
              selectedKey === "1"
                ? themeClasses.menuItemS
                : themeClasses.menuItem
            }
          >
            Home
          </Menu.Item>
          <Menu.Item
            key={"2"}
            icon={<UserOutlined />}
            className={
              selectedKey === "2"
                ? themeClasses.menuItemS
                : themeClasses.menuItem
            }
          >
            About Me
          </Menu.Item>
          <Menu.Item
            key={"3"}
            icon={<DeploymentUnitOutlined />}
            className={
              selectedKey === "3"
                ? themeClasses.menuItemS
                : themeClasses.menuItem
            }
          >
            Skills
          </Menu.Item>
          <Menu.Item
            key={"4"}
            icon={<DashboardOutlined />}
            className={
              selectedKey === "4"
                ? themeClasses.menuItemS
                : themeClasses.menuItem
            }
          >
            Experience
          </Menu.Item>
          <Menu.Item
            key={"5"}
            icon={<SnippetsOutlined />}
            className={
              selectedKey === "5"
                ? themeClasses.menuItemS
                : themeClasses.menuItem
            }
          >
            Showcase
          </Menu.Item>
          <Menu.Item
            key={"6"}
            icon={<FileOutlined />}
            className={
              selectedKey === "6"
                ? themeClasses.menuItemS
                : themeClasses.menuItem
            }
          >
            Resume
          </Menu.Item>
          <Menu.Item
            key={"7"}
            icon={<ShakeOutlined />}
            className={
              selectedKey === "7"
                ? themeClasses.menuItemS
                : themeClasses.menuItem
            }
          >
            Contact
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={themeClasses.layout}>
        <Content className={themeClasses.content}>
          {selectedKey === "1" ? (
            <Home />
          ) : selectedKey === "2" ? (
            <About />
          ) : selectedKey === "3" ? (
            <Skills />
          ) : selectedKey === "4" ? (
            <Experience />
          ) : selectedKey === "6" ? (
            <Resume />
          ) : selectedKey === "5" ? (
            <Showcase />
          ) : selectedKey === "7" ? (
            <Contact />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
