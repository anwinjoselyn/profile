import React, { useState, useEffect } from "react";

import {
  Tabs,
  Typography,
  Spin,
  Card,
  Row,
  Col,
  Statistic,
  Descriptions,
  Divider,
  Progress
} from "antd";

import {
  LoadingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleTwoTone,
  BulbTwoTone,
  HomeTwoTone,
  DollarOutlined,
  SmileTwoTone,
  PhoneTwoTone,
  MailTwoTone,
  ThunderboltTwoTone,
  DollarTwoTone,
  FireTwoTone
} from "@ant-design/icons";

//import axios from "axios";

import "./OverviewStats.css";

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const OverviewStats = props => {
  const [something, setSomething] = useState(props.something);
  const [dataLoaded, setLoaded] = useState(true);

  const callback = key => {
    console.log(key);
  };

  useEffect(() => {
    setSomething(something);
  }, [something]);

  const stats = type => {
    if (type === "today") {
      return (
        <div className="OverviewStats">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={16}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={24}>
                      <Card className="majorStatCard">20 Activities</Card>
                    </Col>
                    <Divider>across</Divider>
                    <Col span={24}>
                      <Card className="majorStatCard">8 Deals</Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                      <Card className="minorStatCard">5 Demos</Card>
                    </Col>
                    <Col span={12}>
                      <Card className="minorStatCard">1 Meeting(s)</Card>
                    </Col>
                    <Col span={12}>
                      <Card className="minorStatCard">8 Calls</Card>
                    </Col>
                    <Col span={12}>
                      <Card className="minorStatCard">4 Emails</Card>
                    </Col>
                    <Col span={24}>
                      <Card className="minorStatCard">2 Others</Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Card title="Achieved" className="statsCard">
                <Progress
                  strokeColor={{
                    from: "#108ee9",
                    to: "#87d068"
                  }}
                  status="active"
                  percent={62}
                />
                <br />
                <br />
                <span className="statsCardSpan">Quota $1000</span>
                <br />
                <br />
                <span className="statsCardSpan">8 Deals Won</span>
              </Card>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Card className="firstActCard">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={24}>
                    <span className="FACtitleSpan">
                      Call XYZ from ABS @ 09:30 for 10 minutes regarding Final
                      Closure
                    </span>
                    <span className="FACInfoSpan">1 of 20</span>
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={8}>
                    <Card title="ABS Deal" className="FACSpecifics">
                      <DollarTwoTone twoToneColor="#52c41a" />
                      <span className="emptySpan" /> 1,000
                      <br />
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      <span className="emptySpan" /> 3 Demos
                      <br />
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      <span className="emptySpan" /> 7 Calls
                      <br />
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      <span className="emptySpan" /> 15 Emails
                      <br />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="ABS Corporation" className="FACSpecifics">
                      <HomeTwoTone />
                      <span className="emptySpan" /> California
                      <br />
                      <BulbTwoTone />
                      <span className="emptySpan" /> Software Development
                      <br />
                      <DollarTwoTone />
                      <span className="emptySpan" /> 10M Annual Revenue
                      <br />
                      <SmileTwoTone />
                      <span className="emptySpan" /> 500 Employees
                      <br />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="XYZ" className="FACSpecifics">
                      <FireTwoTone twoToneColor="#FC902B" />
                      <span className="emptySpan" /> Influencer
                      <br />
                      <PhoneTwoTone twoToneColor="#FC902B" />
                      <span className="emptySpan" /> +1 345 232 2345
                      <br />
                      <MailTwoTone twoToneColor="#FC902B" />
                      <span className="emptySpan" />{" "}
                      <a
                        href={`mailto:xyz@abs.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        xyz@abs.com
                      </a>
                      <br />
                      <ThunderboltTwoTone twoToneColor="#FC902B" />
                      <span className="emptySpan" /> 12 Interactions
                      <br />
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, textAlign: "center" }}
    >
      <Title level={4}>Hey, Anwin. This is how your day looks like.</Title>
      <Spin tip="Loading..." indicator={antIcon} spinning={!dataLoaded}>
        <Tabs className="mainAppTabs" onChange={callback} type="card">
          <TabPane tab="Today" key="1">
            {stats("today")}
          </TabPane>
          <TabPane tab="Tomorrow" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="This Week" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

export default OverviewStats;
