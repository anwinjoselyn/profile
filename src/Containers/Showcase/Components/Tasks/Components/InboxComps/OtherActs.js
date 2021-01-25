import React, { useState } from "react";

import { Card, Row, Col } from "antd";

import {
  PhoneTwoTone,
  MailTwoTone,
  LaptopOutlined,
  CustomerServiceTwoTone,
  MobileTwoTone,
  PushpinTwoTone,
  CoffeeOutlined,
  ClockCircleTwoTone
} from "@ant-design/icons";

import { parseISO, format } from "date-fns";

//import axios from "axios";

import "../../Activities.css";

const taskIcons = [
  <PhoneTwoTone twoToneColor="#19BAD1" color="#19BAD1" />,
  <MobileTwoTone twoToneColor="#19BAD1" color="#19BAD1" />,
  <MailTwoTone twoToneColor="#19BAD1" color="#19BAD1" />,
  <CustomerServiceTwoTone twoToneColor="#19BAD1" color="#19BAD1" />,
  <LaptopOutlined twoToneColor="#19BAD1" color="#19BAD1" />,
  <PushpinTwoTone twoToneColor="#19BAD1" color="#19BAD1" />,
  <CoffeeOutlined twoToneColor="#19BAD1" color="#19BAD1" />
];

const OtherActs = props => {
  const tabList = [
    {
      key: "today",
      tab: `Today ( ${
        props.allTodayActs !== undefined && props.allTodayActs.length > 0
          ? props.allTodayActs.length
          : 0
      } )`
    },
    {
      key: "past",
      tab: `Past ( ${
        props.allPastActs !== undefined && props.allPastActs.length > 0
          ? props.allPastActs.length
          : 0
      } )`
    },
    {
      key: "future",
      tab: `Future ( ${
        props.allFutureActs !== undefined && props.allFutureActs.length > 0
          ? props.allFutureActs.length
          : 0
      } )`
    }
  ];

  const contentList = {
    today: (
      <Card className="OtherActsCard" size="small" bordered={false}>
        {props.allTodayActs !== undefined && props.allTodayActs.length > 0 ? (
          props.allTodayActs.map(a => (
            <div key={a.id}>
              <Row>
                <Col span={3}>
                  {props.activityTypes !== undefined &&
                  props.activityTypes.length > 0 &&
                  props.activityTypes.find(at => at.id === a.activityTypeId)
                    ? props.activityTypes.filter(
                        at => at.id === a.activityTypeId
                      )[0].activityTypeSlug
                    : "---"}
                </Col>
                <Col span={21}>
                  <Row>
                    <Col>Title</Col>
                    <Col>With</Col>
                    <Col>Time</Col>
                    <Col>Duration</Col>
                  </Row>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <p>No Tasks scheduled for today</p>
        )}
      </Card>
    ),
    past: (
      <Card className="OtherActsCard" size="small" bordered={false}>
        {props.allPastActs !== undefined && props.allPastActs.length > 0 ? (
          props.allPastActs.map(a => (
            <Card
              key={a.id}
              className={
                props.activity.id === a.id
                  ? "OACIActive OtherActsCardItems"
                  : "OtherActsCardItems"
              }
              size="small"
              bordered={false}
            >
              <Row>
                <Col span={3}>
                  <p className="slugP">
                    <>
                      {props.activityTypes !== undefined &&
                      props.activityTypes.length > 0 &&
                      props.activityTypes.find(
                        at => at.id === a.activityTypeId
                      ) ? (
                        <i
                          className={
                            props.activityTypes.filter(
                              at => at.id === a.activityTypeId
                            )[0].activityTypeSlug
                          }
                          style={{ color: "#19BAD1" }}
                        />
                      ) : (
                        "---"
                      )}
                    </>
                    {/*<PhoneTwoTone twoToneColor="#19BAD1" />*/}
                  </p>
                </Col>
                <Col span={14}>
                  <Row>
                    <Col span={24}>
                      <p className="titleP">{a.activityTitle}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <p className="dealP">
                        {props.allDeals !== undefined &&
                        props.allDeals.length > 0 &&
                        a.dealId &&
                        props.allDeals.find(d => d.id === a.dealId)
                          ? props.allDeals.filter(d => d.id === a.dealId)[0]
                              .dealName
                          : "---"}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <p className="withP">
                        {props.people !== undefined &&
                        props.people.length > 0 &&
                        props.people.find(p => p.id === a.contactId)
                          ? props.people.filter(p => p.id === a.contactId)[0]
                              .contactName
                          : "---"}
                        {" | "}
                        {props.orgs !== undefined &&
                        props.orgs.length > 0 &&
                        props.orgs.find(o => o.id === a.orgId)
                          ? props.orgs.filter(o => o.id === a.orgId)[0].orgName
                          : "---"}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col span={7}>
                  <Row>
                    <Col span={24}>
                      <p className="timeP">
                        <ClockCircleTwoTone twoToneColor="#fa4a09" />{" "}
                        {a.activityDate
                          ? format(parseISO(a.activityDate), "dd MMM yyyy")
                          : "---"}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p className="timeP">
                        {a.duration ? a.duration + " minutes" : "--"}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <p>No Open tasks from the past</p>
        )}
      </Card>
    ),
    future: (
      <Card className="OtherActsCard" size="small" bordered={false}>
        {props.allFutureActs !== undefined && props.allFutureActs.length > 0 ? (
          props.allFutureActs.map(a => (
            <Card
              key={a.id}
              className="OtherActsCardItems"
              size="small"
              bordered={false}
            >
              <Row>
                <Col span={3}>
                  {props.activityTypes !== undefined &&
                  props.activityTypes.length > 0 &&
                  props.activityTypes.find(at => at.id === a.activityTypeId) ? (
                    <>
                      props.activityTypes.filter( at => at.id ===
                      a.activityTypeId )[0].activityTypeSlug
                    </>
                  ) : (
                    "---"
                  )}
                </Col>
                <Col span={21}>
                  <Row>
                    <Col>Title</Col>
                    <Col>With</Col>
                    <Col>Time</Col>
                    <Col>Duration</Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <p>No Scheduled Tasks</p>
        )}
      </Card>
    )
  };

  const [tabState, setTabState] = useState({
    key:
      props.allTodayActs !== undefined && props.allTodayActs.length > 0
        ? "today"
        : "past"
  });

  const onTabChange = (key, type) => {
    console.log(key, type);
    setTabState({ [type]: key });
  };

  return (
    <div className="OtherActs">
      <Card
        style={{ width: "100%", textAlign: "center" }}
        tabList={tabList}
        activeTabKey={tabState.key}
        onTabChange={key => {
          onTabChange(key, "key");
        }}
        size="small"
        className="OtherActsMainCard"
      >
        {contentList[tabState.key]}
      </Card>
    </div>
  );
};

export default OtherActs;
