import React, { Component } from "react";
import {
  //Form,
  //FormGroup,
  //FormControl,
  Row,
  Col,
  //Navbar,
  // Nav,
  Container,
  //Modal,
  //DropdownButton,
  //Dropdown,
  //Button
  //Table
  Card
} from "react-bootstrap";

import { format, isAfter, differenceInCalendarDays, parseISO } from "date-fns";

import "../Timeline1.css";
//import axios from "axios";

//const url = "https://theplaybook.rocks:8000";

export default class Overview extends Component<*, State> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      today: format(new Date(), "yyyy-MM-dd"),
      inactiveDays: 0,
      lastActivity: {},
      dataLoaded: false
    };
  }

  async componentDidMount() {
    try {
      let inactiveDays = 0;

      let lastActivity = {};

      if (this.props.activities.length > 0) {
        for (let i = 0; i < this.props.activities.length; i++) {
          if (this.props.activities[i + 1]) {
            lastActivity = isAfter(
              parseISO(this.props.activities[i].updatedAt),
              parseISO(this.props.activities[i + 1].updatedAt)
            )
              ? this.props.activities[i]
              : this.props.activities[i + 1];
          }
        }
      } else lastActivity = this.props.activities[0];

      console.log("lastActivity", lastActivity);

      if (lastActivity) {
        inactiveDays = differenceInCalendarDays(
          parseISO(this.state.today),
          parseISO(lastActivity.updatedAt)
        );
      } else {
        inactiveDays = differenceInCalendarDays(
          parseISO(this.state.today),
          parseISO(this.props.deal.createdAt)
        );
      }

      this.setState({
        lastActivity,
        inactiveDays,
        dataLoaded: true
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderOverview() {
    return (
      <Card bg="dark" className="Overview">
        <Card.Header>
          <Card.Title>Overview</Card.Title>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col>Deal Age </Col>
              <Col style={{ textAlign: "right" }}>
                {differenceInCalendarDays(
                  parseISO(this.state.today),
                  parseISO(this.props.deal.createdAt)
                ) + " days"}
              </Col>
            </Row>
            <Row>
              <Col>Inactive for</Col>
              <Col style={{ textAlign: "right" }}>
                {!isNaN(this.state.inactiveDays) ? this.state.inactiveDays : 0}{" "}
                days
              </Col>
            </Row>
            <Row>
              <Col>Created </Col>
              <Col style={{ textAlign: "right" }}>
                {format(parseISO(this.props.deal.createdAt), "yyyy-MM-dd")}
              </Col>
            </Row>
            <Row>
              <Col>Top Activities </Col>
              <Col style={{ textAlign: "right" }}>---</Col>
            </Row>
            <Row>
              <Col>Most Active Users </Col>
              <Col style={{ textAlign: "right" }}>---</Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return this.renderOverview();
  }
}
