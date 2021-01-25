import React from "react";

import { Card, Row, Col, Space, Tag, Progress } from "antd";

import "./Skills.css";

const Skills = props => {
  return (
    <Card
      className="Skills page py-100 container-fluid animated bounceInRight"
      bordered={false}
    >
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sec-t">
            <h2>
              My <span>Skills</span>
            </h2>
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sub-head">
            <h4>
              <i className="fas fa-code-branch SkillIcon" /> Technical Skills
            </h4>
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        <Col span={12} className="SkillColumn">
          <div className="skill-item">
            <span className="skill-title">Javascript</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={85}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">React JS</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={80}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">HTML & CSS</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={85}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">React Bootstrap</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={85}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">AntD</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={80}
              status="active"
              strokeWidth={10}
            />
          </div>
        </Col>
        <Col span={12} className="SkillColumn">
          <div className="skill-item">
            <span className="skill-title">Serverless (AWS)</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={75}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">RDBMS</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={75}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">REST APIs</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={80}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">Express.js</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={75}
              status="active"
              strokeWidth={10}
            />
          </div>
          <div className="skill-item">
            <span className="skill-title">Node.js</span>
            <Progress
              strokeColor={{
                from: "#FBFAEB",
                to: "#014744"
              }}
              className="SkillProgress"
              percent={65}
              status="active"
              strokeWidth={10}
            />
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sub-head">
            <h4>
              <i className="fas fa-user-tie SkillIcon" /> Professional Skills
            </h4>
          </div>
          <Row>
            <Col span={6} style={{ display: "block", textAlign: "center" }}>
              <span className="SkillSpan">Communication</span>
              <br />
              <br />
              <Progress
                strokeColor="#014744"
                className="CircleProgress"
                type="circle"
                percent={95}
              />
            </Col>
            <Col span={6} style={{ display: "block", textAlign: "center" }}>
              <span className="SkillSpan">Team Work</span>
              <br />
              <br />
              <Progress
                strokeColor="#014744"
                className="CircleProgress"
                type="circle"
                percent={90}
              />
            </Col>
            <Col span={6} style={{ display: "block", textAlign: "center" }}>
              <span className="SkillSpan">Strategy</span>
              <br />
              <br />
              <Progress
                strokeColor="#014744"
                className="CircleProgress"
                type="circle"
                percent={85}
              />
            </Col>
            <Col span={6} style={{ display: "block", textAlign: "center" }}>
              <span className="SkillSpan">Goal Oriented</span>
              <br />
              <br />
              <Progress
                strokeColor="#014744"
                className="CircleProgress"
                type="circle"
                percent={90}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sub-head">
            <h4>
              <i className="fas fa-trophy SkillIcon" /> Domain Knowledge
            </h4>
            <Space>
              <Tag className="SkillsTag">Human Resources</Tag>
              <Tag className="SkillsTag">Recruitment</Tag>
              <Tag className="SkillsTag">Hotels & Restaurants</Tag>
              <Tag className="SkillsTag">Sales & Business Development</Tag>
              <Tag className="SkillsTag">Customer Success</Tag>
            </Space>
          </div>
        </Col>
      </Row>
      <br />
      <br />
    </Card>
  );
};

export default Skills;
