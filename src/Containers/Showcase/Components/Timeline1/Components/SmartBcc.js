import React, { Component } from "react";
import {
  //Form,
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
import LoaderButton from "../../../../../Components/LoaderButton";

import "../Timeline1.css";

const uuidv1 = require("uuid/v1");

export default class SmartBcc extends Component<*, State> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      edit: false,
      smartBCC: this.props.deal.smartBCC || ""
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  generateSmartBcc = event => {
    event.preventDefault();

    let smartBCC =
      uuidv1() +
      "+deal+" +
      this.props.deal.dealName.split(" ")[0].toLowerCase() +
      "@parse.theplaybook.rocks";
    console.log("smartBCC", smartBCC);

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.props.deal.id}`,
      data: {
        smartBCC: smartBCC
      },
      headers: { Authorization: `${this.props.authToken}` }
    })
      .then(data => {
        console.log("update data", data.data.data);

        this.props.updateFunction(data.data.data);
      })
      .catch(error => console.log("error", error));
  };

  renderDetails() {
    return (
      <Card bg="dark" className="Details">
        <Card.Header>
          <Card.Title>
            Smart BCC Email
            <LoaderButton
              className="far fa-clipboard"
              onClick={
                navigator.clipboard !== undefined
                  ? () => {
                      navigator.clipboard.writeText(this.props.deal.smartBCC);
                      this.setState({
                        clipSuccessful: true
                      });
                    }
                  : () => {
                      this.setState({
                        clipSuccessful: false
                      });
                    }
              }
              variant="dark"
              size="sm"
              style={{ float: "right", margin: "2px", padding: "2px" }}
            />
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            <span
              style={
                this.state.clipSuccessful
                  ? { background: "#adadad", color: "#343a40" }
                  : null
              }
            >
              {this.props.deal.smartBCC !== undefined &&
              this.props.deal.smartBCC !== null &&
              this.props.deal.smartBCC !== "" ? (
                this.state.clipSuccessful ? (
                  this.props.deal.smartBCC + "copied"
                ) : (
                  this.props.deal.smartBCC
                )
              ) : (
                <LoaderButton
                  variant="dark"
                  size="md"
                  text="Generate"
                  block
                  onClick={this.generateSmartBcc}
                />
              )}
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
