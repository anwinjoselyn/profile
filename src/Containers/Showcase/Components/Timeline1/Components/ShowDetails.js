import React, { Component } from "react";
import {
  Form,
  //FormGroup,
  //FormControl,
  //Row,
  //Col,
  //Navbar,
  // Nav,
  //Container,
  //Modal,
  //DropdownButton,
  //Dropdown,
  //Button
  //Table
  Card
} from "react-bootstrap";

import axios from "axios";

import "../Timeline1.css";

//const url = "https://theplaybook.rocks:8000";

export default class ShowDetails extends Component<*, State> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      edit: false,
      source: this.props.deal.source || ""
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  handleChange = event => {
    //event.preventDefault();
    console.log("event.target.id", event.target.id);
    console.log("event.target.value", event.target.value);

    this.setState({
      [event.target.id]: event.target.value
    });
  };

  updateSource = event => {
    event.preventDefault();

    console.log("this.state.source", this.state.source);

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.props.deal.id}`,
      data: { source: this.state.source },
      headers: { Authorization: `${this.props.authToken}` }
    })
      .then(data => {
        console.log("data", data);

        this.setState({
          source: data.data.data.source
        });

        this.toggleEdit();

        this.props.updateDealSource(data.data.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  renderDetails() {
    return (
      <Card bg="dark" className="Details">
        <Card.Header>
          <Card.Title>Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onBlur={this.updateSource}>
            <Form.Group controlId="source">
              <span className="SpanHeading">Source {"  "}</span>
              <span className="SpanDetails" onDoubleClick={this.toggleEdit}>
                {this.props.deal.source ? this.props.deal.source : "Not Set"}
              </span>
              {this.state.edit && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.source}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
          </Form>
          <p>
            <span className="SpanHeading">Reason {"  "}</span>
            <span className="SpanDetails">
              {this.props.reasons
                ? this.props.reasons.map(reason => {
                    if (reason.id === this.props.deal.reasonId)
                      return reason.reasonName;
                    else {
                      return null;
                    }
                  })
                : "Not Set"}
            </span>
          </p>
          <p>
            <span className="SpanHeading">Status {"  "}</span>
            <span className="SpanDetails">
              {this.props.dealStatuses
                ? this.props.dealStatuses.map(status => {
                    if (status.id === this.props.deal.statusId)
                      return status.dealStatusName;
                    else {
                      return null;
                    }
                  })
                : "Not Set"}
            </span>
          </p>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return this.props.deal && this.renderDetails();
  }
}
