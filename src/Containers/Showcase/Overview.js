import React from "react";

import { Card, Row, Col, List } from "antd";

import "./Showcase.css";

const Overview = props => {
  const data = [
    <div>A few Functional Examples of my projects</div>,
    <div>Have not looked into "DESIGN" much, just functionalities</div>,
    <div>All of these were made for Playbook app</div>,
    <div>
      All developed with help of online tutorials, Stack Overflow questions,
      blogs, etc
    </div>,
    <div>Some of them are not released in the product</div>,
    <div>
      Where I have not shown actual functions, I will upload Screenshots (where
      tabs are disabled for now)
    </div>,
    <div>Can show demo of all these if so desired</div>
  ];

  return (
    <div className="site-card-wrapper Overview">
      <Row gutter={16}>
        <Col span={24}>
          <Card
            hoverable
            title={<div style={{ textAlign: "center" }}>About Showcase</div>}
            bordered={true}
          >
            <List
              size="small"
              bordered={false}
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
