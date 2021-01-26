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
      <a href="https://draftjs.org/" rel="noopener noreferrer" target="_blank">
        Draft.JS
      </a>{" "}
      Rich Text Editor Framework for React
    </div>,
    <div>
      <a
        href="https://github.com/jpuri/react-draft-wysiwyg"
        rel="noopener noreferrer"
        target="_blank"
      >
        React Draft Wysiwyg
      </a>{" "}
      because it was prettier than using Draft.js as a standalone
    </div>,
    <div>
      <a href="https://date-fns.org/" rel="noopener noreferrer" target="_blank">
        date-fns
      </a>{" "}
      for a variety of date relation functions (isSameWeek, isToday, and so
      on...)
    </div>,
    <div>
      <a href="https://momentjs.com/" rel="noopener noreferrer" target="_blank">
        Moment.js
      </a>{" "}
      for a few AntD specific date management functions
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
    <div>
      Few Icons from{" "}
      <a
        href="https://ant.design/components/icon/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Ant Design
      </a>
    </div>,
    <div>Javascript</div>
  ];

  const fnData1 = [
    <div>View all pending Tasks</div>,
    <div>Filter tasks by - Type, Time Period, Team & User</div>,
    <div>Select a Task opens a Side Drawer for easy view/edits</div>,
    <div>Update tasks with appropriate info</div>,
    <div>Rich Text Editor to take notes</div>,
    <div>
      Bulk Edit Tasks - Upcoming<sup>*</sup>
    </div>
  ];

  const fnData2 = [
    <div>See only ONE Task at a time</div>,
    <div>Helps concentrate and apply yourself without distractions</div>,
    <div>
      Has a dashboard with most important information (and feedback about the
      task)
    </div>,
    <div>Hover over "contact" in Kanban view to get contact details</div>,
    <div>Rich Text Editor to take notes</div>,
    <div>Once a Task is completed, the NEXT Task opens automatically</div>,
    <div>
      If there are no tasks for the day, it will open the oldest Task to be
      completed
    </div>,
    <div>View ALL TASKS in Side Drawer to select a different Task</div>
  ];

  return (
    <div className="site-card-wrapper Explanation">
      <Row gutter={16}>
        <Col span={12}>
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
        <Col span={12}>
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
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            hoverable
            title={
              <div style={{ textAlign: "center" }}>All Activities - Brief</div>
            }
            bordered={true}
          >
            <List
              size="small"
              bordered
              dataSource={fnData1}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            title={
              <div style={{ textAlign: "center" }}>Inbox View - Brief</div>
            }
            bordered={true}
          >
            <List
              size="small"
              bordered
              dataSource={fnData2}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Explanation;
