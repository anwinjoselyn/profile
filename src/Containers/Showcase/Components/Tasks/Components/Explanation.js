import React from "react";

import { Card, Row, Col, List } from "antd";

import "../../Kanban2/Kanban2.css";

const Explanation = props => {
  const aboutData = [
    <div>Unreleased version developed for Playbook CRM</div>,
    <div>Task Management is an inherent feature in CRMs</div>,
    <div>Tasks can be filtered by - Type, Time period, Team & Users</div>,
    <div>Activities (Tasks) are made on deals</div>,
    <div>Selecting a task opens a side Drawer for updates</div>,
    <div>You can take notes with the Rich Editor provider</div>,
    <div>On completion, the task disappers from your current view</div>
  ];

  const utiData = [
    <div>
      HTML native{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API"
        rel="noopener noreferrer"
        target="_blank"
      >
        Drag & Drop
      </a>{" "}
      functions
    </div>,
    <div>
      <a href="https://date-fns.org/" rel="noopener noreferrer" target="_blank">
        date-fns
      </a>{" "}
      for Date related operations
    </div>,
    <div>
      <a
        href="https://ant.design/components/overview/"
        rel="noopener noreferrer"
        target="_blank"
      >
        antd
      </a>{" "}
      for UI components
    </div>,
    <div>CSS for styling</div>,
    <div>
      <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
        React JS
      </a>{" "}
      v17.0.1
    </div>,
    <div>
      Icons from{" "}
      <a
        href="https://fontawesome.com/icons"
        rel="noopener noreferrer"
        target="_blank"
      >
        Font Awesome
      </a>
    </div>,
    <div>Javascript</div>
  ];

  const fnData = [
    <div>Dashboard showing Objectives and Achievements (Real-time)</div>,
    <div>Kanban view of Pipeline</div>,
    <div>Drag & Drop Deals to move through stages</div>,
    <div>Hover over "contact" in Kanban view to get contact details</div>,
    <div>
      Calendar icon color coded to show expired / active / null Tasks assigned
      to each Deal
    </div>,
    <div>Change Pipeline / User</div>
  ];

  return (
    <div className="site-card-wrapper Explanation">
      <Row gutter={16}>
        <Col span={8}>
          <Card
            hoverable
            title={<div style={{ textAlign: "center" }}>About</div>}
            bordered={true}
          >
            <List
              size="small"
              bordered
              dataSource={aboutData}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            title={
              <div style={{ textAlign: "center" }}>Utilities / Languages</div>
            }
            bordered={true}
          >
            <List
              size="small"
              bordered
              dataSource={utiData}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            title={<div style={{ textAlign: "center" }}>Functionality</div>}
            bordered={true}
          >
            <List
              size="small"
              bordered
              dataSource={fnData}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Explanation;
