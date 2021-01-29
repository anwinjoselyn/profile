import React from "react";

import { Card, Row, Col, List } from "antd";

import "../Parser.css";

const Explanation = props => {
  const aboutData = [
    <div>
      Unreleased version of "Leads Management" developed for Playbook CRM
    </div>,
    <div>Leads are captured from Client website(s) via REST API Endpoints</div>,
    <div>All leads sit in the Leads Console</div>,
    <div>User can distribute the leads into Campaigns or Create new DEALS</div>,
    <div>Leads can be handled in bulk or one by one</div>,
    <div>
      User can also Create a New Leads or Bulk Upload Leads via CSV file
    </div>,
    <div>Ability create a New Campaign and assign Leads</div>
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
        href="https://www.papaparse.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Papa Parse
      </a>{" "}
      for parsing uploaded .csv files
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
    <div>CSS for styling</div>,
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
    <div>Dashboard shows all Incoming Leads</div>,
    <div>Can sort by All, Week, Month and already claimed Leads</div>,
    <div>Add a single lead via form which opens in a side Drawer</div>,
    <div>Upload leads via File Upload (.csv files)</div>,
    <div>Create New Campaign or assign leads to existing campaigns</div>,
    <div>Assign Leads to a Campaign or create a Deals from the leads</div>,
    <div>Assign one-by-one or in Bulk</div>
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
