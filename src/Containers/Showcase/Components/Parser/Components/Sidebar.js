import React, { useState, useEffect } from "react";
//import React from "react";
import { Layout, Menu } from "antd";

import {
  //CarryOutOutlined,
  //DashOutlined,
  //UserAddOutlined,
  LineChartOutlined,
  MinusSquareOutlined,
  FireOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";

//import axios from "axios";

import "../Parser.css";

const { Sider } = Layout;
//const { SubMenu } = Menu;
//const { TabPane } = Tabs;
//const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
//const { Title } = Typography;

//const pbLogo = require("../../assets/tempimages/PB.png");

const SideBar = props => {
  const [sidebarClasses, setClasses] = useState({});
  //console.log("props", props);
  //const [dataLoaded, setLoaded] = useState(true);
  //console.log("props.openKeys", props.openKeys);

  useEffect(() => {
    //console.log("props.theme", props.theme);

    if (props.theme && props.theme === "dark") {
      setClasses({
        sidebar: props.theme,
        menu: props.theme,
        submenu: "mainSubmenuDark",
        submenuspan: "mainSubmenuSpanDark",
        smicon: "pbDark",
        trigger: "triggerDark"
      });
    } else {
      setClasses({
        sidebar: "light",
        menu: "light",
        submenu: "mainSubmenu",
        submenuspan: "mainSubmenuSpan",
        smicon: "pbLight",
        trigger: "trigger"
      });
    }
  }, [props.theme]);

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "87vh",
        right: 0
      }}
      className="childSidebar"
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      theme={sidebarClasses.sidebar}
    >
      <Menu
        theme={sidebarClasses.sidebar}
        mode={!props.collapsed ? "vertical" : "inline"}
        openKeys={props.openKeys}
        onOpenChange={props.onOpenChange}
        selectedKeys={[props.currentMenu]}
        subMenuOpenDelay={0.2}
      >
        <Menu.Item
          className={
            sidebarClasses.sidebar === "dark"
              ? "mainSubmenuItemD"
              : "mainSubmenuItem"
          }
          key="show"
          icon={
            props.rightMenu && props.rightMenu.show ? (
              <MinusSquareOutlined />
            ) : (
              <PlusSquareOutlined />
            )
          }
          onClick={() =>
            props.setRightMenu({
              ...props.rightMenu,
              show: !props.rightMenu.show
            })
          }
        >
          {props.rightMenu && props.rightMenu.show ? "Hide" : "Show"}
        </Menu.Item>
        <Menu.Item
          className={
            props.rightMenu && props.rightMenu.data === "stats"
              ? sidebarClasses.sidebar === "dark"
                ? "mainSubmenuItemSD"
                : "mainSubmenuItemS"
              : sidebarClasses.sidebar === "dark"
              ? "mainSubmenuItemD"
              : "mainSubmenuItem"
          }
          key="stats"
          icon={<LineChartOutlined />}
          onClick={() =>
            props.setRightMenu({
              ...props.rightMenu,
              data: "stats"
            })
          }
        >
          Insights
        </Menu.Item>
        <Menu.Item
          className={
            props.rightMenu && props.rightMenu.data === "rec"
              ? sidebarClasses.sidebar === "dark"
                ? "mainSubmenuItemSD"
                : "mainSubmenuItemS"
              : sidebarClasses.sidebar === "dark"
              ? "mainSubmenuItemD"
              : "mainSubmenuItem"
          }
          key="rec"
          icon={<FireOutlined />}
          onClick={() =>
            props.setRightMenu({
              ...props.rightMenu,
              data: "rec"
            })
          }
        >
          Recommendations
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
