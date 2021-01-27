import React from "react";

import { Row, Col, Card } from "antd";

import { format, parseISO, isPast, sub } from "date-fns";

import "../../Activities.css";

const InboxHeader = props => {
  return (
    <Row className="InboxHeaderRow">
      <Col span={!props.activity.isCompleted ? 2 : 1}>
        <Card
          size="small"
          className="statsCardIT"
          style={{ borderRadius: "2px 0 0 2px" }}
        >
          {props.activityTypes !== undefined &&
          props.activityTypes.length > 0 &&
          props.activityTypes.find(
            at => at.id === props.activity.activityTypeId
          ) ? (
            <i
              className={
                props.activityTypes.filter(
                  at => at.id === props.activity.activityTypeId
                )[0].activityTypeSlug
              }
            />
          ) : (
            "---"
          )}
        </Card>
      </Col>
      <Col span={!props.activity.isCompleted ? 9 : 6}>
        <Card size="small" className="statsCardIT">
          With{" "}
          {props.people !== undefined &&
          props.people.length > 0 &&
          props.activity.contactId !== undefined &&
          props.activity.contactId !== null &&
          props.people.find(c => c.id === props.activity.contactId)
            ? props.people.filter(c => c.id === props.activity.contactId)[0]
                .contactName
            : " N/A"}{" "}
          from{" "}
          {props.orgs !== undefined &&
          props.orgs.length > 0 &&
          props.activity.orgId !== undefined &&
          props.activity.orgId !== null &&
          props.orgs.find(o => o.id === props.activity.orgId)
            ? props.orgs.filter(o => o.id === props.activity.orgId)[0].orgName
            : " N/A"}
        </Card>
      </Col>
      <Col span={!props.activity.isCompleted ? 5 : 4}>
        <Card size="small" className="statsCardIT">
          <i
            className="far fa-clock"
            style={
              isPast(
                sub(parseISO(props.activity.activityDate), {
                  years: 0,
                  months: 0,
                  weeks: 0,
                  days: 0,
                  hours: 4 + props.dst,
                  minutes: 30,
                  seconds: 0
                })
              )
                ? {
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#FF2929"
                  }
                : {
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#19BAD1"
                  }
            }
          />{" "}
          {format(parseISO(props.activity.activityDate), "dd-MMM").toString()}{" "}
          {" - "}
          {props.activity.activityTime
            ? props.activity.activityTime.split(":")[0]
            : "--"}
          {":"}
          {props.activity.activityTime
            ? props.activity.activityTime.split(":")[1]
            : "--"}
          {props.activity.activityTime &&
          parseInt(props.activity.activityTime.split(":")[0]) > 11
            ? " PM"
            : " AM"}{" "}
        </Card>
      </Col>
      <Col span={!props.activity.isCompleted ? 4 : 3}>
        <Card size="small" className="statsCardIT">
          {props.activity.duration} minutes
        </Card>
      </Col>
      <Col span={!props.activity.isCompleted ? 4 : 3}>
        <Card
          size="small"
          className="statsCardIT"
          style={
            !props.activity.isCompleted ? { borderRadius: "0 2px 2px 0" } : null
          }
        >
          {props.activity.isCompleted ? (
            <i
              className="fas fa-check"
              style={{ fontSize: "16px", color: "#92F0AE" }}
            />
          ) : (
            "Ongoing"
          )}
        </Card>
      </Col>
      {props.activity.isCompleted ? (
        <React.Fragment>
          <Col span={3}>
            <Card size="small" className="statsCardIT">
              {props.activity.success ? (
                <i
                  className="far fa-grin-beam"
                  style={{ fontSize: "16px", color: "#FF8823" }}
                />
              ) : (
                <i
                  className="fas fa-heart-broken"
                  style={{ fontSize: "16px", color: "#FF2929" }}
                />
              )}
            </Card>
          </Col>
          <Col span={4}>
            <Card
              size="small"
              className="statsCardIT"
              style={{ borderRadius: "0 2px 2px 0" }}
            >
              {props.activity.text ? props.activity.text : "---"}
            </Card>
          </Col>
        </React.Fragment>
      ) : null}
    </Row>
  );
};

export default InboxHeader;
