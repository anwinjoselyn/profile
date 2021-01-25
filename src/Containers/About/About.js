import React from "react";

import { Card, Row, Col, Tag, Space, Button, Avatar } from "antd";

import ProfilePhoto from "../../assets/ProfilePhoto.png";

import "./About.css";

const About = props => {
  return (
    <Card
      className="About page py-100 container-fluid animated bounceInLeft"
      bordered={false}
      id="about"
    >
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sec-t">
            <h2>
              <Avatar size={64} src={ProfilePhoto} /> About <span>me</span>
            </h2>
          </div>
        </Col>
        <Col span={24} className="MainColumn">
          <div className="sub-head">
            {/*<h4>
              <i className="icon-user mr-2"></i>Personal Info
            </h4>*/}
            <p>
              I am a Full Stack Developer with a flair for Frontend Development.
              Having learnt Computer Science at College made the transition from
              a Business & Sales person to a full time developer (out of
              necessity) easier. I <i className="fas fa-heart PBRed" />{" "}
              Javascript (and React) for its sheer flexibility and usage in both
              Frontend and Backend programming.
            </p>
          </div>
        </Col>
        <Col span={24} className="MainColumn"></Col>
        {/*<Col className="col-md-5 col-xl-5 mb-4 mb-md-0">
          <div className="abut-info">
            <ul className="list-unstyled">
              <li>
                <span className="f_name">First Name</span> : Anwin
              </li>
              <li>
                <span className="l_name">Last Name</span> : Joselyn
              </li>
              <li>
                <span className="b_date">Date of birth</span> : 28 Oct 1979
              </li>
              <li>
                <span className="natonality">Nationality</span> : India
              </li>
            </ul>
          </div>
        </Col>
        <Col className="col-md-6 col-xl-5 offset-md-1">
          <div className="abut-info">
            <ul className="list-unstyled">
              <li>
                <span className="a_p_number">Phone</span> : +91 96200 23555
              </li>
              <li>
                <span className="a_address">Address</span> : Pune, India
              </li>
              <li>
                <span className="a_email">Email</span> :{" "}
                <a
                  href="/cdn-cgi/l/email-protection"
                  className="__cf_email__"
                  data-cfemail="3e47514b7e47514b4c495b5c4d574a5b105d5153"
                >
                  anwinj@gmail.com
                </a>
              </li>
              <li>
                <span className="a_languages">Languages</span> : English
              </li>
            </ul>
          </div>
        </Col>*/}
        <br />
        <Col span={24} className="MainColumn">
          <div className="user-btn">
            <Button type="warning" className="btn btn-brand-border">
              Download CV
            </Button>
          </div>
        </Col>
        <Col span={24} className="MainColumn"></Col>
        <br />
        <br />
        <Col span={24} className="MainColumn"></Col>
        <br />
        <br />
        <Col span={24} className="MainColumn mt-70 fadeInDown slow animated">
          <ul className="AboutMeList">
            <Space size="small">
              <li className="AboutMeListItem">
                <i className="fab fa-react AboutMeIcon" />
                <h5>
                  <Tag className="AboutMeTag">React JS</Tag>
                </h5>
              </li>
              <li className="AboutMeListItem">
                <i className="fab fa-js-square AboutMeIcon" />
                <h5>
                  <Tag className="AboutMeTag">Javascript</Tag>
                </h5>
              </li>
              <li className="AboutMeListItem">
                <i className="fas fa-bolt AboutMeIcon" />
                <h5>
                  <Tag className="AboutMeTag">Serverless</Tag>
                </h5>
              </li>
              <li className="AboutMeListItem">
                <i className="fab fa-css3-alt AboutMeIcon" />
                <h5>
                  <Tag className="AboutMeTag">CSS</Tag>
                </h5>
              </li>
              <li className="AboutMeListItem">
                <i className="fas fa-database AboutMeIcon" />
                <h5>
                  <Tag className="AboutMeTag">RDBMS</Tag>
                </h5>
              </li>
              <li className="AboutMeListItem">
                <i className="fas fa-cog AboutMeIcon" />
                <h5>
                  <Tag className="AboutMeTag">REST API</Tag>
                </h5>
              </li>
              <li className="AboutMeListItem">
                <i className="fab fa-html5 AboutMeIcon" />
                <h5>
                  <Tag className="AboutMeTag">HTML</Tag>
                </h5>
              </li>
            </Space>
          </ul>
        </Col>
      </Row>
    </Card>
  );
};

export default About;
