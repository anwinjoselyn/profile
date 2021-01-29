import React from "react";

import { Card, Row, Col, List } from "antd";

import "../Template.css";

const Explanation = props => {
  const aboutData = [
    <div>
      Unreleased version of "Email Templates" developed for Playbook CRM
    </div>,
    <div>
      Email Templates (among other items from a Sales "Playbook") can be created
      and stored
    </div>,
    <div>These templates can be connected to specific "actions"</div>,
    <div>
      Users can give feedback on the efficacy of the templates via Up / Down
      Vote buttons
    </div>,
    <div>
      Users can also connect an Email Template to the "tasks" they do (not shown
      here)
    </div>,
    <div>Managers can Create & Edit Templates</div>,
    <div>
      Similarly Managers can create "Plays", "Scripts" & "Collaterals" - Not
      shown in in this example (FYI only)
    </div>
  ];

  const utiData = [
    <div>
      <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
        React JS
      </a>{" "}
      v17.0.1
    </div>,
    <div>
      <a href="https://draftjs.org/" rel="noopener noreferrer" target="_blank">
        Draft.JS
      </a>{" "}
      Rich Text Editor Framework for React
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
        Ant Design
      </a>{" "}
      for UI components
    </div>,
    <div>
      <a href="https://momentjs.com/" rel="noopener noreferrer" target="_blank">
        Moment.js
      </a>{" "}
      for a few AntD specific date management functions
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
    <div>List of available Email Templates</div>,
    <div>Ability to View the template</div>,
    <div>Edit template to make changes</div>,
    <div>Create New Template</div>,
    <div>View shows more information regarding Template</div>,
    <div>Can initiate Edit while viewing template</div>,
    <div>Deletion of templates</div>,
    <div>
      Note: I have disconnected the backend APIs so actual data saving /
      retrieval will not work
    </div>
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
