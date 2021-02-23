//import React, { useState, useEffect } from "react";
import React from "react";

import { Card, Row, Col, Button, Image } from "antd";

//import axios from "axios";

import "./Home.css";

import ProfilePhoto from "../../assets/ProfilePhoto.png";

const Home = props => {
  return (
    <Card
      className="Home container-fluid animated zoomIn"
      id="home"
      bordered={false}
    >
      <Row className="MainRow">
        <Col span={16} className="MainColumn">
          <h5>
            Hi there! I am <span>Anwin Joselyn</span>
          </h5>
          <h2 className="pulse animated slower infinite">
            <span>Full Stack</span> Engineer <br /> <span>Frontend</span>{" "}
            Developer
          </h2>
          <p className="lead">
            Problem solver with an analytical and driven mindset. Self-taught
            and able to find effective solutions to complex product
            requirements.
          </p>

          <div className="user-btn">
            <Row>
              <Col span={12}>
                <Button
                  type="warning"
                  className="btn btn-brand mr-3"
                  onClick={() => props.setSelectedKey("6")}
                >
                  Hire Me
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="warning"
                  className="btn btn-brand-border"
                  onClick={() => props.setSelectedKey("3")}
                >
                  Skills
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={8} className="MainColumn2">
          <Image
            src={ProfilePhoto}
            className="img-fluid"
            alt="Anwin Joselyn Profile"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Home;
