import React from "react";

import { Card, Row, Col, List } from "antd";

import "../Timeline1.css";

const Explanation = props => {
  const aboutData = [
    <div>Developed for Playbook CRM</div>,
    <div>
      This is a "ONE DEAL" Page where all pertinent details of the Deal is shown
    </div>,
    <div>
      The page has many moving parts (although I've disabled the backend
      operations)
    </div>,
    <div>
      The Timeline view was developed from a blog showing how to do timelines
    </div>,
    <div>Timeline shows different items like - Email, Call, Meeting, etc</div>,
    <div>Made for a "DarK" mode view od Playbook CRM</div>
  ];

  const utiData = [
    <div>
      <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
        React JS
      </a>{" "}
      v17.0.1
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
    <div>
      <a
        href="https://interweave.dev/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Markup from Interweave
      </a>{" "}
      to safely render HTML without using <u>dangerouslySetInnerHTML</u>
    </div>,
    <div>
      <a href="https://date-fns.org/" rel="noopener noreferrer" target="_blank">
        date-fns
      </a>{" "}
      for Date related operations
    </div>,
    <div>CSS for styling</div>,
    <div>Older React style coding (no hooks used)</div>,
    <div>Javascript</div>
  ];

  const fnData = [
    <div>General Deal information on top (Note: All "actions" disabled)</div>,
    <div>Deal can be moved to a different Stage</div>,
    <div>Left hand side Cards show certain details necessary for the Deal</div>,
    <div>Timeline component is built in the main viewing area</div>,
    <div>Ability to take Notes and add Tasks</div>,
    <div>Many other small functions within the same page</div>,
    <div>Even a clipboard function provided for smartBCC email</div>
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
              bordered={false}
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
              bordered={false}
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
              bordered={false}
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
