import React from "react";

import { Card, Row, Col, List } from "antd";

import "./Kanban1.css";

const Explanation = props => {
  const aboutData = [
    <div>Developed for Playbook CRM</div>,
    <div>CRM has records called "DEALS"</div>,
    <div>Each Deal is connected to an Organizatino & a Contact</div>,
    <div>Activities (Tasks) are made on deals</div>,
    <div>Deals can be arranged as per Team Pipeline</div>,
    <div>Deals go through "Stages" to progress</div>,
    <div>Kanban View for better visualization of Deals</div>
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
        href="https://react-bootstrap.github.io/"
        rel="noopener noreferrer"
        target="_blank"
      >
        React-Bootstrap
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
    <div>useEffect & useState (React)</div>,
    <div>Javascript</div>
  ];

  const fnData = [
    <div>Dashboard showing Objectives and Achievements (Real-time)</div>,
    <div>Kanban view of Pipeline</div>,
    <div>Table view of Deals</div>,
    <div>Hover over "contact" in Kanban view to get contact details</div>,
    <div>
      "..." in individual Deal in Kanban view color coded to show expired /
      active / null Tasks assigned
    </div>,
    <div>Change Pipeline / User</div>,
    <div>Search for deals in Table view</div>
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
