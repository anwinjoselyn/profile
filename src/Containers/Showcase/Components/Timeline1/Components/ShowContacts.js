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
  //Button,
  //Table
  Card
} from "react-bootstrap";

//import axios from "axios";

//import AddContact from "../../Contacts/People/Components/AddContact";

import LoaderButton from "../../../../../Components/LoaderButton";

import "../Timeline1.css";

//const url = "https://theplaybook.rocks:8000";

export default class ShowContacts extends Component<*, State> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      addContactModalFlag: false
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  closeAddContact = () => {
    this.setState({
      addContactModalFlag: false
    });
  };

  renderContacts() {
    return (
      <Card bg="dark" className="Contacts">
        <Card.Header>
          <Card.Title>All Contacts</Card.Title>
        </Card.Header>
        <Card.Body>
          {this.props.people
            ? this.props.people.map(contact => {
                return (
                  <React.Fragment key={contact.id}>
                    <LoaderButton
                      text={contact.contactName}
                      variant="outline-secondary"
                      size="md"
                      className="SpanContacts"
                    />{" "}
                    {!contact.isActive ? "(Inactive)" : null}
                  </React.Fragment>
                );
              })
            : null}
        </Card.Body>
      </Card>
    );
  }

  render() {
    return this.props.people && this.renderContacts();
  }
}
