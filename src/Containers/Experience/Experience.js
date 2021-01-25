import React from "react";

import { Card, Row, Col, Timeline, List, Image } from "antd";

import PBbold1 from "../../assets/PBbold1.png";
import indilogo from "../../assets/indilogo.jpeg";
import greythrlogo from "../../assets/greythrlogo.png";
import sumHRLogo from "../../assets/sumHRLogo.png";

import "./Experience.css";

const Experience = props => {
  const indi = [
    <div>
      Helped create a vibrant <strong>Blogger Community</strong> in India
    </div>,
    <div>
      Hosted monthly <strong>Blogger Events</strong> across major cities
    </div>,
    <div>
      Managed the <strong>Online Community</strong> via Indiblogger.in
    </div>,
    <div>
      Brought in sponsors like <strong>Microsoft, Hindustan Unilever</strong>{" "}
      etc for events
    </div>,
    <div>
      Helped create first <strong>Blogger Awards</strong> in India
    </div>,
    <div>
      Involved in <strong>Product Idea & design</strong>
    </div>
  ];

  const pb = [
    <div>
      Developed the <strong>Idea</strong> behind Playbook - a Sales & Revenue
      Management software
    </div>,
    <div>
      Created the <strong>Architecture</strong> for the web app
    </div>,
    <div>
      Coded, tested and deployed back-end APIs on an{" "}
      <strong>Express/Node</strong> server on EC2 instance
    </div>,
    <div>
      Designed, coded, tested and deployed front-end via{" "}
      <strong>Cloudfront/S3</strong> written using{" "}
      <strong>Javascript & ReactJS</strong>
    </div>,
    <div>
      <strong>Bug fixes</strong>, maintenance and further enhancements
    </div>,
    <div>
      <strong>RDS Postgres</strong> Engine for persistent storage
    </div>,
    <div>
      New version development with back-end on <strong>AWS Serverless</strong>{" "}
      Microservices
    </div>
  ];

  const sumhr = [
    <div>Grew from a Senior executive role to a Management role</div>,
    <div>Responsible for all incoming revenues</div>,
    <div>Developed, deployed and maintained successful Sales strategies</div>,
    <div>
      Grew company from <strong>20+ Customers to 400+ Customers</strong>
    </div>,
    <div>Helped plan and execute Customer Success program</div>,
    <div>
      <strong>Developed complex Playbooks</strong> for Sales, Marketing, Renewal
      & Customer Success teams
    </div>,
    <div>
      Involved in successful <strong>Series A funding</strong>
    </div>,
    <div>
      Responsible for Target setting, breakup of revenue goals, reporting and
      complete Revenue Management
    </div>,
    <div>
      Worked closely with the <strong>Product team</strong> in bringing out
      features
    </div>,
    <div>
      Had direct access to Development Team which later helped create Playbook
      software
    </div>
  ];

  const greythr = [
    <div>
      Planned and developed Channel Partners in Tier – 1 and Tier – 2 cities in
      India and drove sales through partners
    </div>,
    <div>Responsible for South, North and East regions</div>,
    <div>Opened new markets in new cities with help of reselling partners</div>,
    <div>Achieved targets through partner contribution</div>,
    <div>Identified, recruited, trained and managed the right partners</div>,
    <div>
      Monitored and measured performance of Channel Managers and Partners on
      weekly / monthly basis and provided positive reinforcement as required
    </div>,
    <div>
      Identified useful conferences / events in partner active cities and
      generated leads for partners
    </div>,
    <div>
      Collaborated with direct sales teams, implementation and support teams,
      billing and accounts team on a daily basis
    </div>,
    <div>
      Helped partners plan their targets, strategies, campaigns and put in
      action their business plan
    </div>
  ];

  return (
    <Card className="Experience" bordered={false}>
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sec-t">
            <h2>
              My <span>Experience</span>
            </h2>
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <Timeline>
            <Timeline.Item
              dot={
                <i className="far fa-hand-rock" style={{ color: "#19DFD1" }} />
              }
              color="#fa4a09"
            >
              <Card
                hoverable
                className="TimelineCard"
                title={
                  <Row>
                    <Col span={22}>
                      <h2>Full Stack Engineer</h2>{" "}
                      <span>Playbook Software, Pune</span>
                      <br />
                      <small>April 2019 - PRESENT</small>
                    </Col>
                    <Col span={2}>
                      <Image src={PBbold1} width={60} preview={false} />
                    </Col>
                  </Row>
                }
              >
                {/*<ul>
                  <li>
                    Developed the Idea behind Playbook - a Sales & Revenue
                    Management software
                  </li>
                  <li>Created the Architecture for the web app</li>
                  <li>
                    Coded, tested and deployed back-end APIs on an Express/Node
                    server on EC2 instance
                  </li>
                  <li>
                    Designed, coded, tested and deployed front-end via
                    Cloudfront/S3 written using Javascript & ReactJS
                  </li>
                  <li>Bug fixes, maintenance and further enhancements</li>
                  <li>RDS Postgres Engine for persistent storage</li>
                  <li>
                    New version development with APIs based on Serverless
                    Microservices
                  </li>
                </ul>*/}
                <List
                  size="small"
                  dataSource={pb}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Timeline.Item>
            <Timeline.Item
              dot={<i className="far fa-star" style={{ color: "#19DFD1" }} />}
              color="#001B21"
            >
              <Card
                hoverable
                className="TimelineCard"
                title={
                  <Row>
                    <Col span={22}>
                      <h2>Head - Biz Dev & Renewals</h2>{" "}
                      <span>sumHR Software, Pune</span>
                      <br />
                      <small>April 2016 – January 2019</small>
                    </Col>
                    <Col span={2}>
                      <Image src={sumHRLogo} width={60} preview={false} />
                    </Col>
                  </Row>
                }
              >
                {/*<ul>
                  <li>
                    Grew from a Senior executive role to a Management role
                  </li>
                  <li>Responsible for all incoming revenues</li>
                  <li>
                    Developed, deployed and maintained successful Sales
                    strategies
                  </li>
                  <li>Grew company from 20+ customers to 400+ customers</li>
                  <li>Helped plan and execute Customer Success program</li>
                  <li>
                    Developed complex Playbooks for Sales, Marketing, Renewal &
                    Customer Success teams
                  </li>
                  <li>Involved in successful Series A funding</li>
                  <li>
                    Responsible for Target setting, breakup of revenue goals,
                    reporting and complete Revenue Management
                  </li>
                  <li>
                    Worked closely with the Product team in bringing out
                    features
                  </li>
                  <li>
                    Got direct access to development teams which later helped
                    create Playbook software
                  </li>
                </ul>*/}
                <List
                  size="small"
                  dataSource={sumhr}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <i
                  className="far fa-hand-point-right"
                  style={{ color: "#19DFD1" }}
                />
              }
            >
              <Card
                hoverable
                className="TimelineCard"
                title={
                  <Row>
                    <Col span={22}>
                      <h2>Manager - Channel Development</h2>{" "}
                      <span>Greytip Software (greytHR), Bangalore</span>
                      <br />
                      <small>May 2013 – October 2015</small>
                    </Col>
                    <Col span={2}>
                      <Image src={greythrlogo} width={60} preview={false} />
                    </Col>
                  </Row>
                }
              >
                {/*<ul>
                  <li>
                    Planned and developed Channel Partners in Tier – 1 and Tier
                    – 2 cities in India and drove sales through partners
                  </li>
                  <li>Responsible for South, North and East regions</li>
                  <li>
                    Opened new markets in new cities with help of reselling
                    partners
                  </li>
                  <li>Achieved targets through partner contribution</li>
                  <li>
                    Identified, recruited, trained and managed the right
                    partners
                  </li>
                  <li>
                    Monitored and measured performance of Channel Managers and
                    Partners on weekly / monthly basis and provided positive
                    reinforcement as required
                  </li>
                  <li>
                    Identified useful conferences / events in partner active
                    cities and generated leads for partners
                  </li>
                  <li>
                    Collaborated with direct sales teams, implementation and
                    support teams, billing and accounts team on a daily basis
                  </li>
                  <li>
                    Helped partners plan their targets, strategies, campaigns
                    and put in action their business plan
                  </li>
                </ul>*/}
                <List
                  size="small"
                  dataSource={greythr}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <i className="far fa-handshake" style={{ color: "#19DFD1" }} />
              }
              color="#014744"
            >
              <Card
                hoverable
                className="TimelineCard"
                title={
                  <Row>
                    <Col span={22}>
                      <h2>Director</h2> <span>Indiblogger.in, Bangalore</span>
                      <br />
                      <small>July 2007 – March 2013</small>
                    </Col>
                    <Col span={2}>
                      <Image src={indilogo} width={60} preview={false} />
                    </Col>
                  </Row>
                }
              >
                {/*<ul>
                  <li>Helped create a vibrant blogger community in India</li>
                  <li>Hosted monthly blogger events across major cities</li>
                  <li>Managed the online community via Indiblogger.in</li>
                  <li>
                    Brought in sponsors like Microsoft, Hindustan Unilever etc
                    for events
                  </li>
                  <li>Helped create first Blogger awards in India</li>
                  <li>Involved in Product idea & design</li>
                </ul>*/}
                <List
                  size="small"
                  dataSource={indi}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </Card>
  );
};

export default Experience;
