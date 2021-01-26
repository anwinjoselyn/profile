import React from "react";

import { Card, Row, Col, Image, Space } from "antd";

import "./Badges.css";

import css_cert from "../../assets/css_cert.png";
import css_html_js_cert from "../../assets/css_html_js_cert.png";
import css from "../../assets/css.png";
import javascript_cert from "../../assets/javascript_cert.png";
import js from "../../assets/js.png";
import reactcert from "../../assets/reactcert.png";
import react_cert from "../../assets/react_cert.png";

const Badges = props => {
  return (
    <Card className="Badges" bordered={false}>
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sec-t">
            <h2>
              <span>Badges / Test Results</span>
            </h2>
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        <Col className="MainColumn">
          <Card
            className="BadgesInnerCard"
            bordered={false}
            title={<div>Pluralsight SkillIQ</div>}
          >
            <Space direction="vertical" size="large">
              <Image src={javascript_cert} width={500} />
              <Image src={react_cert} width={500} />
              <Image src={css_html_js_cert} width={500} />
              <Image src={css_cert} width={500} />
            </Space>
          </Card>
        </Col>
        <Col className="MainColumn">
          <Card
            className="BadgesInnerCard"
            bordered={false}
            title={<div>LinkedIn</div>}
          >
            <Space direction="vertical" size="large">
              <Image src={reactcert} width={500} />
              <Image src={js} width={500} />
              <Image src={css} width={500} />
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Badges;
